import { definePayloadReducer, definePayloadReviver } from 'nuxt/app'
import { DynamicColor } from '@material/material-color-utilities'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  definePayloadReducer('dynamicColor', (payload) => {
    if (payload instanceof DynamicColor) {
      return <DynamicColor>{
        name: payload.name,
        palette: payload.palette,
        tone: payload.tone,
        isBackground: payload.isBackground,
        background: payload.background,
        secondBackground: payload.secondBackground,
        contrastCurve: payload.contrastCurve,
        toneDeltaPair: payload.toneDeltaPair
      }
    }
  })

  definePayloadReviver('dynamicColor', (payload) => {
    if (payload && typeof payload === 'object') {
      return new DynamicColor(
        payload.name,
        payload.palette,
        payload.tone,
        payload.isBackground,
        payload.background,
        payload.secondBackground,
        payload.contrastCurve,
        payload.toneDeltaPair
      )
    }
  })
})
