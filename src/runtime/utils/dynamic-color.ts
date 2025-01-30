import {DynamicColor, type DynamicScheme} from "@material/material-color-utilities";

export function filterMaterialColors(scheme: DynamicScheme) {
  const colors: Record<string, number> = {}
  for (const [name, color] of Object.entries(scheme)) {
    if (color instanceof DynamicColor) {
      colors[name] = color.getArgb(scheme)
    }
  }
  return colors
}



