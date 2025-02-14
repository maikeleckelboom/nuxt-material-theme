import { argbFromHex } from '@material/material-color-utilities'
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [
      /* @ts-ignore */
      tailwindcss()
    ]
  },
  css: ['./assets/css/tailwind.css'],
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-30',
  materialTheme: {
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
    ]
  }
})
