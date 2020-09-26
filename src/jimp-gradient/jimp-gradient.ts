import { RGBA } from 'ts-rgba'
import Jimp from 'jimp'

export async function newGradientImg(
    width: number,
    height: number,
    startColor: RGBA,
    endColor: RGBA,
    direction: 'up' | 'down' = 'up'
) {
    return new Promise<Jimp>((resolve, reject) => {
        Jimp.create(width, height, Jimp.rgbaToInt(0, 0, 0, 255))
        .then(img => {
            resolve(jimpImgToGradientImg(img, startColor, endColor, direction))
        })
        .catch(err => reject(err))
    })
}

export function jimpImgToGradientImg(
    img: Jimp,
    startColor: RGBA,
    endColor: RGBA,
    direction: 'up' | 'down' = 'up'
) {
    const sColor = direction == 'up' ? endColor : startColor
    const eColor = direction == 'up' ? startColor : endColor
    var lastY = 0

    var color = sColor
    const colorStep = eColor.diff(sColor).divide(img.getHeight())

    img.scanQuiet(0, 0, img.bitmap.width, img.bitmap.height, function (x: number, y: number, idx: number) {
        if (lastY != y) {
            color = color.sum(colorStep)
            lastY = y
        }

        img.bitmap.data[idx] = color.r
        img.bitmap.data[idx + 1] = color.g
        img.bitmap.data[idx + 2] = color.b
    })
    
    return img
}