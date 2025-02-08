import { DynamicScheme, TonalPalette } from '@material/material-color-utilities'
import type { DynamicSchemeOptions } from '../../../types'
import { getPaletteScheme, type PaletteScheme } from '../palette-style'
import { mapPaletteStyleToInternalVariant } from '../palette-style'
import { toHct } from '../hct'

/**
 * Determines if options are using a seed-based approach by checking for a source color
 * and ensuring no other specific colors are provided.
 */
function hasSeedSourceColor(options: DynamicSchemeOptions): boolean {
  const hasColorSource = !!options.seedColor || !!options.primary
  return (
    hasColorSource &&
    !Object.values({
      secondary: options.secondary,
      tertiary: options.tertiary,
      neutral: options.neutral,
      neutralVariant: options.neutralVariant
    }).some(Boolean)
  )
}

/**
 * Creates a tonal palette from the given color or uses the fallback if no color is provided.
 */
function generateTonalPalette(color: number | undefined, fallback: TonalPalette): TonalPalette {
  return typeof color === 'number' ? TonalPalette.fromInt(color) : fallback
}

/**
 * Generates a dynamic color scheme based on the provided configuration options.
 */
export function createDynamicScheme(options: DynamicSchemeOptions): DynamicScheme {
  const { contrastLevel = 0, isDark = false } = options

  const baseColorArgb = Number(options.seedColor || options.primary)

  const Scheme: PaletteScheme = getPaletteScheme(options.style)
  const scheme = new Scheme(toHct(baseColorArgb), isDark, contrastLevel)

  if (hasSeedSourceColor(options)) {
    return scheme
  }

  const core = {
    a1: scheme.primaryPalette,
    a2: scheme.secondaryPalette,
    a3: scheme.tertiaryPalette,
    n1: scheme.neutralPalette,
    n2: scheme.neutralVariantPalette
  }

  return new DynamicScheme({
    sourceColorArgb: baseColorArgb,
    isDark,
    contrastLevel: contrastLevel,
    variant: mapPaletteStyleToInternalVariant(options.style),
    primaryPalette: generateTonalPalette(options.primary, core.a1),
    secondaryPalette: generateTonalPalette(options.secondary, core.a2),
    tertiaryPalette: generateTonalPalette(options.tertiary, core.a3),
    neutralPalette: generateTonalPalette(options.neutral, core.n1),
    neutralVariantPalette: generateTonalPalette(options.neutralVariant, core.n2)
  })
}
