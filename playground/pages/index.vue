<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { PALETTE_STYLES } from '../../src/runtime/utils/palette-style'
import { useReactiveOptionsTheme } from '#imports'
import Wallpapers from '~/components/Wallpapers.vue'

/**
 * Update primary color when seed color changes
 * (Mimic Material Theme's behavior) - two-way sync between seed and primary
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

definePageMeta({
  title: 'Playground',
  description: 'Playground for testing Material Theme'
})

const options = useRuntimeConfig().public.materialTheme

const theme = useReactiveOptionsTheme(options)

const baseUrl = 'http://localhost:3000'
const images = [
  `${baseUrl}/img/wallpaper1.jpg`,
  `${baseUrl}/img/wallpaper2.jpg`,
  `${baseUrl}/img/wallpaper3.jpg`,
  `${baseUrl}/img/wallpaper4.jpg`
]

const loadingIndex = shallowRef<number | undefined>()

async function apply(url: string, index: number) {
  if (loadingIndex.value !== undefined) return
  loadingIndex.value = index
  await theme.apply(url)
  loadingIndex.value = undefined
}

const showSharedState = ref<boolean>(false)

</script>

<template>
  <NuxtLink to="/test">Test</NuxtLink>
  <div class="flex flex-col gap-2">
    <!-- -->
    <button @click="showSharedState = !showSharedState">Toggle Shared State</button>
    <TestSharedState v-if="showSharedState" />
  </div>
  <div class="grid grid-cols-[auto_1fr] p-4 gap-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col gap-2">
        <form class="flex flex-wrap gap-4">
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
            <span>Primary</span>
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
      </div>
      <div class="flex flex-col gap-2">
        <Wallpapers :images="images" :loadingIndex="loadingIndex" @apply="apply" />
      </div>
      <pre>{{ theme.colorScheme }}</pre>
    </div>
    <div class="overflow-hidden grid gap-2 grid-cols-8">
      <ColorPreviews :colors="theme.colorScheme.value" />
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

input[type='color'] {
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
</style>
