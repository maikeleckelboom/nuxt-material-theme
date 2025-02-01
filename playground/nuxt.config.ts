import { argbFromHex } from '@material/material-color-utilities'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-30',
  materialTheme: {
    primary: argbFromHex('#009dff'),
    tertiary: argbFromHex('#ff00a6'),
    isDark: true,
    contrast: 0.2,
    style: 'Content',
    extended: [
      {
        name: 'Sponge',
        description: 'The color of Sponge Bob',
        value: argbFromHex('#ffea00')
      }
    ]
  }
})
