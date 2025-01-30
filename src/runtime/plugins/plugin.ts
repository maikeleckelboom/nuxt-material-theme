import {defineNuxtPlugin} from 'nuxt/app'
import {watch} from 'vue'
import {createDynamicScheme} from "../utils/dynamicScheme";
import {useDynamicScheme} from "../composables/useDynamicScheme";

export default defineNuxtPlugin(({$config}) => {
  const dynamicScheme = useDynamicScheme();
  const config = $config.public.materialDynamic
  dynamicScheme.value = createDynamicScheme(config)

  watch(() => config.seedColor, () => {
    console.log('🟠 SeedColorUpdates')
    dynamicScheme.value = createDynamicScheme({
      seedColor: config.seedColor,
      style: config.style,
      contrast: config.contrast,
      isDark: config.isDark,
    })
    config.seedColor = dynamicScheme.value.sourceColorArgb
    config.primary = dynamicScheme.value.primaryPalette.keyColor.toInt()
    config.secondary = dynamicScheme.value.secondaryPalette.keyColor.toInt()
    config.tertiary = dynamicScheme.value.tertiaryPalette.keyColor.toInt()
    config.neutral = dynamicScheme.value.neutralPalette.keyColor.toInt()
    config.neutralVariant = dynamicScheme.value.neutralVariantPalette.keyColor.toInt()
  })

  watch(() => [
    config.isDark,
    config.contrast,
    config.style,
    config.primary,
    config.secondary,
    config.tertiary,
    config.neutral,
    config.neutralVariant
  ], () => {
    console.log('🟠 StyleUpdates')
    dynamicScheme.value = createDynamicScheme({
      seedColor: config.seedColor,
      style: config.style,
      contrast: config.contrast,
      isDark: config.isDark,
      primary: config.primary,
      secondary: config.secondary,
      tertiary: config.tertiary,
      neutral: config.neutral,
      neutralVariant: config.neutralVariant
    })
    config.primary = dynamicScheme.value.primaryPalette.keyColor.toInt()
    config.secondary = dynamicScheme.value.secondaryPalette.keyColor.toInt()
    config.tertiary = dynamicScheme.value.tertiaryPalette.keyColor.toInt()
    config.neutral = dynamicScheme.value.neutralPalette.keyColor.toInt()
    config.neutralVariant = dynamicScheme.value.neutralVariantPalette.keyColor.toInt()
  })
})
