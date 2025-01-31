import { defineNuxtPlugin } from 'nuxt/app'
import { watchIgnorable } from '@vueuse/core'
import { createDynamicScheme } from '../utils/dynamicScheme'
import { useDynamicScheme } from '../composables/useDynamicScheme'


export default defineNuxtPlugin(({ $config }) => {
  const dynamicScheme = useDynamicScheme()
  const config = $config.public.materialDynamic

  const { ignoreUpdates: ignoreColorUpdates } = watchIgnorable(() => [
    config.isDark,
    config.contrast,
    config.style,
    config.primary,
    config.secondary,
    config.tertiary,
    config.neutral,
    config.neutralVariant
  ], () => {
    dynamicScheme.value = createDynamicScheme({
      seedColor: config.seedColor,
      isDark: config.isDark,
      contrast: config.contrast,
      style: config.style,
      primary: config.primary,
      secondary: config.secondary,
      tertiary: config.tertiary,
      neutral: config.neutral,
      neutralVariant: config.neutralVariant
    })
    console.log('🔴 Updated by core config')
  })

  const { ignoreUpdates: ignoreSourceUpdates } = watchIgnorable(() => config.seedColor, () => {

    dynamicScheme.value = createDynamicScheme({
      seedColor: config.seedColor,
      style: config.style,
      contrast: config.contrast,
      isDark: config.isDark,
    })

    ignoreColorUpdates(() => {
      config.primary = dynamicScheme.value.primaryPaletteKeyColor
      config.secondary = dynamicScheme.value.secondaryPaletteKeyColor
      config.tertiary = dynamicScheme.value.tertiaryPaletteKeyColor
      config.neutral = dynamicScheme.value.neutralPaletteKeyColor
      config.neutralVariant = dynamicScheme.value.neutralVariantPaletteKeyColor
    })

    console.log('🔵 Updated by seed color')
  }, { immediate: true })

  return {
    provide: {
      dynamicScheme,
      materialConfig: config,
      ignoreSourceUpdates,
      ignoreColorUpdates
    }
  }
})
