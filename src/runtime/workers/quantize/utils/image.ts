import { argbFromRgb } from '@material/material-color-utilities'

export async function getDataFromImageSource(
  imageBitmapSource: ImageBitmapSource,
  options?: {
    abortSignal?: AbortSignal
    imageBitmapOptions?: ImageBitmapOptions
  }
): Promise<ImageData> {
  const image = await createImageBitmap(imageBitmapSource, options?.imageBitmapOptions)
  const canvas = new OffscreenCanvas(image.width, image.height)
  const context = canvas.getContext('2d')!
  context.drawImage(image, 0, 0)
  return context.getImageData(0, 0, image.width, image.height)
}

export function pixelsFromImageData(imageData: ImageData): number[] {
  const { data } = imageData
  const length = data.length
  const pixels: number[] = []

  for (let i = 0; i < length; i += 4) {
    const [r, g, b, a] = data.slice(i, i + 4)
    if (a === 255) {
      pixels.push(argbFromRgb(r!, g!, b!))
    }
  }

  return pixels
}
