import {
  DynamicColor,
  type DynamicScheme,
  type Hct,
  hexFromArgb,
  MaterialDynamicColors
} from '@material/material-color-utilities'
import { isProxy, toRaw } from 'vue'

export function listMaterialDynamicColors() {
  const colors: Record<string, DynamicColor> = {}
  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      colors[name] = color
    }
  }
  return colors
}

export function colorsFromDynamicScheme<TFormat extends 'argb' | 'hct' | 'hex' = 'argb'>(
  dynamicScheme: DynamicScheme,
  format?: TFormat
): Record<string,
  TFormat extends 'hct' ? Hct :
    TFormat extends 'hex' ? string :
      number
> {
  const selectedFormat = (format ?? 'argb') as TFormat
  const scheme = dynamicScheme
  const colors: Record<string, number | Hct | string> = {}

  for (const [name, color] of Object.entries(MaterialDynamicColors)) {
    if (color instanceof DynamicColor) {
      if (selectedFormat === 'hct') {
        colors[name] = color.getHct(scheme)
      } else {
        const argb = color.getArgb(scheme)
        colors[name] = selectedFormat === 'argb' ? argb : hexFromArgb(argb)
      }
    }
  }

  return colors as Record<string,
    TFormat extends 'hct' ? Hct :
      TFormat extends 'hex' ? string :
        number
  >
}

// export function colorsFromDynamicScheme<Format extends 'argb' | 'hct' = 'argb'>(
//   dynamicScheme: DynamicScheme,
//   options?: { format: Format }
// ): Record<string, Format extends 'hct' ? Hct : number> {
//   const { format = 'argb' } = options ?? {};
//   const scheme = isProxy(dynamicScheme) ? toRaw(dynamicScheme) : dynamicScheme;
//   const colors: Record<string, number | Hct> = {};
//
//   for (const [name, color] of Object.entries(MaterialDynamicColors)) {
//     if (color instanceof DynamicColor) {
//       colors[name] = format === 'argb'
//         ? color.getArgb(scheme)
//         : color.getHct(scheme);
//     }
//   }
//
//   return colors as Record<string, Format extends 'hct' ? Hct : number>;
// }


// export function colorsFromDynamicScheme<Format extends 'argb' | 'hct' = 'argb'>(
//   dynamicScheme: DynamicScheme,
//   format?: Format
// ): Record<string, Format extends 'hct' ? Hct : number> {
//   const selectedFormat = (format ?? 'argb') as Format;
//   const scheme = isProxy(dynamicScheme) ? toRaw(dynamicScheme) : dynamicScheme;
//   const colors: Record<string, number | Hct> = {};
//
//   for (const [name, color] of Object.entries(MaterialDynamicColors)) {
//     if (color instanceof DynamicColor) {
//       colors[name] = selectedFormat === 'argb'
//         ? color.getArgb(scheme)
//         : color.getHct(scheme);
//     }
//   }
//
//   return colors as Record<string, Format extends 'hct' ? Hct : number>;
// }
