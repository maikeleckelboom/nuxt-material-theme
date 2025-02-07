<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { getContrastColor } from '../src/runtime/utils/contrast'
import { useMaterialThemeBuilder } from '../src/runtime/composables/useMaterialTheme'
import { colorSchemeFromTheme, generateTheme } from '../src/runtime/utils/v2/themeFromSeedColor'

const themeConfig = useRuntimeConfig().public.materialTheme

const { isPrimaryDrivenBySeed, ignoreUpdates } = useMaterialThemeBuilder(themeConfig)

const theme = computed(() =>
  generateTheme(themeConfig.seedColor, {
    style: themeConfig.style,
    contrastLevel: themeConfig.contrastLevel,
    primary: themeConfig.primary,
    secondary: themeConfig.secondary,
    tertiary: themeConfig.tertiary,
    neutral: themeConfig.neutral,
    neutralVariant: themeConfig.neutralVariant,
    extendedColors: themeConfig.extendedColors
  })
)

const themeColors = computed(() =>
  colorSchemeFromTheme(theme.value, {
    isDark: themeConfig.isDark,
    brightnessVariants: themeConfig.brightnessVariants
  })
)

useHead({
  title: 'Material Theme Playground',
  style: [
    {
      textContent: computed(
        () => `body {
          background-color: ${hexFromArgb(themeColors.value.background)};
          color: ${hexFromArgb(themeColors.value.onBackground)};
        }`
      )
    }
  ]
})

function updatePrimary(event: Event) {
  const target = event.target as HTMLInputElement
  const value = argbFromHex(target.value)
  if (isPrimaryDrivenBySeed.value) {
    themeConfig.primary = value
    ignoreUpdates(() => {
      themeConfig.seedColor = value
      themeConfig.primary = value
    })
  } else {
    themeConfig.primary = value
  }
}
</script>

<template>
  <div class="main-grid">
    <div>
      <h2>Material Theme</h2>
      <form class="color-form">
        <input
          :value="hexFromArgb(themeConfig.seedColor)"
          aria-label="Seed Color"
          type="color"
          @input="themeConfig.seedColor = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(themeConfig.primary)"
          aria-label="config.primary Color"
          type="color"
          @input="updatePrimary"
        />
        <input
          :value="hexFromArgb(themeConfig.secondary)"
          aria-label="Secondary Color"
          type="color"
          @input="themeConfig.secondary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(themeConfig.tertiary)"
          aria-label="Tertiary Color"
          type="color"
          @input="themeConfig.tertiary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(themeConfig.neutral)"
          aria-label="Neutral Color"
          type="color"
          @input="themeConfig.neutral = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(themeConfig.neutralVariant)"
          aria-label="Neutral Variant Color"
          type="color"
          @input="
            themeConfig.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)
          "
        />

        <template v-for="(extendedColor, idx) in themeConfig.extendedColors" :key="idx">
          <input
            :value="hexFromArgb(extendedColor.value)"
            aria-label="Extended Color"
            type="color"
            @input="extendedColor.value = argbFromHex(($event.target as HTMLInputElement).value)"
          />
        </template>

        <label>
          <span>Brightness Variants</span>
          <input v-model="themeConfig.brightnessVariants" type="checkbox" />
        </label>

        <label>
          <span>Is Dark</span>
          <input v-model="themeConfig.isDark" type="checkbox" />
        </label>

        <label>
          <span>Style</span>
          <select v-model="themeConfig.style">
            <option v-for="style in listPaletteStyles()" :key="style" :value="style">
              {{ style }}
            </option>
          </select>
        </label>

        <label>
          <span>Contrast Level</span>
          <input
            v-model.number="themeConfig.contrastLevel"
            max="1"
            min="-1"
            step="0.1"
            type="range"
          />
        </label>

        <label>
          <span> Bidirectional Sync </span>
          <input v-model="isPrimaryDrivenBySeed" type="checkbox" />
        </label>
      </form>
    </div>

    <pre>{{ themeColors }}</pre>

    <div
      :style="{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(2rem, 1fr))',
        gap: '0.5rem'
      }"
    >
      <div
        v-for="(value, key, index) in themeColors"
        :key="index"
        :style="{
          backgroundColor: hexFromArgb(value),
          color: hexFromArgb(getContrastColor(value))
        }"
      >
        <span>{{ key }}</span>
      </div>
    </div>

    <div class="two-col"></div>
  </div>
</template>

<style scoped>
.color-preview-box {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  display: block;
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
