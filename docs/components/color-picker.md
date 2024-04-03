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

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="loading">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the color picker is loading. It will be non-interactive in loading state.

  </RProp>

  <RProp name="model-value">

  <template #type>

  `number`

  </template>

  <template #default-value>
    </template>

  Value of the color picker.

  </RProp>

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `['hover', 'focus', 'active', 'dark']`

  </template>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="update:model-value">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when the color is changed.

  </REvent>

  <REvent name="will-draw">

  Associating effects before graphics drawing.

  See [Reactions](/guide/theme#reactions).

  </REvent>

</REventsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-color-picker-{{ value }}</template>

  <RStyle name="current-color">

  <template #values>

  `<color>`

  </template>

  Value of the color picker.

  </RStyle>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)` if the value is not set, `var(--r-common-text-color)` in adjusting hue and saturation to be the same as the value else.

  </template>

  Color of the color picker text and border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused or active, `1px` else

  </template>

  Width of the color picker border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `8px`

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the color picker border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </RStyle>

</RStylesTable>
