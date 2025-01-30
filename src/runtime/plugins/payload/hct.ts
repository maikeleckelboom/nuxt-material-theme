import {definePayloadPlugin, definePayloadReducer, definePayloadReviver} from "nuxt/app";
import {Hct} from "@material/material-color-utilities";

export default definePayloadPlugin(() => {
  definePayloadReducer('Hct', (data) => {
    if (data instanceof Hct) {
      return {
        hue: data.hue,
        chroma: data.chroma,
        tone: data.tone
      }
    }
  })

  definePayloadReviver('Hct', (data) => {
    if (
      data &&
      typeof data.hue === 'number' &&
      typeof data.chroma === 'number' &&
      typeof data.tone === 'number'
    ) {
      return Hct.from(data.hue, data.chroma, data.tone)
    }
  })
})
