import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(({ $config }) => {
  console.log('Hello from plugin!')
  console.log('Config:', $config)
})
