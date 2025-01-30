import {CorePalette, DynamicScheme, TonalPalette} from "@material/material-color-utilities";
import {paletteStyleVariant} from "../../types/palette-style";
import type {DynamicSchemeOptions} from "../../types";

export function createDynamicScheme(options: DynamicSchemeOptions): DynamicScheme {
  const sourceColorArgb = Number(options.seedColor || options.primary)
  const seedPalette = CorePalette.of(sourceColorArgb)

  const corePalette = CorePalette.fromColors({
    primary: options.primary || seedPalette.a1.keyColor.toInt(),
    secondary: options.secondary || seedPalette.a2.keyColor.toInt(),
    tertiary: options.tertiary || seedPalette.a3.keyColor.toInt(),
    neutral: options.neutral || seedPalette.n1.keyColor.toInt(),
    neutralVariant: options.neutralVariant || seedPalette.n2.keyColor.toInt()
  })

  const {contrast: contrastLevel = 0, isDark = false} = options

  return new DynamicScheme({
    sourceColorArgb,
    isDark,
    contrastLevel,
    variant: paletteStyleVariant(options.style),
    primaryPalette: options.primary ? TonalPalette.fromInt(options.primary) : corePalette.a1,
    secondaryPalette: options.secondary ? TonalPalette.fromInt(options.secondary) : corePalette.a2,
    tertiaryPalette: options.tertiary ? TonalPalette.fromInt(options.tertiary) : corePalette.a3,
    neutralPalette: options.neutral ? TonalPalette.fromInt(options.neutral) : corePalette.n1,
    neutralVariantPalette: options.neutralVariant ? TonalPalette.fromInt(options.neutralVariant) : corePalette.n2
  })
}
