import {  useRuntimeConfig } from 'nuxt/app'
import { computed } from 'vue'
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'

export function useMaterialTheme() {
  const theme = useRuntimeConfig().public.materialTheme
  return {
    seedColor: computed({
      get: () => hexFromArgb(theme.seedColor),
      set: (v) => theme.seedColor = argbFromHex(v)
    }),
    primary: computed({
      get: () => hexFromArgb(theme.primary),
      set: (v) => theme.primary = argbFromHex(v)
    }),
    secondary: computed({
      get: () => hexFromArgb(theme.secondary),
      set: (v) => theme.secondary = argbFromHex(v)
    }),
    tertiary: computed({
      get: () => hexFromArgb(theme.tertiary),
      set: (v) => theme.tertiary = argbFromHex(v)
    }),
    neutral: computed({
      get: () => hexFromArgb(theme.neutral),
      set: (v) => theme.neutral = argbFromHex(v)
    }),
    neutralVariant: computed({
      get: () => hexFromArgb(theme.neutralVariant),
      set: (v) => theme.neutralVariant = argbFromHex(v)
    })
  }
}
