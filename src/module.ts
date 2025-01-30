import {addImportsDir, addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'
import {Contrast, PaletteStyle} from "./runtime/constants/contrast";
import type {MaterialDynamicOptions} from './types'

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
  },
  defaults: {
    source: 0,
    primary: 0,
    secondary: 0,
    tertiary: 0,
    neutral: 0,
    neutralVariant: 0,
    style: PaletteStyle.TonalSpot,
    contrast: Contrast.Medium,
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
    addPlugin(resolver.resolve('./runtime/plugins/payload/tonal-palette'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/dynamic-scheme'))
  },
})
