import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { argbFromHex } from '@material/material-color-utilities'
import type { MaterialThemeOptions, MaterialThemeRuntimeOptions } from './types'
import { createDynamicScheme } from './runtime/utils/dynamic-scheme'

declare module '@nuxt/schema' {
  interface NuxtOptions {
    materialTheme: MaterialThemeOptions
  }

  interface PublicRuntimeConfig {
    materialTheme: MaterialThemeRuntimeOptions
  }
}

async function initializeRuntimeConfig(options: MaterialThemeOptions, defaultColor: string = '#00dc82'): Promise<MaterialThemeRuntimeOptions> {
  if (!options.seedColor) {
    options.seedColor = options.primary || argbFromHex(defaultColor)
  }

  const dynamicScheme = createDynamicScheme(options)

  options.primary ??= dynamicScheme.primaryPaletteKeyColor
  options.secondary ??= dynamicScheme.secondaryPaletteKeyColor
  options.tertiary ??= dynamicScheme.tertiaryPaletteKeyColor
  options.neutral ??= dynamicScheme.neutralPaletteKeyColor
  options.neutralVariant ??= dynamicScheme.neutralVariantPaletteKeyColor

  return <MaterialThemeRuntimeOptions>options
}


export default defineNuxtModule<MaterialThemeOptions>({
  meta: {
    name: 'nuxt-material-theme',
    configKey: 'materialTheme',
    dependencies: ['@material/material-color-utilities', '@vueuse/core', 'change-case']
  },
  defaults: {
    extendedColors: [],
    style: 'TonalSpot',
    contrastLevel: 0,
    isDark: false,
    config: {
      stateId: 'theme'
    }
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/composables'))
    addImportsDir(resolver.resolve('./runtime/utils'))

    addPlugin(resolver.resolve('./runtime/plugins/hct'))
    addPlugin(resolver.resolve('./runtime/plugins/tonalPalette'))
    addPlugin(resolver.resolve('./runtime/plugins/dynamicScheme'))
    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.hook('modules:done', async () => {
      nuxt.options.runtimeConfig.public.materialTheme = await initializeRuntimeConfig(options)
    })
  }
})
