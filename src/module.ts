import {addImportsDir, addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'
import {argbFromHex} from "@material/material-color-utilities";
import type {MaterialThemeOptions} from './types'
import {PALETTE_STYLE} from "./types/palette-style";
import {CONTRAST} from "./types/contrast";

declare module '@nuxt/schema' {
  interface NuxtOptions {
    materialDynamic?: MaterialThemeOptions
  }

  interface PublicRuntimeConfig {
    materialDynamic: MaterialThemeOptions
  }
}

export default defineNuxtModule<MaterialThemeOptions>({
  meta: {
    name: 'nuxt-material-dynamic',
    configKey: 'materialDynamic',
    dependencies: ['@material/material-color-utilities']
  },
  defaults: {
    seedColor: argbFromHex('#ff00f2'),
    style: PALETTE_STYLE.TonalSpot,
    contrast: CONTRAST.Medium,
    isDark: false,
    isAmoled: false,
    extended: []
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.materialDynamic = options

    // Auto-import directories
    addImportsDir(resolver.resolve('./runtime/composables'))
    addImportsDir(resolver.resolve('./runtime/utils'))

    // Plugins
    addPlugin(resolver.resolve('./runtime/plugins/payload/hct'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/tonalPalette'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/dynamicScheme'))
    addPlugin(resolver.resolve('./runtime/plugins/plugin'))

    nuxt.hook('modules:done', () => {
      console.log('My module is ready with current options: ', options)
    })
  },
})
