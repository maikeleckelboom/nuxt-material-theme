import { CorePalette, DynamicScheme, Hct, TonalPalette } from '@material/material-color-utilities'
import { paletteStyleScheme, paletteStyleVariant } from '../../types/palette-style'
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
 * Create a tonal palette from the provided color, or fallback to the provided palette.
 */
function tonalPaletteFromColor(color: number | undefined, fallbackPalette: TonalPalette): TonalPalette {
  return color ? TonalPalette.fromInt(color) : fallbackPalette
}

/**
 * Create a dynamic scheme based on the provided options.
 */
export function createDynamicScheme(options: DynamicSchemeOptions): DynamicScheme {
  const { contrast: contrastLevel = 0, isDark = false } = options

  const sourceColorArgb = Number(options.seedColor || options.primary)

  const seedPalette = CorePalette.of(sourceColorArgb)

  if (isSeedBased(options)) {
    const Scheme = paletteStyleScheme(options.style)
    return new Scheme(Hct.fromInt(sourceColorArgb), isDark, contrastLevel)
  }

  return new DynamicScheme({
    sourceColorArgb,
    isDark,
    contrastLevel,
    variant: paletteStyleVariant(options.style),
    primaryPalette: tonalPaletteFromColor(options.primary, seedPalette.a1),
    secondaryPalette: tonalPaletteFromColor(options.secondary, seedPalette.a2),
    tertiaryPalette: tonalPaletteFromColor(options.tertiary, seedPalette.a3),
    neutralPalette: tonalPaletteFromColor(options.neutral, seedPalette.n1),
    neutralVariantPalette: tonalPaletteFromColor(options.neutralVariant, seedPalette.n2)
  })
}
