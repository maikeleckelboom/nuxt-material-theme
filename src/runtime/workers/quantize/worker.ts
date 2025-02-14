import { imageDataFromBitmapSource, pixelsFromImageData } from '../../utils/image'
import { quantizePixels } from '../../utils/quantize'
import { score } from '../../utils/score'
import { isStartEvent } from './guards'
import type { QuantizeWorkerEvent } from './types'

async function onMessage(event: QuantizeWorkerEvent) {
  if (isStartEvent(event)) {
    const imageData = await imageDataFromBitmapSource(event.data.image)
    const pixels = pixelsFromImageData(imageData)
    const colorToCount = quantizePixels(pixels, event.data.maxColors)
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
}

if (typeof self !== 'undefined') {
  self.addEventListener('message', onMessage)
}
