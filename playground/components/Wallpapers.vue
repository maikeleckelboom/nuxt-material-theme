<script lang="ts" setup>
const { images , loadingIndex} = defineProps<{
  images: string[]
  loadingIndex: number | undefined
}>()

const emit = defineEmits(['apply'])

async function apply(url: string, index: number) {
  if (loadingIndex !== undefined) return
  emit('apply', url, index)
}
</script>

<template>
  <button
    v-for="(url, index) in images"
    :key="index"
    :data-loading="loadingIndex === index ? 'true' : undefined"
    class="relative
          w-fit
          data-loading:opacity-50
          data-loading:after:absolute
          after:top-1/2
          after:left-1/2
          after:-translate-x-1/2
          after:-translate-y-1/2
          after:size-24
          after:bg-[url('https://api.iconify.design/codex:loader.svg?color=%23ffffff')]
          after:bg-no-repeat
          after:bg-center
          after:bg-contain"
    @click="apply(url, index)">
    <img :src="url" alt="" class="max-w-56 h-min" />
  </button>
</template>
