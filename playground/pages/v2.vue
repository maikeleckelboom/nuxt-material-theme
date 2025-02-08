<script setup lang="ts">
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'

const brightnessVariants = ref<boolean>(false)

const config = useRuntimeConfig().public.materialTheme
const {theme, scheme, colorScheme, setSeedColor} = useMaterialTheme(config, {brightnessVariants})
</script>

<template>
  <div>
    <h1>Playground V2</h1>
    <NuxtLink to="/">Go to Home</NuxtLink>
    <div>
      <div>
        <h2>Material Theme</h2>
        <form class="color-form">
          <input
            :value="hexFromArgb(config.seedColor)"
            aria-label="Seed Color"
            type="color"
            @input="config.seedColor = argbFromHex(($event.target as HTMLInputElement).value)"
          />
          <input
            :value="hexFromArgb(config.primary)"
            aria-label="config.primary Color"
            type="color"
            @input="config.primary = argbFromHex(($event.target as HTMLInputElement).value)"
          />
          <input
            :value="hexFromArgb(config.secondary)"
            aria-label="Secondary Color"
            type="color"
            @input="config.secondary = argbFromHex(($event.target as HTMLInputElement).value)"
          />
          <input
            :value="hexFromArgb(config.tertiary)"
            aria-label="Tertiary Color"
            type="color"
            @input="config.tertiary = argbFromHex(($event.target as HTMLInputElement).value)"
          />
          <input
            :value="hexFromArgb(config.neutral)"
            aria-label="Neutral Color"
            type="color"
            @input="config.neutral = argbFromHex(($event.target as HTMLInputElement).value)"
          />
          <input
            :value="hexFromArgb(config.neutralVariant)"
            aria-label="Neutral Variant Color"
            type="color"
            @input="
            config.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)
          "
          />

          <template v-for="(extendedColor, i) in config.extendedColors" :key="i">
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
            <input v-model="config.isDark" type="checkbox" />
          </label>

          <label>
            <span>Style</span>
            <select v-model="config.style">
              <option v-for="style in listPaletteStyles()" :key="style" :value="style">
                {{ style }}
              </option>
            </select>
          </label>
          <label>
            <span>Contrast Level</span>
            <input
              v-model.number="config.contrastLevel"
              max="1"
              min="-1"
              step="0.1"
              type="range"
            />
          </label>
        </form>
      </div>
      <div class="two-col-grid">
        <ClientOnly>
          <pre>{{theme}}</pre>
          <pre>{{scheme}}</pre>
          <pre>{{colorScheme}}</pre>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped>
.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
