import { useNuxtApp } from 'nuxt/app'

export function useThemeConfig() {
  const { $config } = useNuxtApp()
  return $config.public.materialTheme.config
}
