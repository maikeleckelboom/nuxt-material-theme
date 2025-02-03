import { definePayloadReducer, definePayloadReviver } from 'nuxt/app'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  definePayloadReducer('dynamicColor', (payload) => {
    //
  })

  definePayloadReviver('dynamicColor', (payload) => {
    //
  })
})
