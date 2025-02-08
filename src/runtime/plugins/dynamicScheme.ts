import {definePayloadPlugin, definePayloadReducer, definePayloadReviver} from "nuxt/app";
import {DynamicScheme, Hct, TonalPalette} from "@material/material-color-utilities";

export default definePayloadPlugin(() => {
  definePayloadReducer('DynamicScheme', (data) => {
    if (data instanceof DynamicScheme) {
      return {
        variant: data.variant,
        contrastLevel: data.contrastLevel,
        isDark: data.isDark,
        sourceColorArgb: data.sourceColorArgb,
        primaryPalette: {
          keyColor: {
            hue: data.primaryPalette.keyColor.hue,
            chroma: data.primaryPalette.keyColor.chroma,
            tone: data.primaryPalette.keyColor.tone
          }
        },
        secondaryPalette: {
          keyColor: {
            hue: data.secondaryPalette.keyColor.hue,
            chroma: data.secondaryPalette.keyColor.chroma,
            tone: data.secondaryPalette.keyColor.tone
          }
        },
        tertiaryPalette: {
          keyColor: {
            hue: data.tertiaryPalette.keyColor.hue,
            chroma: data.tertiaryPalette.keyColor.chroma,
            tone: data.tertiaryPalette.keyColor.tone
          }
        },
        neutralPalette: {
          keyColor: {
            hue: data.neutralPalette.keyColor.hue,
            chroma: data.neutralPalette.keyColor.chroma,
            tone: data.neutralPalette.keyColor.tone
          }
        },
        neutralVariantPalette: {
          keyColor: {
            hue: data.neutralVariantPalette.keyColor.hue,
            chroma: data.neutralVariantPalette.keyColor.chroma,
            tone: data.neutralVariantPalette.keyColor.tone
          }
        },
        errorPalette: {
          keyColor: {
            hue: data.errorPalette.keyColor.hue,
            chroma: data.errorPalette.keyColor.chroma,
            tone: data.errorPalette.keyColor.tone
          }
        }
      }
    }
  })

  definePayloadReviver('DynamicScheme', (data) => {
    if (
      data &&
      typeof data.primaryPalette === 'object' &&
      typeof data.secondaryPalette === 'object' &&
      typeof data.tertiaryPalette === 'object' &&
      typeof data.neutralPalette === 'object' &&
      typeof data.neutralVariantPalette === 'object' &&
      typeof data.errorPalette === 'object'
    ) {
      return new DynamicScheme({
        sourceColorArgb: data.sourceColorArgb,
        isDark: data.isDark,
        variant: data.variant,
        contrastLevel: data.contrastLevel,
        primaryPalette: TonalPalette.fromHct(
          Hct.from(
            data.primaryPalette.keyColor.hue,
            data.primaryPalette.keyColor.chroma,
            data.primaryPalette.keyColor.tone
          )
        ),
        secondaryPalette: TonalPalette.fromHct(
          Hct.from(
            data.secondaryPalette.keyColor.hue,
            data.secondaryPalette.keyColor.chroma,
            data.secondaryPalette.keyColor.tone
          )
        ),
        tertiaryPalette: TonalPalette.fromHct(
          Hct.from(
            data.tertiaryPalette.keyColor.hue,
            data.tertiaryPalette.keyColor.chroma,
            data.tertiaryPalette.keyColor.tone
          )
        ),
        neutralPalette: TonalPalette.fromHct(
          Hct.from(
            data.neutralPalette.keyColor.hue,
            data.neutralPalette.keyColor.chroma,
            data.neutralPalette.keyColor.tone
          )
        ),
        neutralVariantPalette: TonalPalette.fromHct(
          Hct.from(
            data.neutralVariantPalette.keyColor.hue,
            data.neutralVariantPalette.keyColor.chroma,
            data.neutralVariantPalette.keyColor.tone
          )
        )
      })
    }
  })
})
