<script lang="ts" setup>
import { useDynamicMaterialState } from '../../src/runtime/composables/useDynamicMaterialState'
import { fixIfDisliked, isDisliked } from '../../src/runtime/utils/dislike'
import { PALETTE_STYLES, reactive } from '#imports'
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'

const theme = reactive(useDynamicMaterialState({
  initialSeedColor: argbFromHex('#fff56d'),
  initialIsDark: false,
  initialIsAmoled: false,
  initialStyle: PALETTE_STYLES.TonalSpot,
  initialContrastLevel: 0,
  initialExtendedFidelity: false,
  modifyColorScheme: (scheme) => ({
    ...scheme,
    primary: fixIfDisliked(scheme.primary),
    surfaceTint: isDisliked(scheme.surfaceTint)
      ? scheme.primary
      : scheme.surfaceTint
  })
}))

watch(() => theme.colorScheme, (colorScheme) => {
  console.log(colorScheme)
  theme.primary = colorScheme.primaryPaletteKeyColor
  theme.secondary = colorScheme.secondaryPaletteKeyColor
  theme.tertiary = colorScheme.tertiaryPaletteKeyColor
  theme.neutral = colorScheme.neutralPaletteKeyColor
  theme.neutralVariant = colorScheme.neutralVariantPaletteKeyColor
}, { deep: true })
</script>

<template>
  <div class="grid grid-cols-[auto_1fr] p-4">
    <form class="flex flex-col gap-2">
      <div class="flex items-center">
        <label for="seed-color">Seed Color</label>
        <input id="seed-color" :value="hexFromArgb(theme.seedColor || 0)" type="color"
               @input="($event)=>{
                theme.primary = 0
                theme.secondary = 0
                theme.tertiary = 0
                theme.neutral = 0
                theme.neutralVariant = 0
                theme.seedColor = argbFromHex(($event.target as HTMLInputElement).value);
               }"
        >
        <button type="button" @click="theme.seedColor = 0">Reset</button>
      </div>
      <div class="flex items-center">
        <label for="primary-color">Primary Color</label>
        <input id="primary-color" :value="hexFromArgb(theme.primary || 0)" type="color"
               @input="($event)=>{
                 theme.primary = theme.seedColor = argbFromHex(($event.target as HTMLInputElement).value);
               }"
        >
        <button type="button" @click="theme.primary = 0">Reset</button>
      </div>
      <div class="flex items-center">
        <label for="secondary-color">Secondary Color</label>
        <input id="secondary-color" :value="hexFromArgb(theme.secondary || 0)" type="color"
               @input="theme.secondary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <button type="button" @click="theme.secondary = 0">Reset</button>
      </div>
      <div class="flex items-center">
        <label for="tertiary-color">Tertiary Color</label>
        <input id="tertiary-color" :value="hexFromArgb(theme.tertiary || 0)" type="color"
               @input="theme.tertiary = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <button type="button" @click="theme.tertiary = 0">Reset</button>
      </div>
      <div class="flex items-center">
        <label for="neutral-color">Neutral Color</label>
        <input id="neutral-color" :value="hexFromArgb(theme.neutral || 0)" type="color"
               @input="theme.neutral = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <button type="button" @click="theme.neutral = 0">Reset</button>

      </div>
      <div class="flex items-center">
        <label for="neutral-variant-color">Neutral Variant Color</label>
        <input id="neutral-variant-color" :value="hexFromArgb(theme.neutralVariant || 0)"
               type="color"
               @input="theme.neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)"
        />
        <button type="button" @click="theme.neutralVariant = 0">Reset</button>
      </div>
      <div class="flex items-center">
        <label for="style">Style</label>
        <select id="style" v-model="theme.style">
          <option v-for="style in Object.values(PALETTE_STYLES)" :key="style" :value="style">
            {{ style }}
          </option>
        </select>
      </div>
      <div class="flex items-center">
        <label for="contrast-level">Contrast Level</label>
        <input id="contrast-level" v-model="theme.contrastLevel" max="3" min="0" step="1" type="range" />
      </div>
      <div class="flex items-center">
        <label for="extended-fidelity">Extended Fidelity</label>
        <input id="extended-fidelity" v-model="theme.isExtendedFidelity" type="checkbox" />
      </div>
      <div class="flex items-center">
        <label for="is-dark">Dark</label>
        <input id="is-dark" v-model="theme.isDark" type="checkbox" />
      </div>
      <div class="flex items-center">
        <label for="is-amoled">Amoled</label>
        <input id="is-amoled" v-model="theme.isAmoled" type="checkbox" />
      </div>
    </form>
    <div class="grid grid-cols-2">
      <div class="grid grid-cols-4 gap-2">
        <div v-for="(argb, name) in theme.colorScheme" :key="name" class="grid place-items-center ">
          <div :style="{ backgroundColor: hexFromArgb(argb) }" class="size-8 rounded-full" />
          <p class="text-xs w-full text-center truncate">{{ name }}</p>
        </div>
      </div>
      <ClientOnly>
        <pre>{{ theme.colorScheme }}</pre>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>

</style>
