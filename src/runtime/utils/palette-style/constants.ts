/**
 * PALETTE_STYLES - A collection of palette styles.
 *
 * NOTE: The order of the keys in PALETTE_STYLES must be aligned with the internal variant enum values.
 * Changing this order without updating the corresponding enum mapping may result in incorrect variant resolution.
 */
export const PALETTE_STYLES = {
  Monochrome: 'Monochrome',
  Neutral: 'Neutral',
  TonalSpot: 'TonalSpot',
  Vibrant: 'Vibrant',
  Expressive: 'Expressive',
  Fidelity: 'Fidelity',
  Content: 'Content',
  Rainbow: 'Rainbow',
  FruitSalad: 'FruitSalad'
} as const


export type PaletteStyle = (typeof PALETTE_STYLES)[keyof typeof PALETTE_STYLES]

/**
 * Maps a given palette style to an internal variant index.
 * This index corresponds to an internal enum variant that isn't exposed by the library.
 *
 * @param style - The palette style to map.
 * @param defaultStyle - The fallback style if none is provided (defaults to TonalSpot).
 * @returns A numeric index representing the internal variant.
 */
export function mapPaletteStyleToInternalVariant(
  style?: PaletteStyle,
  defaultStyle: PaletteStyle = PALETTE_STYLES.TonalSpot
): number {
  const index = Object.values(PALETTE_STYLES).indexOf(style || defaultStyle)
  return index === -1 ? 0 : index
}
