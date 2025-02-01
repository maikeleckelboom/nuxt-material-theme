import { defineNuxtPlugin } from 'nuxt/app'
import { watchIgnorable } from '@vueuse/core'
import { watch } from 'vue'
import { createDynamicScheme } from '../utils/dynamicScheme'
import { useDynamicScheme } from '../composables/useDynamicScheme'

export default defineNuxtPlugin(({ $config }) => {
  const dynamicScheme = useDynamicScheme()
  const config = $config.public.materialTheme

  const { ignoreUpdates } = watchIgnorable(() => [
    config.isDark,
    config.contrast,
    config.style,
    config.primary,
    config.secondary,
    config.tertiary,
    config.neutral,
    config.neutralVariant
  ], () => {
    console.log('theme update')
    dynamicScheme.value = createDynamicScheme({
      primary: config.primary,
      isDark: config.isDark,
      contrast: config.contrast,
      style: config.style,
      secondary: config.secondary,
      tertiary: config.tertiary,
      neutral: config.neutral,
      neutralVariant: config.neutralVariant
    })
  })

  watch(() => config.seedColor, () => {
    console.log('seed color update')
    dynamicScheme.value = createDynamicScheme({
      seedColor: config.seedColor,
      style: config.style,
      contrast: config.contrast,
      isDark: config.isDark
    })

    ignoreUpdates(() => {
      config.primary = dynamicScheme.value.primaryPaletteKeyColor
      config.secondary = dynamicScheme.value.secondaryPaletteKeyColor
      config.tertiary = dynamicScheme.value.tertiaryPaletteKeyColor
      config.neutral = dynamicScheme.value.neutralPaletteKeyColor
      config.neutralVariant = dynamicScheme.value.neutralVariantPaletteKeyColor
    })
  }, { immediate: true })
})
