import {addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'
import {argbFromHex} from "@material/material-color-utilities";
import {Contrast, PaletteStyle} from "./runtime/constants/contrast";
import type {MaterialDynamicOptions} from './types'

export default defineNuxtModule<MaterialDynamicOptions>({
  meta: {
    name: 'nuxt-material-dynamic',
    configKey: 'materialDynamic',
  },
  defaults: {
    isDark: false,
    style: PaletteStyle.TonalSpot,
    contrast: Contrast.Default,
    source: 0,
    primary: 0,
    secondary: 0,
    tertiary: 0,
    neutral: 0,
    neutralVariant: 0,
    extended: [
      {
        name: 'Extended Color',
        value: argbFromHex('#00bbff'),
      }
    ]
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
