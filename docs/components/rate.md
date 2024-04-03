<script lang="ts" setup>
import { RDetails, RRate, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

let rate = ref(3)
</script>

# Rate

Only God can judge me.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RRate } from 'roughness'
import { ref } from 'vue'

let rate = ref(3)
</script>

<template>
  <RRate v-model="rate" />
</template>
```

</RDetails>

<RRate v-model="rate" />

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

  <RProp name="model-value">

  <template #type>

  `number`

  </template>

  <template #default-value>
    </template>

  Value of the rate.

  </RProp>

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `['hover-at', 'focus-within', 'active']`

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

  Callback function triggered when the value is changed.

  </REvent>

  <REvent name="will-draw">

  Associating effects before graphics drawing.

  See [Reactions](/guide/theme#reactions).

  </REvent>

</REventsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-rate-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-primary-color)`

  </template>

  Color of the rate control when active.

  </RStyle>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the rate control border.

  </RStyle>

  <RStyle name="control-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Size of the rate control.

  </RStyle>

  <RStyle name="gap-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `4px`

  </template>

  Gap size of the rate control.

  </RStyle>

</RStylesTable>
