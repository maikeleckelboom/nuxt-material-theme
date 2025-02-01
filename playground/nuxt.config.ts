import { argbFromHex } from '@material/material-color-utilities'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-30',
  materialTheme: {
    seedColor: argbFromHex('#ff00f2'),
    isDark: true,
    contrast: 0,
    extended: [
      {
        name: 'My Awesome Color',
        description: 'This is a custom color from the nuxt.config.ts',
        value: argbFromHex('#ffea00')
      }
    ]
  }
})
