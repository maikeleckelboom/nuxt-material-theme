import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { MaterialDynamicModuleOptions } from './types'

export default defineNuxtModule<MaterialDynamicModuleOptions>({
  meta: {
    name: 'nuxt-material-dynamic',
    configKey: 'materialDynamic',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
