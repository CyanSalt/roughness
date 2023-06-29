<script lang="ts" setup>
import { RButton, RDetails, RSpace, RTable } from 'roughness'
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
import { RDetails } from 'roughness'
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
</RSpace>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['open']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:open.type>

  `boolean`

  </template>
  <template #body:open.default>

  `false`

  </template>
  <template #body:open.description>
    Whether the details are currently visible.
  </template>
</RTable>
</RSpace>

### Events

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:open']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:update:open.parameters>

  `(open: boolean)`

  </template>
  <template #body:update:open.description>
    Callback function triggered when visibility of the details are changed.
  </template>
</RTable>
</RSpace>

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['summary', 'default']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:summary.description>
    The content of the summary.
  </template>
  <template #body:default.description>
    The content of the details.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['summary-color', 'summary-marker-size']"
>
  <template #body:*.name="{ row }">--r-details-{{ row }}</template>

  <template #body:summary-color.values>

  `<color>`

  </template>
  <template #body:summary-color.default>

  `var(--r-common-text-color)`

  </template>
  <template #body:summary-color.description>
    Color of summary text and marker.
  </template>

  <template #body:summary-marker-size.values>

  `<length>`

  </template>
  <template #body:summary-marker-size.default>

  `var(--r-common-line-height)`

  </template>
  <template #body:summary-marker-size.description>
    Size of the block of summary marker.
  </template>
</RTable>
</RSpace>
