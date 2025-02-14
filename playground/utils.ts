import { argbFromHex } from '@material/material-color-utilities'
import { contrastColor } from '../src/runtime/utils/contrast'
import { fixIfDisliked } from '../src/runtime/utils/dislike'
import type { ColorScheme } from '../src/types'

export function modifyColorScheme(scheme: ColorScheme): ColorScheme {
  const brandColor = argbFromHex('#a166d9')
  const alienColor = argbFromHex('#86da6a')
  return {
    ...scheme,
    brandColor: brandColor,
    onBrandColor: contrastColor(brandColor),
    alienOutline: fixIfDisliked(alienColor)
  }
}
