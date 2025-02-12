<script setup lang="ts">
import { useState } from '#app'

const theme = useState('theme')
</script>

<template>
  <div>
    <h1>Test</h1>
    <pre>{{ theme }}</pre>
  </div>
</template>

<style scoped>

</style>
