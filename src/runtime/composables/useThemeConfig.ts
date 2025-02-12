import type { MaterialThemeRuntimeOptions } from '~/src/types'
import { useNuxtApp } from 'nuxt/app'
import { reactive } from 'vue'

export function useThemeConfig() {
  const { $config } = useNuxtApp()
  const options = $config.public.materialTheme.config
  return options as MaterialThemeRuntimeOptions['config']
}
