import { CorePalette, DynamicScheme, Hct, TonalPalette } from '@material/material-color-utilities'
import type { DynamicSchemeOptions } from '../../types/module'
import { type PaletteStyleScheme, paletteStyleScheme, paletteStyleVariant } from '../../types/paletteStyle'

/**
 * Determines if options are using a seed-based approach by checking for a source color
 * and ensuring no other specific colors are provided.
 */
function hasSeedSourceColor(options: DynamicSchemeOptions): boolean {
  const hasColorSource = !!options.seedColor || !!options.primary
  return hasColorSource && !Object.values({
    secondary: options.secondary,
    tertiary: options.tertiary,
    neutral: options.neutral,
    neutralVariant: options.neutralVariant
  }).some(Boolean)
}

/**
 * Creates a tonal palette from the given color or uses the fallback if no color is provided.
 */
function generateTonalPalette(color: number | undefined, fallback: TonalPalette): TonalPalette {
  return color ? TonalPalette.fromInt(color) : fallback
}

/**
 * Generates a dynamic color scheme based on the provided configuration options.
 */
export function createDynamicScheme(options: DynamicSchemeOptions): Readonly<DynamicScheme> {
  const { contrastLevel = 0, isDark = false } = options
  const baseColorArgb = Number(options.seedColor || options.primary)
  const defaultPalettes = CorePalette.of(baseColorArgb)

  if (hasSeedSourceColor(options)) {
    const SchemeConstructor: PaletteStyleScheme = paletteStyleScheme(options.style)
    return Object.freeze(new SchemeConstructor(Hct.fromInt(baseColorArgb), isDark, contrastLevel))
  }

  return Object.freeze(new DynamicScheme({
    sourceColorArgb: baseColorArgb,
    isDark,
    contrastLevel: contrastLevel,
    variant: paletteStyleVariant(options.style),
    primaryPalette: generateTonalPalette(options.primary, defaultPalettes.a1),
    secondaryPalette: generateTonalPalette(options.secondary, defaultPalettes.a2),
    tertiaryPalette: generateTonalPalette(options.tertiary, defaultPalettes.a3),
    neutralPalette: generateTonalPalette(options.neutral, defaultPalettes.n1),
    neutralVariantPalette: generateTonalPalette(options.neutralVariant, defaultPalettes.n2)
  }))
}
