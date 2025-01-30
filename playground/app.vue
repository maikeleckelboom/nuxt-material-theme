<script lang="ts" setup>
const {seedColor, primary, secondary, tertiary, neutral, neutralVariant} = useMaterialDynamic()

const dynamicScheme = useDynamicScheme()
</script>

<template>
  <div>

    <form>
      <input v-model="seedColor" type="color">
      <input v-model="primary" type="color">
      <input v-model="secondary" type="color">
      <input v-model="tertiary" type="color">
      <input v-model="neutral" type="color">
      <input v-model="neutralVariant" type="color">
    </form>

    <pre>{{ dynamicScheme }}</pre>
  </div>
</template>
