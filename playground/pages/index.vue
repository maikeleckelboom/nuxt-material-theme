<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { getContrastColor } from '../../src/runtime/utils/contrast'
import { getPaletteStyles } from '../../src/runtime/utils/palette-style'

definePageMeta({
  title: 'Playground',
  description: 'Playground for testing Material Theme'
})

const state = useRuntimeConfig().public.materialTheme

const brightnessVariants = ref(false)

const {
  colorScheme,
  isPrimaryDrivenBySeed,
  ignoreUpdates,
  setSeed
} = useMaterialTheme(state, { brightnessVariants })

function updatePrimaryColor(event: Event) {
  const target = event.target as HTMLInputElement
  const value = argbFromHex(target.value)
  if (isPrimaryDrivenBySeed.value) {
    ignoreUpdates(() => {
      state.seedColor = value
      state.primary = value
    })
  } else {
    state.primary = value
  }
}

const paletteStyles = getPaletteStyles()

const file = ref<File | null>(null)

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length) {
    file.value = files[0]
  }
}

watch(file, (file) => {
  if (!file) return
  setSeed(file)
})

const wallpapers = Array.from({ length: 3 }, (_, i) => `/wallpapers/00${i + 1}.jpg`)
const wallpaperImages = useTemplateRef<HTMLImageElement[]>('images')

const selectedWallpaper = ref<string | null>(null)

watch(selectedWallpaper, async (wallpaper) => {
  const image = wallpaperImages.value?.find((img) => wallpaper && img.src.includes(wallpaper))
  if (image) {
    const bitmapSource = await createImageBitmap(image)
    await setSeed(bitmapSource)
    wallpaperImages.value?.forEach((img) => {
      img === image
        ? img.classList.add('selected')
        : img.classList.remove('selected')
    })
  }
})
</script>

<template>
  <div class="main-grid">
    <div>
      <h2>Material Theme</h2>

      <div class="wallpapers-container">
        <div v-for="(wallpaper, i) in wallpapers" :key="i" @click="selectedWallpaper = wallpaper">
          <img ref="wallpaperImages" :src="wallpaper" alt="wallpaper" class="object-cover" />
        </div>
      </div>

      <form class="color-form">
        <input type="file" @change="onFileChange" />
        <input
          :value="hexFromArgb(state.seedColor)"
          aria-label="Seed Color"
          type="color"
          @input="state.seedColor = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(state.primary)"
          aria-label="config.primary Color"
          type="color"
          @input="updatePrimaryColor"
        />
        <input
          :value="hexFromArgb(state.secondary)"
          aria-label="Secondary Color"
          type="color"
          @input="state.secondary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(state.tertiary)"
          aria-label="Tertiary Color"
          type="color"
          @input="state.tertiary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(state.neutral)"
          aria-label="Neutral Color"
          type="color"
          @input="state.neutral = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(state.neutralVariant)"
          aria-label="Neutral Variant Color"
          type="color"
          @input="
            state.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)
          "
        />
        <template v-for="(extendedColor, i) in state.extendedColors" :key="i">
          <input
            :value="hexFromArgb(extendedColor.value)"
            aria-label="Extended Color"
            type="color"
            @input="extendedColor.value = argbFromHex(($event.target as HTMLInputElement).value)"
          />
        </template>
        <label>
          <span>Brightness Variants</span>
          <input v-model="brightnessVariants" type="checkbox" />
        </label>

        <label>
          <span>Is Dark</span>
          <input v-model="state.isDark" type="checkbox" />
        </label>
        <label>
          <span>Style</span>
          <select v-model="state.style">
            <option v-for="style in paletteStyles" :key="style" :value="style">
              {{ style }}
            </option>
          </select>
        </label>
        <label>
          <span>Contrast Level</span>
          <input
            v-model.number="state.contrastLevel"
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
    </div>

    <div>
      <pre>{{ colorScheme }}</pre>
    </div>

    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(2rem, 1fr))',
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

<style scoped>
.color-preview-box {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  display: block;
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
      border: 2px solid #000;
    }
  }
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 0.5rem;
  max-height: max-content;

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
