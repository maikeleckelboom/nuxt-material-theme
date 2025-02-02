import { defineNuxtPlugin } from 'nuxt/app'
import { watchIgnorable } from '@vueuse/core'
import { createDynamicScheme } from '../utils/dynamicScheme'
import { useDynamicScheme } from '../composables/useDynamicScheme'

export default defineNuxtPlugin(({ $config }) => {
  const dynamicScheme = useDynamicScheme()
  const config = $config.public.materialTheme

  const { ignoreUpdates } = watchIgnorable(() => [
    config.primary,
    config.isDark,
    config.contrastLevel,
    config.style,
    config.secondary,
    config.tertiary,
    config.neutral,
    config.neutralVariant
  ], () => {
    dynamicScheme.value = createDynamicScheme(config)
  }, { immediate: true })

  const { ignoreUpdates: ignoreSeedColorUpdates } = watchIgnorable(() => config.seedColor, () => {
    dynamicScheme.value = createDynamicScheme({
      seedColor: config.seedColor,
      isDark: config.isDark,
      style: config.style,
      contrastLevel: config.contrastLevel
    })

    ignoreUpdates(() => {
      config.primary = dynamicScheme.value.primaryPaletteKeyColor
      config.secondary = dynamicScheme.value.secondaryPaletteKeyColor
      config.tertiary = dynamicScheme.value.tertiaryPaletteKeyColor
      config.neutral = dynamicScheme.value.neutralPaletteKeyColor
      config.neutralVariant = dynamicScheme.value.neutralVariantPaletteKeyColor
    })
  })

  return {
    provide: {
      ignoreSeedColorUpdates
    }
  }
})
