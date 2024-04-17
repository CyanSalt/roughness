<script lang="ts" setup>
import { RSlider } from 'roughness'
import { ref, watchEffect } from 'vue'

const value = ref(62)
</script>

# Slider

Caution: Slippery

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import { RSlider } from 'roughness'
import { ref } from 'vue'

let value = ref(62)
</script>

<template>
  <RSlider v-model="value" />
</template>
```

:::

<RSlider v-model="value" />

## Usage

<RUsage file="src/slider/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
