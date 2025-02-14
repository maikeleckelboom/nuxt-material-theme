<script lang="ts" setup>
import { useMaterialThemeState } from '../../src/runtime/composables/useMaterialThemeState'
import { fixIfDisliked } from '../../src/runtime/utils/dislike'
import { contrastColor, PALETTE_STYLES } from '#imports'
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import ColorPreviews from '~/components/ColorPreviews.vue'

const theme = useMaterialThemeState( {
  initialSeedColor: argbFromHex('#fff56d'),
  initialIsDark: false,
  initialIsAmoled: false,
  initialStyle: PALETTE_STYLES.TonalSpot,
  initialContrastLevel: 0,
  modifyColorScheme: (scheme) => {
    const brandColor = argbFromHex('#a166d9')
    const alienColor = argbFromHex('#86da6a')
    return {
      ...scheme,
      brandColor: brandColor,
      onBrandColor: contrastColor(brandColor),
      alienOutline: fixIfDisliked(alienColor)
    }
  }
})

const showSharedState = ref<boolean>(false)
</script>

<template>
  <div class="grid grid-cols-[auto_1fr_auto] p-4">
    <MaterialForm
      v-model:contrast-level="theme.contrastLevel"
      v-model:is-amoled="theme.isAmoled"
      v-model:is-dark="theme.isDark"
      v-model:neutral="theme.neutral"
      v-model:neutralVariant="theme.neutralVariant"
      v-model:primary="theme.primary"
      v-model:secondary="theme.secondary"
      v-model:seed-color="theme.seedColor"
      v-model:style="theme.style"
      v-model:tertiary="theme.tertiary"
    />

    <ColorPreviews :colors="theme.colorScheme" />

    <div class="flex flex-col gap-2">
      <!-- -->
      <button @click="showSharedState = !showSharedState">Toggle Shared State</button>
      <TestSharedState v-if="showSharedState" />
    </div>
  </div>
</template>

<style scoped>

</style>
