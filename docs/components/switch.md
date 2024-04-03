<script lang="ts" setup>
import { RDetails, RSpace, RSwitch, RTable } from 'roughness'
</script>

# Switch

Everybody 1-2-Switch!

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSwitch } from 'roughness'
</script>

<template>
  <RSwitch>Airplane Mode</RSwitch>
</template>
```

</RDetails>

<RSwitch>Airplane Mode</RSwitch>

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

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  State of the switch.

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

  <RProp name="...">

  See [Space Props](/components/space#props).

  Unlike Space, the default value of Switch's `tag` is `label`.

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="update:model-value">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when state is changed.

  </REvent>

  <REvent name="will-draw">

  Associating effects before graphics drawing.

  See [Reactions](/guide/theme#reactions).

  </REvent>

</REventsTable>

### Slots

<RSlotsTable>

  <RSlot name="default">
    Label of the switch.
  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-switch-{{ value }}</template>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the switch control border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused or active, `1px` else

  </template>

  Width of the switch control border.

  </RStyle>

  <RStyle name="control-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Size of the switch control.

  </RStyle>

  <RStyle name="track-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-primary-color)`

  </template>

  Color of the switch track when open.

  </RStyle>

  <RStyle name="handle-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-background-color)`

  </template>

  Color of the switch handle.

  </RStyle>

  <RStyle name="...">

  <template #name>...</template>

  See [Space Styles](/components/space#styles).

  </RStyle>

</RStylesTable>
