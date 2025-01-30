import { QuantizerCelebi } from '@material/material-color-utilities'

export function quantizeColors(pixels: number[], maxColors: number = 200): Map<number, number> {
  return QuantizerCelebi.quantize(pixels, maxColors)
}
