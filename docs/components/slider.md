<script lang="ts" setup>
import { RDetails, RSlider, RSpace, RTable } from 'roughness'
import { ref, watchEffect } from 'vue'

const value = ref(62)
</script>

# Slider

Caution: Slippery

## Example

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

<RSlider v-model="value" />

## Usage

<RUsage file="src/slider/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
