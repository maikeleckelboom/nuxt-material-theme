import { useNuxtApp, useRuntimeConfig } from 'nuxt/app'
import { computed } from 'vue'
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import type { IgnoredUpdater } from '@vueuse/shared'

import { useDynamicScheme } from './useDynamicScheme'

export function useMaterialDynamic() {
  const { $ignoreColorUpdates, $ignoreSourceUpdates } = useNuxtApp() as unknown as {
    $ignoreColorUpdates: IgnoredUpdater
    $ignoreSourceUpdates: IgnoredUpdater
  }

  const config = useRuntimeConfig().public.materialDynamic

  const _scheme = useDynamicScheme()

  return {
    seedColor: computed({
      get: () => hexFromArgb(config.seedColor),
      set: (v) => $ignoreColorUpdates(() => {
        config.seedColor = argbFromHex(v)
      })
    }),
    primary: computed({
      get: () => hexFromArgb(config.primary),
      set: (v) => $ignoreSourceUpdates(() => {
        config.primary = config.seedColor = argbFromHex(v)
      })
    }),
    secondary: computed({
      get: () => hexFromArgb(config.secondary),
      set: (v) => config.secondary = argbFromHex(v)
    }),
    tertiary: computed({
      get: () => hexFromArgb(config.tertiary),
      set: (v) => config.tertiary = argbFromHex(v)
    }),
    neutral: computed({
      get: () => hexFromArgb(config.neutral),
      set: (v) => config.neutral = argbFromHex(v)
    }),
    neutralVariant: computed({
      get: () => hexFromArgb(config.neutralVariant),
      set: (v) => config.neutralVariant = argbFromHex(v)
    })
  }
}
