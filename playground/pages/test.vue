<script lang="ts" setup>
import { useMaterialThemeState } from '../../src/runtime/composables/useMaterialThemeState'
import { argbFromHex } from '@material/material-color-utilities'
import ColorPreviews from '~/components/ColorPreviews.vue'
import Wallpapers from '~/components/Wallpapers.vue'

const theme = useMaterialThemeState({
  initialSeedColor: argbFromHex('#fff56d'),
  initialIsDark: false,
  initialIsAmoled: false,
  initialStyle: PALETTE_STYLES.TonalSpot,
  initialContrastLevel: 0,
  modifyColorScheme: (scheme) => {
    const brandColor = argbFromHex('#a166d9')
    const error = argbFromHex('#ffc400')
    return {
      ...scheme,
      // Override existing error color
      error: error,
      onError: contrastColor(error),
      // Add custom colors
      brandColor: brandColor,
      onBrandColor: contrastColor(brandColor),
      // Convert hex to ARGB
      alienOutline: fixIfDisliked(0x86da6a)
    }
  }
})

const baseUrl = 'http://localhost:3000' as const

const images = [
  `${baseUrl}/img/wallpaper1.jpg`,
  `${baseUrl}/img/wallpaper2.jpg`,
  `${baseUrl}/img/wallpaper3.jpg`,
  `${baseUrl}/img/wallpaper4.jpg`
]

const loadingIndex = shallowRef<number | undefined>()

async function apply(url: string, index: number) {
  if (loadingIndex.value !== undefined) return
  loadingIndex.value = index
  const bitmap = await fetch(url).then((res) => res.blob())
  const seed = await extractSeedFromImage(bitmap)
  theme.primary = 0
  theme.secondary = 0
  theme.tertiary = 0
  theme.neutral = 0
  theme.neutralVariant = 0
  theme.seedColor = seed
  loadingIndex.value = undefined
}
</script>

<template>
  <div class="grid grid-cols-[auto_auto_auto] gap-4 p-4">
    <MaterialForm
      v-model:contrastLevel="theme.contrastLevel"
      v-model:isAmoled="theme.isAmoled"
      v-model:isDark="theme.isDark"
      v-model:neutral="theme.neutral"
      v-model:neutralVariant="theme.neutralVariant"
      v-model:primary="theme.primary"
      v-model:secondary="theme.secondary"
      v-model:seedColor="theme.seedColor"
      v-model:style="theme.style"
      v-model:tertiary="theme.tertiary"
    />
    <ColorPreviews
      :colors="theme.colorScheme"
    />
    <div class="flex flex-col gap-2">
      <Wallpapers
        :images="images"
        :loadingIndex="loadingIndex"
        @apply="apply"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
