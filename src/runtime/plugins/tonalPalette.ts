import { definePayloadPlugin, definePayloadReducer, definePayloadReviver } from 'nuxt/app'
import { Hct, TonalPalette } from '@material/material-color-utilities'

export default definePayloadPlugin(() => {
  definePayloadReducer('TonalPalette', (data) => {
    if (data instanceof TonalPalette) {
      return {
        keyColor: {
          hue: data.keyColor.hue,
          chroma: data.keyColor.chroma,
          tone: data.keyColor.tone
        }
      }
    }
  })

  definePayloadReviver('TonalPalette', (data) => {
    if (
      data &&
      typeof data.keyColor === 'object' &&
      typeof data.keyColor.hue === 'number' &&
      typeof data.keyColor.chroma === 'number' &&
      typeof data.keyColor.tone === 'number'
    ) {
      return TonalPalette.fromHct(
        Hct.from(data.keyColor.hue, data.keyColor.chroma, data.keyColor.tone)
      )
    }
  })
})
