import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { argbFromHex } from '@material/material-color-utilities'
import type { MaterialThemeOptions, MaterialThemeRuntimeOptions } from './types/module'
import { createDynamicScheme } from './runtime/utils/dynamicScheme'

declare module '@nuxt/schema' {
  interface NuxtOptions {
    materialTheme: MaterialThemeOptions
  }

  interface PublicRuntimeConfig {
    materialTheme: MaterialThemeRuntimeOptions
  }
}

function initializeRuntimeConfig(options: MaterialThemeOptions) {
  if (!options.seedColor) {
    options.seedColor = options.primary || argbFromHex('#00dc82')
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
    withAmoled: false,
    isExtendedFidelity: false,
    brightnessVariants: false
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/composables'))
    addImportsDir(resolver.resolve('./runtime/utils'))

    addPlugin(resolver.resolve('./runtime/plugins/payload/hct'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/tonalPalette'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/dynamicScheme'))
    addPlugin(resolver.resolve('./runtime/plugins/plugin'))

    nuxt.hook('modules:done', () => {
      nuxt.options.runtimeConfig.public.materialTheme =
        initializeRuntimeConfig(options)
    })
  }
})
