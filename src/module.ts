import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { argbFromHex } from '@material/material-color-utilities'
import { PALETTE_STYLE } from './types/palette-style'
import { CONTRAST_LEVEL } from './types/contrastLevel'
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

export default defineNuxtModule<MaterialThemeOptions>({
  meta: {
    name: 'nuxt-material-dynamic',
    configKey: 'materialTheme',
    dependencies: ['@material/material-color-utilities']
  },
  defaults: {
    // Use primary to avoid overwriting user-provided primary with seedColor
    primary: argbFromHex('#f1ff81'),
    style: PALETTE_STYLE.TonalSpot,
    contrast: CONTRAST_LEVEL.Default,
    isDark: false,
    withAmoled: true,
    extended: [
      {
        name: 'Grass',
        value: argbFromHex('#32702f')
      }
    ]
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Imports
    addImportsDir(resolver.resolve('./runtime/composables'))
    addImportsDir(resolver.resolve('./runtime/utils'))

    // Plugins
    addPlugin(resolver.resolve('./runtime/plugins/payload/hct'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/tonalPalette'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/dynamicScheme'))
    addPlugin(resolver.resolve('./runtime/plugins/plugin'))

    // Runtime config
    nuxt.hook('modules:done', () => {
      if (!options.seedColor) options.seedColor = options.primary
      const scheme = createDynamicScheme(options)
      options.primary ??= scheme.primaryPaletteKeyColor
      options.secondary ??= scheme.secondaryPaletteKeyColor
      options.tertiary ??= scheme.tertiaryPaletteKeyColor
      options.neutral ??= scheme.neutralPaletteKeyColor
      options.neutralVariant ??= scheme.neutralVariantPaletteKeyColor

      nuxt.options.runtimeConfig.public.materialTheme = <MaterialThemeRuntimeOptions>options
    })
  }
})
