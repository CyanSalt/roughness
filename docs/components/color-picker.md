<script lang="ts" setup>
import { RColorPicker } from 'roughness'
import { ref } from 'vue'

let color = ref('')
</script>

# Color Picker

The orange, yellow and green seem one colour, which descends pretty uniformly from an intense to a rare yellow, making what I should call different shades of yellow.

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import { RColorPicker } from 'roughness'
import { ref } from 'vue'

let color = ref('')
</script>

<template>
  <RColorPicker v-model="color" />
</template>
```

:::

<RColorPicker v-model="color" />

## Usage

<RUsage file="src/color-picker/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Box Props](/components/box#props).

  </RProp>

  </template>

</RUsage>
