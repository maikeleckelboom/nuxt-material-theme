<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { PALETTE_STYLE } from '../src/types/palette-style'

const config = useRuntimeConfig().public.materialTheme
const dynamicScheme = useDynamicScheme()

const getRowStyles = (color: number) => ({
  backgroundColor: hexFromArgb(color),
  color: hexFromArgb(getContrastColor(color))
})

const fields = {
  'Seed': config.seedColor,
  'config.primary': config.primary,
  'Secondary': config.secondary,
  'Tertiary': config.tertiary,
  'Neutral': config.neutral,
  'Neutral Variant': config.neutralVariant
}

const paletteStyles = Object.values(PALETTE_STYLE)
</script>

<template>
  <div class="main-grid">

    <form class="color-form">
      <input :value="hexFromArgb(config.seedColor)" aria-label="Seed Color" type="color"
             @input="config.seedColor = argbFromHex(($event.target as HTMLInputElement).value)" />
      <input :value="hexFromArgb(config.primary)" aria-label="config.primary Color" type="color"
             @input="config.primary = argbFromHex(($event.target as HTMLInputElement).value)" />
      <input :value="hexFromArgb(config.secondary)" aria-label="Secondary Color" type="color"
             @input="config.secondary = argbFromHex(($event.target as HTMLInputElement).value)" />
      <input :value="hexFromArgb(config.tertiary)" aria-label="Tertiary Color" type="color"
             @input="config.tertiary = argbFromHex(($event.target as HTMLInputElement).value)" />
      <input :value="hexFromArgb(config.neutral)" aria-label="Neutral Color" type="color"
             @input="config.neutral = argbFromHex(($event.target as HTMLInputElement).value)" />
      <input :value="hexFromArgb(config.neutralVariant)" aria-label="Neutral Variant Color" type="color"
             @input="config.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)" />
    </form>

    <form>
      <div>
        <input v-model="config.isDark" type="checkbox" />
        <label>Dark Mode</label>
      </div>

      <div>
        <label>Style</label>
        <select v-model="config.style">
          <option v-for="style in paletteStyles" :key="style" :value="style">{{ style }}</option>
        </select>
      </div>

      <div>
        <label>Contrast</label>
        <input v-model="config.contrast" max="1" min="-1" step="0.1" type="range" />
      </div>


    </form>


    <!-- Color Table -->
    <table class="color-table">
      <tbody>
      <tr v-for="(color, label) in fields" :key="label" :style="getRowStyles(color)">
        <td>{{ label }}</td>
        <td>{{ color }}</td>
      </tr>
      </tbody>
    </table>
    <pre>{{ JSON.stringify(config, null, 2) }}</pre>
    <pre>{{ JSON.stringify(dynamicScheme, null, 2) }}</pre>
    <pre>{{ JSON.stringify(colorsFromDynamicScheme(dynamicScheme), null, 2) }}</pre>
    <div class="flex flex-wrap">
      <div v-for="(value, key, index) in colorsFromDynamicScheme(dynamicScheme, {format:'argb'})" :key="index"
           :style="{backgroundColor: hexFromArgb(value), color: hexFromArgb(getContrastColor(value)) }"
      >
        <p>{{ key }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 0.5rem;
  max-height: max-content;


}

.flex {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.flex-wrap {
  flex-wrap: wrap;
}

.color-form {
  display: flex;
  flex-direction: column;

  input {

    &[type='color'] {
      width: 100%;
      height: clamp(2rem, 3vw, 3rem);
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
