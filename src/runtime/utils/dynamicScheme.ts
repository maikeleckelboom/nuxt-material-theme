import { CorePalette, DynamicScheme, Hct } from '@material/material-color-utilities'
import { getSchemeForPaletteStyle, paletteStyleVariant } from '../../types/palette-style'
import type { DynamicSchemeOptions } from '../../types'

/**
 * Check if options are seed-based by verifying the presence of seedColor or primary,
 * and ensuring that secondary, tertiary, neutral, and neutralVariant are all missing.
 */
function isSeedBased(options: DynamicSchemeOptions): boolean {
  const hasSource = options.seedColor || options.primary
  const withoutColors = !options.secondary && !options.tertiary && !options.neutral && !options.neutralVariant
  return hasSource && withoutColors
}

/**
 * Create a dynamic scheme based on the provided options.
 */
export function createDynamicScheme(options: DynamicSchemeOptions): DynamicScheme {
  const sourceColorArgb = Number(options.seedColor || options.primary)
  const { contrast: contrastLevel = 0, isDark = false } = options

  if (isSeedBased(options)) {
    const Scheme = getSchemeForPaletteStyle(options.style)
    return new Scheme(Hct.fromInt(sourceColorArgb), isDark, contrastLevel)
  }

  const seedPalette = CorePalette.of(sourceColorArgb)

  const corePalette = CorePalette.fromColors({
    primary: Number(options.primary || options.seedColor),
    secondary: options.secondary,
    tertiary: options.tertiary,
    neutral: options.neutral,
    neutralVariant: options.neutralVariant
  })

  return new DynamicScheme({
    sourceColorArgb,
    isDark,
    contrastLevel,
    variant: paletteStyleVariant(options.style),
    primaryPalette: options.primary ? corePalette.a1 : seedPalette.a1,
    secondaryPalette: options.secondary ? corePalette.a2 : seedPalette.a2,
    tertiaryPalette: options.tertiary ? corePalette.a3 : seedPalette.a3,
    neutralPalette: options.neutral ? corePalette.n1 : seedPalette.n1,
    neutralVariantPalette: options.neutralVariant ? corePalette.n2 : seedPalette.n2
  })
}
