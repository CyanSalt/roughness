<script lang="ts" setup>
import { RColorPicker, RDetails, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

let color = ref('')
</script>

# Color Picker

The orange, yellow and green seem one colour, which descends pretty uniformly from an intense to a rare yellow, making what I should call different shades of yellow.

## Example

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

<RColorPicker v-model="color" />

## Usage

<RUsage file="src/color-picker/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
