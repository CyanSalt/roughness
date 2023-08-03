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

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['block', 'filled', 'graphics-options', 'loading', 'reactions']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:block:type>

  `boolean`

  </template>
  <template #body:block:default>

  `false`

  </template>
  <template #body:block:description>
    Whether the upload is displayed as block.
  </template>

  <template #body:filled:type>

  `boolean`

  </template>
  <template #body:filled:default>

  `false`

  </template>
  <template #body:filled:description>
    Whether the upload is filled with its color.
  </template>

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
    Whether the upload is loading. It will be non-interactive in loading state.
  </template>

  <template #body:reactions:type>

  `string[]`

  </template>
  <template #body:reactions:default>

  `['hover', 'focus', 'active']`

  </template>
  <template #body:reactions:description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>
</RTable>
</RSpace>

### Events

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['select']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:select:parameters>

  `(value: File | Files[])`

  </template>
  <template #body:select:description>
    Callback function triggered when one or more files are selected.
  </template>
</RTable>
</RSpace>

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:description>
    Content of the upload.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'border-color', 'border-width', 'border-dash']"
>
  <template #body:*:name="{ row }">--r-upload-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:color:description>
    Color of the upload text.
  </template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-upload-color)`

  </template>
  <template #body:border-color:description>
    Color of the upload border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `2px` when focused or active, `1px` else

  </template>
  <template #body:border-width:description>
    Width of the upload border.
  </template>

  <template #body:border-dash:values>

  `<length> +` or `none`

  </template>
  <template #body:border-dash:default>

  `8px`

  </template>
  <template #body:border-dash:description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the upload border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </template>
</RTable>
</RSpace>
