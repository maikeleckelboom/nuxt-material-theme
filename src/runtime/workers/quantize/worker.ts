import { getDataFromImageSource, pixelsFromImageData } from '../../utils/quantize/image'
import { quantize } from '../../utils/quantize'
import { score } from '../../utils/quantize/score'
import { isStartEvent } from './guards'
import type { QuantizeWorkerEvent } from './types'

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
