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

### Props

<RSpace>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'loading', 'model-value', 'reactions']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:loading:type>

  `boolean`

  </template>
  <template #body:loading:default>

  `false`

  </template>
  <template #body:loading:description>
    Whether the color picker is loading. It will be non-interactive in loading state.
  </template>

  <template #body:model-value:type>

  `number`

  </template>
  <template #body:model-value:default>
    <RText type="error">Required</RText>
  </template>
  <template #body:model-value:description>
    Value of the color picker.
  </template>

  <template #body:reactions:type>

  `string[]`

  </template>
  <template #body:reactions:default>

  `['hover', 'focus', 'active', 'dark']`

  </template>
  <template #body:reactions:description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>
</RTable>
</RSpace>

### Events

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:model-value']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:model-value:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:model-value:description>
    Callback function triggered when the color is changed.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['current-color', 'color', 'border-width', 'border-dash']"
>
  <template #body:*:name="{ row }">--r-color-picker-{{ row }}</template>

  <template #body:current-color:values>

  `<color>`

  </template>
  <template #body:current-color:description>
    Value of the color picker.
  </template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-common-text-color)` if the value is not set, `var(--r-common-text-color)` in adjusting hue and saturation to be the same as the value else.

  </template>
  <template #body:color:description>
    Color of the color picker text and border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `2px` when focused or active, `1px` else

  </template>
  <template #body:border-width:description>
    Width of the color picker border.
  </template>

  <template #body:border-dash:values>

  `<length> +` or `none`

  </template>
  <template #body:border-dash:default>

  `8px`

  </template>
  <template #body:border-dash:description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the color picker border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </template>
</RTable>
</RSpace>
