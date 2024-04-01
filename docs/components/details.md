<script lang="ts" setup>
import { RButton, RDetails, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

let open = ref(true)

function toggle() {
  open.value = !open.value
}
</script>

# Details

The devil is in the details.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RDetails, RSpace } from 'roughness'
import { ref } from 'vue'

let open = ref(true)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <RSpace vertical>
    <RDetails v-model:open="open">
      <template #summary>Hanger</template>
      Clown suits
    </RDetails>
    <RButton :filled="!open" @click="toggle">Closet Door</RButton>
    <RText>Look! The door is {{ open ? 'open' : 'closed' }}.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RDetails v-model:open="open">
    <template #summary>Hanger</template>
    Clown suits
  </RDetails>
  <RButton :filled="!open" @click="toggle">Closet Door</RButton>
  <RText>Look! The door is {{ open ? 'open' : 'closed' }}.</RText>
</RSpace>

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

  <RProp name="open">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the details are currently visible.

  See [`open`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#open).

  </RProp>

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `[]`

  </template>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="update:open">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when visibility of the detail is changed.

  </REvent>

</REventsTable>

### Slots

<RSlotsTable>

  <RSlot name="summary">

  Content of the summary.

  See [`summary`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary).

  </RSlot>

  <RSlot name="default">
    Content of the details.
  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-details-{{ value }}</template>

  <RStyle name="summary-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of summary text and marker.

  </RStyle>

  <RStyle name="summary-marker-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Size of the block of summary marker.

  </RStyle>

  <RStyle name="gap-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `12px`

  </template>

  Size of the gap between the summary and content.

  </RStyle>

</RStylesTable>
