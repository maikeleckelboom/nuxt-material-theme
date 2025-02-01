<script lang="ts" setup>
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { useRuntimeConfig } from 'nuxt/app'
import { PALETTE_STYLE } from '../src/types/palette-style'
import { getContrastColor } from '../src/runtime/utils/contrast'

const paletteStyles = Object.values(PALETTE_STYLE)

const config = useRuntimeConfig().public.materialTheme

const dynamicScheme = useDynamicScheme()

const colorScheme = computed(() =>
  toColorScheme(dynamicScheme.value, {
    isExtendedFidelity: config.isExtendedFidelity,
    isAmoled: config.withAmoled && config.isDark,
    modifyColorScheme: (scheme) => scheme
  })
)

const getStyle = (argb: number) => ({
  backgroundColor: hexFromArgb(argb),
  color: hexFromArgb(getContrastColor(argb))
})
</script>

<template>
  <div class="main-grid">
    <div>
      <form class="color-form">
        <input
          :value="hexFromArgb(config.seedColor)"
          aria-label="Seed Color"
          type="color"
          @input="
            config.seedColor = argbFromHex(
              ($event.target as HTMLInputElement).value
            )
          "
        />
        <input
          :value="hexFromArgb(config.primary)"
          aria-label="config.primary Color"
          type="color"
          @input="
            config.primary = argbFromHex(
              ($event.target as HTMLInputElement).value
            )
          "
        />
        <input
          :value="hexFromArgb(config.secondary)"
          aria-label="Secondary Color"
          type="color"
          @input="
            config.secondary = argbFromHex(
              ($event.target as HTMLInputElement).value
            )
          "
        />
        <input
          :value="hexFromArgb(config.tertiary)"
          aria-label="Tertiary Color"
          type="color"
          @input="
            config.tertiary = argbFromHex(
              ($event.target as HTMLInputElement).value
            )
          "
        />
        <input
          :value="hexFromArgb(config.neutral)"
          aria-label="Neutral Color"
          type="color"
          @input="
            config.neutral = argbFromHex(
              ($event.target as HTMLInputElement).value
            )
          "
        />
        <input
          :value="hexFromArgb(config.neutralVariant)"
          aria-label="Neutral Variant Color"
          type="color"
          @input="
            config.neutralVariant = argbFromHex(
              ($event.target as HTMLInputElement).value
            )
          "
        />

        <label>
          <span>Is Dark</span>
          <input v-model="config.isDark" type="checkbox" />
        </label>

        <label>
          <span>Style</span>
          <select v-model="config.style">
            <option v-for="style in paletteStyles" :key="style" :value="style">
              {{ style }}
            </option>
          </select>
        </label>

        <label>
          <span>Contrast</span>
          <input
            v-model="config.contrastLevel"
            max="1"
            min="-1"
            step="0.1"
            type="range"
          />
        </label>

        <label>
          <span>Is Extended Fidelity</span>
          <input v-model="config.isExtendedFidelity" type="checkbox" />
        </label>

        <label>
          <span>Is Amoled</span>
          <input v-model="config.withAmoled" type="checkbox" />
        </label>
      </form>

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
        :style="getStyle(value as number)"
      >
        <span>{{ key }}</span>
        <span
          :style="{
            backgroundColor: hexFromArgb(value),
            color: hexFromArgb(getContrastColor(value))
          }"
          class="color-preview-box"
        ></span>
      </div>
    </div>

    <div class="two-col">
      <pre>{{ colorScheme }}</pre>
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

.main-grid {
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  column-gap: 0.5rem;
  max-height: max-content;
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
