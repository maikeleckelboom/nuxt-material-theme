import { customColor, TonalPalette } from '@material/material-color-utilities'
import { createDynamicScheme } from '../scheme'
import type { MaterialThemeOptions } from '../../../types/theme'
import type { MaterialTheme } from '../../../types/theme'



export function createMaterialTheme(options: MaterialThemeOptions): MaterialTheme {
  const {
    primary,
    secondary,
    tertiary,
    neutral,
    neutralVariant,
    error,
    contrastLevel = 0,
    style = 'TonalSpot',
    extendedColors = []
  } = options

  const seedColor = Number(options.seedColor || primary)

  const createScheme = (isDark: boolean = false) =>
    createDynamicScheme({
      seedColor,
      isDark,
      primary,
      secondary,
      tertiary,
      neutral,
      neutralVariant,
      error,
      contrastLevel,
      style
    })

  const generateTonalPalette = (color: number | undefined): TonalPalette =>
    TonalPalette.fromInt(typeof color === 'number' ? color : seedColor)

  return {
    seedColor,
    contrastLevel,
    style,
    schemes: {
      light: createScheme(),
      dark: createScheme(true)
    },
    palettes: {
      primary: generateTonalPalette(primary),
      secondary: generateTonalPalette(secondary),
      tertiary: generateTonalPalette(tertiary),
      neutral: generateTonalPalette(neutral),
      neutralVariant: generateTonalPalette(neutralVariant),
      error: generateTonalPalette(error)
    },
    customColors: extendedColors.map((color) =>
      customColor(seedColor, {
        ...color,
        blend: !!color.blend
      })
    )
  }
}
