<script setup lang="ts">

import { argbFromHex, hexFromArgb } from '@material/material-color-utilities'
import { PALETTE_STYLES } from '../../src/runtime/utils/palette-style'

const seedColor = defineModel<number>('seedColor')
const primary = defineModel<number>('primary')
const secondary = defineModel<number>('secondary')
const tertiary = defineModel<number>('tertiary')
const neutral = defineModel<number>('neutral')
const neutralVariant = defineModel<number>('neutralVariant')
const style = defineModel<PaletteStyle>('style')
const contrastLevel = defineModel<number>('contrastLevel')
const isDark = defineModel<boolean>('isDark')
const isAmoled = defineModel<boolean>('isAmoled')

</script>

<template>
  <form class="flex flex-col gap-2">
    <div class="flex items-center">
      <label for="seed-color">Seed Color</label>
      <input id="seed-color" :value="hexFromArgb(seedColor || 0)" type="color"
             @input="($event)=>{
                primary = 0
                secondary = 0
                tertiary = 0
                neutral = 0
                neutralVariant = 0
                seedColor = argbFromHex(($event.target as HTMLInputElement).value);
               }"
      >
      <button type="button" @click="seedColor = 0">Reset</button>
    </div>
    <div class="flex items-center">
      <label for="primary-color">Primary Color</label>
      <input id="primary-color" :value="hexFromArgb(primary || 0)" type="color"
             @input="($event)=>{
                 primary = seedColor = argbFromHex(($event.target as HTMLInputElement).value);
               }"
      >
      <button type="button" @click="primary = 0">Reset</button>
    </div>
    <div class="flex items-center">
      <label for="secondary-color">Secondary Color</label>
      <input id="secondary-color" :value="hexFromArgb(secondary || 0)" type="color"
             @input="secondary = argbFromHex(($event.target as HTMLInputElement).value)"
      />
      <button type="button" @click="secondary = 0">Reset</button>
    </div>
    <div class="flex items-center">
      <label for="tertiary-color">Tertiary Color</label>
      <input id="tertiary-color" :value="hexFromArgb(tertiary || 0)" type="color"
             @input="tertiary = argbFromHex(($event.target as HTMLInputElement).value)"
      />
      <button type="button" @click="tertiary = 0">Reset</button>
    </div>
    <div class="flex items-center">
      <label for="neutral-color">Neutral Color</label>
      <input id="neutral-color" :value="hexFromArgb(neutral || 0)" type="color"
             @input="neutral = argbFromHex(($event.target as HTMLInputElement).value)"
      />
      <button type="button" @click="neutral = 0">Reset</button>
    </div>
    <div class="flex items-center">
      <label for="neutral-variant-color">Neutral Variant Color</label>
      <input id="neutral-variant-color" :value="hexFromArgb(neutralVariant || 0)"
             type="color"
             @input="neutralVariant = argbFromHex(($event.target as HTMLInputElement).value)"
      />
      <button type="button" @click="neutralVariant = 0">Reset</button>
    </div>
    <div class="flex items-center">
      <label for="style">Style</label>
      <select id="style" v-model="style">
        <option v-for="style in Object.values(PALETTE_STYLES)" :key="style" :value="style">
          {{ style }}
        </option>
      </select>
    </div>
    <div class="flex items-center">
      <label for="contrast-level">Contrast Level</label>
      <input id="contrast-level" v-model.number="contrastLevel" max="1" min="-1" step="0.01" type="range" />
    </div>
    <div class="flex items-center">
      <label for="is-dark">Dark</label>
      <input id="is-dark" v-model="isDark" type="checkbox" />
    </div>
    <div class="flex items-center">
      <label for="is-amoled">Amoled</label>
      <input id="is-amoled" v-model="isAmoled" type="checkbox" />
    </div>
  </form>
</template>
