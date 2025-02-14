<script lang="ts" setup>
// const theme = useMaterialThemeState()
//
// const img = useTemplateRef<HTMLImageElement>('img')
//
// onMounted(async () => {
//   if (!img.value) return
//
//   // With worker
//   const bitmap = await imageBitmapFromSource(img.value)
//   theme.primary = await extractSeedFromImage(bitmap)
//
//   // Without worker (Synchronous)
//   // theme.primary = await extractSeedFromImage(img.value)
// })
//
// onBeforeRouteLeave(() => {
//   // Set the theme state to its initial state
// })
</script>

<template>
  <div class="border p-4  rounded-md space-y-4">
    <h1>Test Shared State</h1>

  </div>
</template>

<style scoped>

</style>
