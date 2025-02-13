<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { contrastColor } from '../../src/runtime/utils/contrast'
import { PALETTE_STYLES } from '../../src/runtime/utils/palette-style'
import { useMaterialTheme } from '#imports'

definePageMeta({
  title: 'Playground',
  description: 'Playground for testing Material Theme'
})

const options = useRuntimeConfig().public.materialTheme

const theme = useMaterialTheme(options)

/**
 * Update primary color when seed color changes
 * (Mimic Material Theme's behavior)
 */
function updatePrimaryColor(event: Event) {
  const target = event.target as HTMLInputElement
  const value = argbFromHex(target.value)
  if (options.config.primaryDrivenBySeed) {
    theme.ignoreUpdates(() => {
      options.seedColor = value
      options.primary = value
    })
  } else {
    options.primary = value
  }
}

const baseUrl = 'http://localhost:3000' as const

const images = [
  `${baseUrl}/img/wallpaper1.jpg`,
  `${baseUrl}/img/wallpaper2.jpg`,
  `${baseUrl}/img/wallpaper3.jpg`,
  `${baseUrl}/img/wallpaper4.jpg`
]

const loadingIndex = ref<number | undefined>()

async function apply(image: string) {
  if (loadingIndex.value !== undefined) return
  loadingIndex.value = images.indexOf(image)
  await theme.apply(image)
  loadingIndex.value = undefined
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="grid grid-cols-2 gap-2">
      <form class="color-form">
        <label>
          <span>Seed Color</span>
          <input
            :value="hexFromArgb(options.seedColor)"
            aria-label="Seed Color"
            type="color"
            @input="options.seedColor = argbFromHex(($event.target as HTMLInputElement).value)"
          />
        </label>
        <label>
          <span>Primary - (direct)</span>
          <input
            :value="hexFromArgb(options.primary)"
            aria-label="Primary Color"
            type="color"
            @input="options.primary = argbFromHex(($event.target as HTMLInputElement).value)"
          />
        </label>
        <label>
          <span>Secondary</span>
          <input
            :value="hexFromArgb(options.secondary)"
            aria-label="Secondary Color"
            type="color"
            @input="options.secondary = argbFromHex(($event.target as HTMLInputElement).value)"
          />
        </label>
        <label>
          <span>Tertiary</span>
          <input
            :value="hexFromArgb(options.tertiary)"
            aria-label="Tertiary Color"
            type="color"
            @input="options.tertiary = argbFromHex(($event.target as HTMLInputElement).value)"
          />
        </label>
        <label>
          <span>Neutral</span>
          <input
            :value="hexFromArgb(options.neutral)"
            aria-label="Neutral Color"
            type="color"
            @input="options.neutral = argbFromHex(($event.target as HTMLInputElement).value)"
          />
        </label>
        <label>
          <span>Neutral Variant</span>
          <input
            :value="hexFromArgb(options.neutralVariant)"
            aria-label="Neutral Variant Color"
            type="color"
            @input="
            options.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)
          "
          />
        </label>
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
          <input v-model="options.config.brightnessVariants" type="checkbox" />
        </label>

        <label>
          <span>Is Dark</span>
          <input v-model="options.isDark" type="checkbox" />
        </label>
        <label>
          <span>Style</span>
          <select v-model="options.style">
            <option v-for="style in PALETTE_STYLES" :key="style" :value="style">
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
          <input v-model="options.config.primaryDrivenBySeed" type="checkbox" />
        </label>
      </form>
      <div class="app-bar">
        <button
          v-for="(image, index) in images"
          :key="index"
          :data-loading="loadingIndex === index ? 'true' : undefined"
          class="data-loading:opacity-50 data-loading:animate-spin"
          @click="apply(image)">
          <img :src="image" alt="Cloudtion Example" />
        </button>
      </div>
      <pre>{{ theme.colorScheme }}</pre>
    </div>
    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, minmax(1rem, 1fr))',
        gap: '0.5rem'
      }"
      class="overflow-hidden "
    >
      <div
        v-for="(value, key, index) in theme.colorScheme.value"
        :key="index"
        :style="{
          backgroundColor: hexFromArgb(value),
          color: hexFromArgb(contrastColor(value))
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
