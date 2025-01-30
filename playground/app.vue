<script lang="ts" setup>
import {argbFromHex, hexFromArgb} from "@material/material-color-utilities";

const dynamicScheme = useDynamicScheme()
const config = useRuntimeConfig().public.materialDynamic
</script>

<template>
  <div>
    <form>
      <input
        :value="hexFromArgb(config.seedColor)"
        type="color"
        @input="config.seedColor = argbFromHex(($event.target as HTMLInputElement).value)">

      <input
        :value="hexFromArgb(config.primary)"
        type="color"
        @input="config.primary = argbFromHex(($event.target as HTMLInputElement).value)">

      <input
        :value="hexFromArgb(config.secondary)"
        type="color"
        @input="config.secondary = argbFromHex(($event.target as HTMLInputElement).value)">

      <input
        :value="hexFromArgb(config.tertiary)"
        type="color"
        @input="config.tertiary = argbFromHex(($event.target as HTMLInputElement).value)">

      <input
        :value="hexFromArgb(config.neutral)"
        type="color"
        @input="config.neutral = argbFromHex(($event.target as HTMLInputElement).value)">

      <input
        :value="hexFromArgb(config.neutralVariant)"
        type="color"
        @input="config.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)">
    </form>
    <pre>{{ config }}</pre>
    <pre>{{ dynamicScheme }}</pre>
  </div>
</template>
