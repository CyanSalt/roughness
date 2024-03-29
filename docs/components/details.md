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

<RSpace>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'open', 'reactions']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:open:type>

  `boolean`

  </template>
  <template #body:open:default>

  `false`

  </template>
  <template #body:open:description>

  Whether the details are currently visible.

  See [`open`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#open).

  </template>

  <template #body:reactions:type>

  `string[]`

  </template>
  <template #body:reactions:default>

  `[]`

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
  :rows="['update:open']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:open:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:open:description>
    Callback function triggered when visibility of the detail is changed.
  </template>
</RTable>
</RSpace>

### Slots

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['summary', 'default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:summary:description>

  Content of the summary.

  See [`summary`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary).

  </template>
  <template #body:default:description>
    Content of the details.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['summary-color', 'summary-marker-size', 'gap-size']"
>
  <template #body:*:name="{ row }">--r-details-{{ row }}</template>

  <template #body:summary-color:values>

  `<color>`

  </template>
  <template #body:summary-color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:summary-color:description>
    Color of summary text and marker.
  </template>

  <template #body:summary-marker-size:values>

  `<length>`

  </template>
  <template #body:summary-marker-size:default>

  `var(--r-common-line-height)`

  </template>
  <template #body:summary-marker-size:description>
    Size of the block of summary marker.
  </template>

  <template #body:gap-size:values>

  `<length>`

  </template>
  <template #body:gap-size:default>

  `12px`

  </template>
  <template #body:gap-size:description>
    Size of the gap between the summary and content.
  </template>
</RTable>
</RSpace>
