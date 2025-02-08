import { argbFromHex } from '@material/material-color-utilities'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-30',
  materialTheme: {
    // todo: change to seed
    seedColor: argbFromHex('#ff8000'),
    extendedColors: [
      {
        name: 'Forest Mist',
        value: argbFromHex('#4dd78b'),
        blend: true
      },
      {
        name: 'Alien Purplish',
        value: argbFromHex('#ff00ff'),
        blend: true
      }
    ],
  }
})
