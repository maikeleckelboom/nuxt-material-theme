import { defineNuxtPlugin } from 'nuxt/app'
import { hexFromArgb } from '@material/material-color-utilities'
import { computed } from 'vue'
import { useMaterialTheme } from '../composables/useMaterialTheme'
import { useHead } from '@unhead/vue'
import { kebabCase } from 'change-case'

export default defineNuxtPlugin(({ $config }) => {
  const config = $config.public.materialTheme

  const { colorScheme } = useMaterialTheme(config)

  function cssVariablesFromColorScheme(colorScheme: Record<string, number>) {
    return Object.entries(colorScheme).reduce((acc, [key, value]) => {
      return `${acc}--${kebabCase(key)}: ${hexFromArgb(value)};\n`
    }, '')
  }

  useHead({
    style: [
      {
        textContent: computed(
          () => `:root {\n${cssVariablesFromColorScheme(colorScheme.value)}\n}`)
      }
    ]
  })
})
