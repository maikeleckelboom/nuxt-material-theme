<script lang="ts" setup>
import { useMaterialThemeState } from '../../src/runtime/composables/useMaterialThemeState'
import ColorPreviews from '~/components/ColorPreviews.vue'


const theme = useMaterialThemeState()

const img = useTemplateRef<HTMLImageElement>('img')

onMounted(async () => {
  if (!img.value) return

  // With worker
  const bitmap = await imageBitmapFromSource(img.value)
  theme.primary = await extractSeedFromImage(bitmap)

  // Without worker (Synchronous)
  // theme.primary = await extractSeedFromImage(img.value)
})

onBeforeRouteLeave(() => {
  // Set the theme state to its initial state
})
</script>

<template>
  <div class="border p-4 border-blue-800 rounded-md space-y-4">
    <h1>Test Shared State</h1>
    <img ref="img" alt="Wallpaper" class="w-40 rounded-md" src="/img/wallpaper1.jpg" />
    <ColorPreviews :colors="theme.colorScheme" />
  </div>
</template>

<style scoped>

</style>
