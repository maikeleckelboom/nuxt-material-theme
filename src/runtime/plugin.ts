import { defineNuxtPlugin } from 'nuxt/app'
import { hexFromArgb } from '@material/material-color-utilities'
import { computed, shallowRef } from 'vue'
import { useReactiveOptionsTheme } from './composables/useReactiveOptionsTheme'
import { useHead } from '@unhead/vue'
import { kebabCase } from 'change-case'

export default defineNuxtPlugin(({ $config }) => {
  const options = $config.public.materialTheme
  const theme = useReactiveOptionsTheme(options)

  function cssVariablesFromColorScheme(colorScheme: Record<string, number>) {
    return Object.entries(colorScheme).reduce((acc, [key, value]) => {
      return `${acc}--${kebabCase(key)}: ${hexFromArgb(value)};\n`
    }, '')
  }

  useHead({
    style: [
      {
        textContent: computed(
          () => `:root {\n${cssVariablesFromColorScheme(theme.colorScheme.value)}\n}`)
      }
    ]
  })
})
