import { getDataFromImageSource, pixelsFromImageData } from './utils/image'
import { quantizeColors } from './utils/quantization'
import { scoreByMostSuitable } from './utils/scoring'
import type { QuantizeWorkerEvent } from './types/events'
import { isStartEvent } from './guards'

if (typeof self !== 'undefined') {
  self.addEventListener('message', async (event: QuantizeWorkerEvent) => {
    if (isStartEvent(event)) {
      const imageData = await getDataFromImageSource(event.data.source)
      const pixels = pixelsFromImageData(imageData)
      self.postMessage({ type: 'progress', progress: 50 })
      const colorToCount = quantizeColors(pixels, event.data.maxColors)
      const rankedSuggestions = scoreByMostSuitable(colorToCount, {
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
