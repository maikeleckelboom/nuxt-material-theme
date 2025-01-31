<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { getContrastColor } from '../src/runtime/utils/contrast'

const { seedColor, primary, secondary, tertiary, neutral, neutralVariant } = useMaterialDynamic()
const dynamicScheme = useDynamicScheme()

const getRowStyles = (color: string) => ({
  backgroundColor: color,
  color: hexFromArgb(getContrastColor(argbFromHex(color)))
})
</script>

<template>
  <div class="main-grid">
    <!-- Color Input Form -->
    <form class="color-form">
      <input v-model="seedColor" aria-label="Seed Color" type="color" />
      <input v-model="primary" aria-label="Primary Color" type="color" />
      <input v-model="secondary" aria-label="Secondary Color" type="color" />
      <input v-model="tertiary" aria-label="Tertiary Color" type="color" />
      <input v-model="neutral" aria-label="Neutral Color" type="color" />
      <input v-model="neutralVariant" aria-label="Neutral Variant Color" type="color" />
    </form>

    <!-- Color Table -->
    <table class="color-table">
      <tbody>
      <tr v-for="(color, label) in {
          'Seed': seedColor,
          'Primary': primary,
          'Secondary': secondary,
          'Tertiary': tertiary,
          'Neutral': neutral,
          'Neutral Variant': neutralVariant,
        }" :key="label" :style="getRowStyles(color)">
        <td>{{ label }}</td>
        <td>{{ color }}</td>
      </tr>
      </tbody>
    </table>
    <!-- Dynamic Scheme Output -->
    <pre class="dynamic-scheme">{{ dynamicScheme }}</pre>
    <!-- colors -->

  </div>
</template>

<style scoped>
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  gap: 0.5rem;
  max-height: max-content;
}

.color-form {
  display: flex;
  flex-direction: column;

  input {

    &[type='color'] {
      width: 100%;
      height: clamp(2rem, 3vw, 3rem);
      min-height: 3rem;
      cursor: pointer;
      border: none;

      &::-webkit-color-swatch-wrapper {
        padding: 0;
      }

      &::-webkit-color-swatch {
        border: none;
      }
    }
  }
}

.color-form input {
  width: 100%;
  cursor: pointer;

}

.dynamic-scheme {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.color-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.1em;
  border-radius: 4px;
  overflow: hidden;
  height: fit-content;

}

.color-table th,
.color-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.color-table th {
  background-color: #f5f5f5;
}
</style>
