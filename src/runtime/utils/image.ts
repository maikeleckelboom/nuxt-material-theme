import { argbFromRgb } from '@material/material-color-utilities'

export async function imageDataFromBitmapSource(
  imageBitmapSource: ImageBitmapSource,
  options: { imageBitmapOptions?: ImageBitmapOptions, signal?: AbortSignal; } = {}
): Promise<ImageData> {
  const { signal, imageBitmapOptions } = options
  if (signal?.aborted) throw new DOMException('Operation aborted', 'AbortError')

  const abortPromise = new Promise<never>((_, reject) =>
    signal?.addEventListener('abort',
      () => reject(new DOMException('Operation aborted', 'AbortError')),
      { once: true })
  )

  const image = await Promise.race([
    createImageBitmap(imageBitmapSource, imageBitmapOptions),
    abortPromise
  ])

  const canvas = new OffscreenCanvas(image.width, image.height)
  const context = canvas.getContext('2d')!
  context.drawImage(image, 0, 0)
  return context.getImageData(0, 0, image.width, image.height)
}

export function pixelsFromImageData({ data }: ImageData): number[] {
  const pixels: number[] = []
  const len = data.length
  for (let i = 0; i < len; i += 4) {
    const [r, g, b, a] = data.slice(i, i + 4)
    if (a === 255) pixels.push(argbFromRgb(r!, g!, b!))
  }
  return pixels
}

export async function fetchImageBitmap(
  url: string,
  options?: { signal?: AbortSignal }
): Promise<ImageBitmap> {

  if (import.meta.server) {
    console.warn('fetchImageBitmap is only supported in the browser.')
  }

  if (!/^https?:|^data:/.test(url)) {
    throw new Error('Only http(s) and data URLs are supported')
  }

  const { signal } = options || {}
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')

  const response = await fetch(url, { signal })
  const blob = await response.blob()

  const imageBitmapPromise = createImageBitmap(blob)

  return signal
    ? Promise.race([
      imageBitmapPromise,
      new Promise<never>((_, reject) =>
        signal.addEventListener('abort',
          () => reject(new DOMException('Aborted', 'AbortError')),
          { once: true }
        )
      )
    ])
    : imageBitmapPromise
}


