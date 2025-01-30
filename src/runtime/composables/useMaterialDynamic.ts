import {useNuxtApp, useRuntimeConfig} from 'nuxt/app'
import {computed} from 'vue'
import {argbFromHex, hexFromArgb} from "@material/material-color-utilities";
import type {IgnoredUpdater} from "@vueuse/shared";
import {useDynamicScheme} from "./useDynamicScheme";

export function useMaterialDynamic() {
  const {$ignoreColorUpdates, $ignoreSourceUpdates} = useNuxtApp() as unknown as {
    $ignoreColorUpdates: IgnoredUpdater
    $ignoreSourceUpdates: IgnoredUpdater
  }
  const config = useRuntimeConfig().public.materialDynamic
  const scheme = useDynamicScheme()
  return {
    seedColor: computed({
      get: () => hexFromArgb(config.seedColor || scheme.value.sourceColorArgb),
      set: (v: string) => $ignoreColorUpdates(() => config.seedColor = argbFromHex(v))
    }),
    primary: computed({
      get: () => hexFromArgb(config.primary || scheme.value.primaryPalette.keyColor.toInt()),
      set: (v: string) => $ignoreSourceUpdates(() => config.primary = argbFromHex(v))
    }),
    secondary: computed({
      get: () => hexFromArgb(config.secondary || scheme.value.secondaryPalette.keyColor.toInt()),
      set: (v: string) => config.secondary = argbFromHex(v)
    }),
    tertiary: computed({
      get: () => hexFromArgb(config.tertiary || scheme.value.tertiaryPalette.keyColor.toInt()),
      set: (v: string) => config.tertiary = argbFromHex(v)
    }),
    neutral: computed({
      get: () => hexFromArgb(config.neutral || scheme.value.neutralPalette.keyColor.toInt()),
      set: (v: string) => config.neutral = argbFromHex(v)
    }),
    neutralVariant: computed({
      get: () => hexFromArgb(config.neutralVariant || scheme.value.neutralVariantPalette.keyColor.toInt()),
      set: (v: string) => config.neutralVariant = argbFromHex(v)
    })
  }
}
