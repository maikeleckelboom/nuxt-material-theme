import { useRuntimeConfig } from 'nuxt/app'

export function useMaterialTheme() {
  const config = useRuntimeConfig().public.materialTheme
  return {
    config
  }
}
