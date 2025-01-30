import {argbFromHex} from "@material/material-color-utilities";

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: {enabled: true},
  compatibilityDate: '2025-01-30',
  materialDynamic: {
    source: argbFromHex('#ff00f2'),
  },
})
