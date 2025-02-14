<script setup lang="ts">
import { hexFromArgb } from '@material/material-color-utilities'

const props = defineProps<{
  colors: Record<string, number>
}>()
</script>

<template>
  <div class="grid grid-cols-6 gap-1 w-fit h-fit">
    <div v-for="(argb, name) in props.colors" :key="name" class="grid place-items-center max-w-24 gap-y-1 ">
      <div :style="{ backgroundColor: hexFromArgb(argb), color: hexFromArgb(contrastColor(argb)) }" class="size-8 rounded-full" />
      <p class="text-xs w-full text-center truncate">{{ name }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
