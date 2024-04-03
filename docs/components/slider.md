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

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="max">

  <template #type>

  `<number>`

  </template>

  <template #default-value>

  `100`

  </template>

  Upper numeric bound of the range.

  </RProp>

  <RProp name="min">

  <template #type>

  `<number>`

  </template>

  <template #default-value>

  `0`

  </template>

  Lower numeric bound of the range.

  </RProp>

  <RProp name="model-value">

  <template #type>

  `number`

  </template>

  <template #default-value>
    </template>

  Value of the slider.

  </RProp>

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `['focus-within', 'active']`

  </template>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </RProp>

  <RProp name="step">

  <template #type>

  `<number>`

  </template>

  <template #default-value>

  `1`

  </template>

  Minimum unit of the slider.

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="update:model-value">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when the value is changed.

  </REvent>

  <REvent name="will-draw">

  Associating effects before graphics drawing.

  See [Reactions](/guide/theme#reactions).

  </REvent>

</REventsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-slider-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-primary-color)`

  </template>

  Color of the slider track when active.

  </RStyle>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the slider control and track border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused or active, `1px` else

  </template>

  Width of the slider control and track border.

  </RStyle>

  <RStyle name="control-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Size of the slider control.

  </RStyle>

  <RStyle name="track-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-font-size)`

  </template>

  Size of the slider track.

  </RStyle>

</RStylesTable>
