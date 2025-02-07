import { DynamicScheme, TonalPalette } from '@material/material-color-utilities'
import type { DynamicSchemeOptions } from '../../types/module'
import { paletteStyleScheme, type PaletteStyleScheme } from './paletteStyle'
import { paletteStyleVariant } from './constants'
import { toHct } from './hct'

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
  return color ? TonalPalette.fromInt(color) : fallback
}

/**
 * Generates a dynamic color scheme based on the provided configuration options.
 */
export function createDynamicScheme(options: DynamicSchemeOptions): Readonly<DynamicScheme> {
  const { contrastLevel = 0, isDark = false } = options

  const baseColorArgb = Number(options.seedColor || options.primary)
  const SchemeConstructor: PaletteStyleScheme = paletteStyleScheme(options.style)
  const dynamicSeedScheme = new SchemeConstructor(toHct(baseColorArgb), isDark, contrastLevel)

  if (hasSeedSourceColor(options)) {
    return dynamicSeedScheme
  }

  const defaultPalettes = {
    a1: dynamicSeedScheme.primaryPalette,
    a2: dynamicSeedScheme.secondaryPalette,
    a3: dynamicSeedScheme.tertiaryPalette,
    n1: dynamicSeedScheme.neutralPalette,
    n2: dynamicSeedScheme.neutralVariantPalette
  }

  return new DynamicScheme({
    sourceColorArgb: baseColorArgb,
    isDark,
    contrastLevel: contrastLevel,
    variant: paletteStyleVariant(options.style),
    primaryPalette: generateTonalPalette(options.primary, defaultPalettes.a1),
    secondaryPalette: generateTonalPalette(options.secondary, defaultPalettes.a2),
    tertiaryPalette: generateTonalPalette(options.tertiary, defaultPalettes.a3),
    neutralPalette: generateTonalPalette(options.neutral, defaultPalettes.n1),
    neutralVariantPalette: generateTonalPalette(options.neutralVariant, defaultPalettes.n2)
  })
}
