import { CorePalette, DynamicScheme, Hct } from '@material/material-color-utilities'
import { getSchemeForPaletteStyle, paletteStyleVariant } from '../../types/palette-style'
import type { DynamicSchemeOptions } from '../../types'

function isSeedBased(options: DynamicSchemeOptions): boolean {
  const { seedColor, primary, secondary, tertiary, neutral, neutralVariant } = options
  return (seedColor && [primary, secondary, tertiary, neutral, neutralVariant].every(Boolean))
}

export function createDynamicScheme(options: DynamicSchemeOptions): DynamicScheme {
  const sourceColorArgb = Number(options.seedColor || options.primary)
  const _seedPalette = CorePalette.of(sourceColorArgb)

  const corePalette = CorePalette.fromColors({
    primary: Number(options.primary || options.seedColor),
    secondary: options.secondary,
    tertiary: options.tertiary,
    neutral: options.neutral,
    neutralVariant: options.neutralVariant
  })
  const { contrast: contrastLevel = 0, isDark = false } = options

  if (isSeedBased(options)) {
    const Scheme = getSchemeForPaletteStyle(options.style)
    return new Scheme(Hct.fromInt(sourceColorArgb), isDark, contrastLevel)
  }

  return new DynamicScheme({
    sourceColorArgb,
    isDark,
    contrastLevel,
    variant: paletteStyleVariant(options.style),
    primaryPalette: corePalette.a1,
    secondaryPalette: corePalette.a2,
    tertiaryPalette: corePalette.a3,
    neutralPalette: corePalette.n1,
    neutralVariantPalette: corePalette.n2
  })

  // return new DynamicScheme({
  //   sourceColorArgb,
  //   isDark,
  //   contrastLevel,
  //   variant: paletteStyleVariant(options.style),
  //   primaryPalette: options.primary ?  corePalette.a1 : seedPalette.a1,
  //   secondaryPalette: options.secondary ? corePalette.a2 : seedPalette.a2,
  //   tertiaryPalette: options.tertiary ? corePalette.a3 : seedPalette.a3,
  //   neutralPalette: options.neutral ? corePalette.n1 : seedPalette.n1,
  //   neutralVariantPalette: options.neutralVariant ? corePalette.n2 : seedPalette.n2
  // })
}
