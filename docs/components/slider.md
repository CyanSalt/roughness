<script lang="ts" setup>
import { RDetails, RSlider, RSpace, RTable, RText } from 'roughness'
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

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'max', 'min', 'model-value', 'reactions', 'step']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:max:type>

  `<number>`

  </template>
  <template #body:max:default>

  `100`

  </template>
  <template #body:max:description>
    Upper numeric bound of the range.
  </template>

  <template #body:min:type>

  `<number>`

  </template>
  <template #body:min:default>

  `0`

  </template>
  <template #body:min:description>
    Lower numeric bound of the range.
  </template>

  <template #body:model-value:type>

  `number`

  </template>
  <template #body:model-value:default>
    <RText type="error">Required</RText>
  </template>
  <template #body:model-value:description>
    Value of the slider.
  </template>

  <template #body:reactions:type>

  `string[]`

  </template>
  <template #body:reactions:default>

  `['hover-at', 'focus-within', 'active']`

  </template>
  <template #body:reactions:description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>

  <template #body:step:type>

  `<number>`

  </template>
  <template #body:step:default>

  `1`

  </template>
  <template #body:step:description>
    Minimum unit of the slider.
  </template>
</RTable>
</RSpace>

### Event

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:model-value']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:model-value:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:model-value:description>
    Callback function triggered when the value is changed.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'border-color', 'border-width', 'control-size', 'track-size']"
>
  <template #body:*:name="{ row }">--r-slider-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-common-primary-color)`

  </template>
  <template #body:color:description>
    Color of the slider track when active.
  </template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color:description>
    Color of the slider control and track border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `2px` when focused or active, `1px` else

  </template>
  <template #body:border-width:description>
    Width of the slider control and track border.
  </template>

  <template #body:control-size:values>

  `<length>`

  </template>
  <template #body:control-size:default>

  `var(--r-common-line-height)`

  </template>
  <template #body:control-size:description>
    Size of the slider control.
  </template>

  <template #body:track-size:values>

  `<length>`

  </template>
  <template #body:track-size:default>

  `var(--r-common-font-size)`

  </template>
  <template #body:track-size:description>
    Size of the slider track.
  </template>
</RTable>
</RSpace>
