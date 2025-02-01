import type { MaterialThemeOptions } from '../../types/module'
import { useDynamicScheme } from './useDynamicScheme'

export function useMaterialTheme(options: MaterialThemeOptions) {
  const dynamicScheme = useDynamicScheme()

  return {
    dynamicScheme
  }
}
