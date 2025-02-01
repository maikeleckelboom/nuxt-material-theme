import { CorePalette, DynamicScheme, Hct, TonalPalette } from '@material/material-color-utilities'
import { getSchemeForPaletteStyle, paletteStyleVariant } from '../../types/palette-style'
import type { DynamicSchemeOptions } from '../../types/module'

/**
 * Check if options are seed-based by verifying the presence of seedColor or primary,
 * and ensuring that secondary, tertiary, neutral, and neutralVariant are all missing.
 */
function isSeedBased(options: DynamicSchemeOptions): boolean {
  const hasSource = !!options.seedColor || !!options.primary
  const withoutColors = !options.secondary && !options.tertiary && !options.neutral && !options.neutralVariant
  return (hasSource && withoutColors)
}

/**
 * Create a dynamic scheme based on the provided options.
 */
export function createDynamicScheme(options: DynamicSchemeOptions): DynamicScheme {
  const { contrast: contrastLevel = 0, isDark = false } = options

  const sourceColorArgb = Number(options.seedColor || options.primary)

  if (isSeedBased(options)) {
    const Scheme = getSchemeForPaletteStyle(options.style)
    return new Scheme(Hct.fromInt(sourceColorArgb), isDark, contrastLevel)
  }

  const seedPalette = CorePalette.contentOf(sourceColorArgb)

  return new DynamicScheme({
    sourceColorArgb,
    isDark,
    contrastLevel,
    variant: paletteStyleVariant(options.style),
    primaryPalette: options.primary ? TonalPalette.fromInt(options.primary) : seedPalette.a1,
    secondaryPalette: options.secondary ? TonalPalette.fromInt(options.secondary) : seedPalette.a2,
    tertiaryPalette: options.tertiary ? TonalPalette.fromInt(options.tertiary) : seedPalette.a3,
    neutralPalette: options.neutral ? TonalPalette.fromInt(options.neutral) : seedPalette.n1,
    neutralVariantPalette: options.neutralVariant ? TonalPalette.fromInt(options.neutralVariant) : seedPalette.n2
  })
}
