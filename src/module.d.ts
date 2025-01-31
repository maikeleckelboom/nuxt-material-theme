import type {IgnoredUpdater} from '@vueuse/shared'

declare module '#app' {
  interface NuxtApp {
    $ignoreSourceUpdates: IgnoredUpdater
    $ignoreColorUpdates: IgnoredUpdater
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $ignoreSourceUpdates: IgnoredUpdater
    $ignoreColorUpdates: IgnoredUpdater
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $ignoreSourceUpdates: IgnoredUpdater
    $ignoreColorUpdates: IgnoredUpdater
  }
}

export {}
