import { defineNuxtPlugin } from 'nuxt/app'
import { watchIgnorable } from '@vueuse/core'
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
    console.log('Trigger by color updates')
    dynamicScheme.value = createDynamicScheme({
      isDark: config.isDark,
      contrast: config.contrast,
      style: config.style,
      primary: config.primary,
      secondary: config.secondary,
      tertiary: config.tertiary,
      neutral: config.neutral,
      neutralVariant: config.neutralVariant
    })
  })

  watchIgnorable(() => config.seedColor, () => {
    console.log('Trigger by seed color update')
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
