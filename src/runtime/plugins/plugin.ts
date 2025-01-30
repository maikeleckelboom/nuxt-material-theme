import {defineNuxtPlugin} from 'nuxt/app'
import {watchIgnorable} from '@vueuse/core'
import {createDynamicScheme} from "../utils/dynamicScheme";
import {useDynamicScheme} from "../composables/useDynamicScheme";


export default defineNuxtPlugin(({$config}) => {
  const dynamicScheme = useDynamicScheme();
  const config = $config.public.materialDynamic

  const {ignoreUpdates: ignoreColorUpdates} = watchIgnorable(() => [
    config.isDark,
    config.contrast,
    config.style,
    config.primary,
    config.secondary,
    config.tertiary,
    config.neutral,
    config.neutralVariant
  ], () => {
    console.log('🟢 KeyColorUpdates')
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
  })

  const {ignoreUpdates: ignoreSourceUpdates} = watchIgnorable(() => config.seedColor, () => {
    console.log('🟠 SourceColorUpdates')
    dynamicScheme.value = createDynamicScheme({
      seedColor: config.seedColor,
      style: config.style,
      contrast: config.contrast,
      isDark: config.isDark
    })

    ignoreColorUpdates(() => {
      config.seedColor = dynamicScheme.value.sourceColorArgb
      config.primary = dynamicScheme.value.primaryPalette.keyColor.toInt()
      config.secondary = dynamicScheme.value.secondaryPalette.keyColor.toInt()
      config.tertiary = dynamicScheme.value.tertiaryPalette.keyColor.toInt()
      config.neutral = dynamicScheme.value.neutralPalette.keyColor.toInt()
      config.neutralVariant = dynamicScheme.value.neutralVariantPalette.keyColor.toInt()
    })
  }, {immediate: true})

  return {
    provide: {
      dynamicScheme,
      materialConfig: config,
      ignoreSourceUpdates,
      ignoreColorUpdates
    }
  }
})
