import {addImportsDir, addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'
import {argbFromHex} from "@material/material-color-utilities";
import type {MaterialDynamicOptions} from './types'
import {PALETTE_STYLE} from "./types/palette-style";
import {useDynamicScheme} from "./runtime/composables/useDynamicScheme";

declare module '@nuxt/schema' {
  interface NuxtOptions {
    materialDynamic?: MaterialDynamicOptions
  }

  interface PublicRuntimeConfig {
    materialDynamic: MaterialDynamicOptions
  }
}

export default defineNuxtModule<MaterialDynamicOptions>({
  meta: {
    name: 'nuxt-material-dynamic',
    configKey: 'materialDynamic',
    dependencies: ['@material/material-color-utilities']
  },
  defaults: {
    seedColor: argbFromHex('#ff00f2'),
    style: PALETTE_STYLE.TonalSpot,
    contrast: 0,
    isDark: false,
    isAmoled: false,
    extended: []
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.materialDynamic = options

    nuxt.hook('modules:done', () => {
      console.log('My module is ready with current options: ', options)

    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addImportsDir(resolver.resolve('./runtime/composables'))
    addPlugin(resolver.resolve('./runtime/plugins/plugin'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/hct'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/tonalPalette'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/dynamicScheme'))


  },
})
