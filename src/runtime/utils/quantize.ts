import { QuantizerCelebi } from '@material/material-color-utilities'
import type { QuantizeOptions, QuantizeResult } from '../workers/quantize/types'
import { createQuantizeWorker } from '../workers/quantize'
import { isDoneEvent } from '../workers/quantize/guards'

export function quantizePixels(pixels: number[], maxColors: number = 200): Map<number, number> {
  return QuantizerCelebi.quantize(pixels, maxColors)
}

// Limitation: Must serialize to a worker since ImageBitmapSource includes non-transferable types
// such as ImageBitmap, HTMLImageElement, HTMLVideoElement, HTMLCanvasElement, and OffscreenCanvas.
export async function quantizeWithWorker(
  image: ImageBitmap,
  options: QuantizeOptions = {}
): Promise<QuantizeResult> {
  const worker = createQuantizeWorker()
  const { signal } = options

  return new Promise<QuantizeResult>((resolve, reject) => {
    const abortHandler = () => {
      worker.terminate()
      reject(new DOMException('The operation was aborted.', 'AbortError'))
    }

    if (signal?.aborted) return abortHandler()
    signal?.addEventListener('abort', abortHandler, { once: true })

    worker.onmessage = (event) => {
      if (isDoneEvent(event)) {
        signal?.removeEventListener('abort', abortHandler)
        resolve(event.data)
        worker.terminate()
      }
    }

    worker.onerror = (error) => {
      signal?.removeEventListener('abort', abortHandler)
      reject(error)
      worker.terminate()
    }

    worker.postMessage({ type: 'start', image, ...options })
  })
}

