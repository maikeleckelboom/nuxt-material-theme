<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { getContrastColor } from '../../src/runtime/utils/contrast'
import { getPaletteStyles } from '../../src/runtime/utils/palette-style'
import { fetchImageBitmap } from '../../src/runtime/utils/image'

definePageMeta({
  title: 'Playground',
  description: 'Playground for testing Material Theme'
})

const options = useRuntimeConfig().public.materialTheme

const { $theme, $brightnessVariants } = useNuxtApp()

const { theme, colorScheme, isPrimaryDrivenBySeed } = $theme

function updatePrimaryColor(event: Event) {
  const target = event.target as HTMLInputElement
  const value = argbFromHex(target.value)
  if (isPrimaryDrivenBySeed.value) {
    $theme.ignoreUpdates(() => {
      options.seedColor = value
      options.primary = value
    })
  } else {
    options.primary = value
  }
}

const paletteStyles = getPaletteStyles()

onMounted(() => {
  fetchImageBitmap('https://i.ibb.co/GRzh5nV/Cloudtion-Example.jpg').then((bitmap) => {
    $theme.applyImage(bitmap)
  })
})
</script>

<template>
  <div class="main-grid">
    <form class="color-form">
      <input
        :value="hexFromArgb(options.seedColor)"
        aria-label="Seed Color"
        type="color"
        @input="options.seedColor = argbFromHex(($event.target as HTMLInputElement).value)"
      />
      <input
        :value="hexFromArgb(options.primary)"
        aria-label="config.primary Color"
        type="color"
        @input="updatePrimaryColor"
      />
      <input
        :value="hexFromArgb(options.secondary)"
        aria-label="Secondary Color"
        type="color"
        @input="options.secondary = argbFromHex(($event.target as HTMLInputElement).value)"
      />
      <input
        :value="hexFromArgb(options.tertiary)"
        aria-label="Tertiary Color"
        type="color"
        @input="options.tertiary = argbFromHex(($event.target as HTMLInputElement).value)"
      />
      <input
        :value="hexFromArgb(options.neutral)"
        aria-label="Neutral Color"
        type="color"
        @input="options.neutral = argbFromHex(($event.target as HTMLInputElement).value)"
      />
      <input
        :value="hexFromArgb(options.neutralVariant)"
        aria-label="Neutral Variant Color"
        type="color"
        @input="
            options.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)
          "
      />
      <label v-for="(extendedColor, i) in options.extendedColors" :key="i">
        <input :value="extendedColor.name" type="text"
               @input="extendedColor.name = ($event.target as HTMLInputElement).value" />
        <input
          :value="hexFromArgb(extendedColor.value)"
          aria-label="Extended Color"
          type="color"
          @input="extendedColor.value = argbFromHex(($event.target as HTMLInputElement).value)"
        />
      </label>
      <label>
        <span>Brightness Variants</span>
        <input v-model="$brightnessVariants" type="checkbox" />
      </label>

      <label>
        <span>Is Dark</span>
        <input v-model="options.isDark" type="checkbox" />
      </label>
      <label>
        <span>Style</span>
        <select v-model="options.style">
          <option v-for="style in paletteStyles" :key="style" :value="style">
            {{ style }}
          </option>
        </select>
      </label>
      <label>
        <span>Contrast Level</span>
        <input
          v-model.number="options.contrastLevel"
          max="1"
          min="-1"
          step="0.1"
          type="range"
        />
      </label>
      <label>
        <span>Primary Driven By Seed</span>
        <input v-model="isPrimaryDrivenBySeed" type="checkbox" />
      </label>
    </form>
    <pre>{{ colorScheme }}</pre>

    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(2rem, 1fr))',
        gap: '0.5rem'
      }"
    >
      <div
        v-for="(value, key, index) in colorScheme"
        :key="index"
        :style="{
          backgroundColor: hexFromArgb(value),
          color: hexFromArgb(getContrastColor(value))
        }"
      >
        <span>{{ key }}</span>
      </div>
    </div>
  </div>
</template>

<style>
@property --background {
  syntax: '<color>';
  initial-value: 0;
  inherits: true;
}

@property --on-background {
  syntax: '<color>';
  initial-value: 0;
  inherits: true;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: var(--background);
  color: var(--on-background);
}

.color-preview-box {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  display: block;
}

.wallpaper-item {
  cursor: pointer;

}

.wallpapers-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.5rem;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    max-width: 100%;
    object-fit: cover;
    border-radius: 4px;

    &.selected {
      border: 3px solid #00bbff;

    }

    &.active {
      border: 3px solid #0bdc0b;
    }
  }
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1.5rem;
  max-height: max-content;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;

  div {
    padding: 0.1rem;
  }
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;

  > div {
    display: flex;
  }
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
