import {defineNuxtPlugin} from 'nuxt/app'
import {addPlugin} from "@nuxt/kit";

export default defineNuxtPlugin( (_nuxtApp) => {
  console.log('Plugin injected by my-module!')

})
