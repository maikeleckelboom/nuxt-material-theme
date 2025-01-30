import {addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'
import type {MaterialDynamicModuleOptions} from './types'

export default defineNuxtModule<MaterialDynamicModuleOptions>({
  meta: {
    name: 'nuxt-material-dynamic',
    configKey: 'materialDynamic',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    source: 0,
    core: {
      primary: 0,
      secondary: 0,
      tertiary: 0,
      neutral: 0,
      neutralVariant: 0
    },
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)


    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugins/plugin'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/hct'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/tonal-palette'))
    addPlugin(resolver.resolve('./runtime/plugins/payload/dynamic-scheme'))
  },
})
