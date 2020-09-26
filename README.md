# jimp-gradient

Create gradient images via Jimp

## Install

```bash
npm i jimp-gradient
```

## Usage

```typescript
import { RGBA, newGradientImg } from 'jimp-gradient';

newGradientImg(512, 512, new RGBA(0,0,0), new RGBA(255,255,255), 'down')
.then(img => { img.write('./img.jpg') })
.catch(err => console.log(err))
```
