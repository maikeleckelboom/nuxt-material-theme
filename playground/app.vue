<script lang="ts" setup>
import {
  argbFromHex,
  type DynamicColor,
  hexFromArgb,
  MaterialDynamicColors
} from '@material/material-color-utilities'

const theme = useRuntimeConfig().public.materialTheme

const { colorScheme, dynamicScheme: scheme } = useMaterialTheme(theme)

useHead({
  title: 'Material Theme Playground',
  style: [
    {
      textContent: computed(
        () => `
        body {
          background-color: ${hexFromArgb(colorScheme.value.background)};
        }
      `
      )
    }
  ]
})

function getContrast(value: number, key: string) {
  if (key in MaterialDynamicColors) {
    const dynamicColor = MaterialDynamicColors[
      key as keyof typeof MaterialDynamicColors
    ] as DynamicColor

    // todo: Reason about how this is not the way to get contrasting color role.
    if (dynamicColor.isBackground && dynamicColor.toneDeltaPair) {
      const deltaPair = dynamicColor.toneDeltaPair(scheme.value)
      return hexFromArgb(deltaPair.roleB.getArgb(scheme.value))
    }
  }

  return hexFromArgb(getContrastColor(value))
}
</script>

<template>
  <div class="main-grid">
    <div>
      <h2>Material Theme</h2>
      <pre>dynamicColor</pre>
      <pre></pre>
      <form class="color-form">
        <input
          :value="hexFromArgb(theme.seedColor)"
          aria-label="Seed Color"
          type="color"
          @input="theme.seedColor = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(theme.primary)"
          aria-label="config.primary Color"
          type="color"
          @input="theme.primary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(theme.secondary)"
          aria-label="Secondary Color"
          type="color"
          @input="theme.secondary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(theme.tertiary)"
          aria-label="Tertiary Color"
          type="color"
          @input="theme.tertiary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(theme.neutral)"
          aria-label="Neutral Color"
          type="color"
          @input="theme.neutral = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <input
          :value="hexFromArgb(theme.neutralVariant)"
          aria-label="Neutral Variant Color"
          type="color"
          @input="theme.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)"
        />

        <template v-for="(extendedColor, idx) in theme.extendedColors" :key="idx">
          <input
            :value="hexFromArgb(extendedColor.value)"
            aria-label="Extended Color"
            type="color"
            @input="extendedColor.value = argbFromHex(($event.target as HTMLInputElement).value)"
          />
        </template>

        <label>
          <span>Brightness Variants</span>
          <input v-model="theme.brightnessVariants" type="checkbox" />
        </label>

        <label>
          <span>Is Dark</span>
          <input v-model="theme.isDark" type="checkbox" />
        </label>

        <label>
          <span>Style</span>
          <select v-model="theme.style">
            <option v-for="style in listPaletteStyles()" :key="style" :value="style">
              {{ style }}
            </option>
          </select>
        </label>

        <label>
          <span>Contrast</span>
          <input v-model="theme.contrastLevel" max="1" min="-1" step="0.1" type="range" />
        </label>

        <label>
          <span>Is Extended Fidelity</span>
          <input v-model="theme.isExtendedFidelity" type="checkbox" />
        </label>

        <label>
          <span>With Amoled</span>
          <input v-model="theme.withAmoled" type="checkbox" />
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
        :style="{
          backgroundColor: hexFromArgb(value),
          color: getContrast(value, key)
        }"
      >
        <span>{{ key }}</span>
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
