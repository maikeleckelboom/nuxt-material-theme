import { argbFromHex } from '@material/material-color-utilities'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-30',
  materialTheme: {
    seedColor: argbFromHex('#009dff'),
    extendedColors: [
      {
        name: 'Alien Purplish',
        value: argbFromHex('#ff00ff'),
        blend: true
      }
    ],
  }
})
