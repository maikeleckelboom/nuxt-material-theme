import { imageDataFromBitmapSource, pixelsFromImageData } from '../../utils/image'
import { quantize } from '../../utils/quantize'
import { score } from '../../utils/score'
import { isStartEvent } from './utils'
import type { QuantizeWorkerEvent } from './types'

if (typeof self !== 'undefined') {
  self.addEventListener('message', async (event: QuantizeWorkerEvent) => {
    if (isStartEvent(event)) {
      const imageData = await imageDataFromBitmapSource(event.data.image)
      const pixels = pixelsFromImageData(imageData)
      const colorToCount = quantize(pixels, event.data.maxColors)
      const rankedSuggestions = score(colorToCount, {
        desired: event.data.desired,
        filter: event.data.filter
      })
      self.postMessage({
        type: 'done',
        rankedSuggestions,
        colorToCount
      })
    }
  })
}
