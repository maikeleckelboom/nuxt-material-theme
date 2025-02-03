import { getDataFromImageSource, pixelsFromImageData } from './utils/image'
import { quantize } from './utils/quantization'
import { score } from './utils/scoring'
import type { QuantizeWorkerEvent } from './types/events'
import { isStartEvent } from './guards'

if (typeof self !== 'undefined') {
  self.addEventListener('message', async (event: QuantizeWorkerEvent) => {
    if (isStartEvent(event)) {
      const imageData = await getDataFromImageSource(event.data.source)
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
