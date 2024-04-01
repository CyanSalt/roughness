<script lang="ts" setup>
import { RDetails, RSpace, RTable, RText, RUpload } from 'roughness'
import { ref } from 'vue'

let file = ref<File>()
let loading = ref(false)

function select(value: File) {
  loading.value = true
  setTimeout(() => {
    file.value = value
    loading.value = false
  }, 1000)
}
</script>

# Upload

Upload your days, download your life.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSpace, RText, RUpload } from 'roughness'
import { ref } from 'vue'

let file = ref<File>()
let loading = ref(false)

function select(value: File) {
  loading.value = true
  setTimeout(() => {
    file.value = value
    loading.value = false
  }, 1000)
}
</script>

<template>
  <RSpace vertical align="start">
    <RUpload :loading="loading" @select="select">Drop or Select File</RUpload>
    <RText>It's {{ file ? file.name : 'nothing' }}.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical align="start">
  <RUpload :loading="loading" @select="select">Drop or Select File</RUpload>
  <RText>It's {{ file ? file.name : 'nothing' }}.</RText>
</RSpace>

## Usage

### Props

<RPropsTable>

  <RProp name="block">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the upload is displayed as block.

  </RProp>

  <RProp name="filled">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the upload is filled with its color.

  </RProp>

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

  Whether the upload is loading. It will be non-interactive in loading state.

  </RProp>

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `['hover', 'focus', 'active']`

  </template>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="select">

  <template #parameters>

  `(value: File | Files[])`

  </template>

  Callback function triggered when one or more files are selected.

  </REvent>

</REventsTable>

### Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the upload.
  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-upload-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the upload text.

  </RStyle>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-upload-color)`

  </template>

  Color of the upload border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused or active, `1px` else

  </template>

  Width of the upload border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `8px`

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the upload border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </RStyle>

</RStylesTable>
