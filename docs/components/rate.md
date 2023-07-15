<script lang="ts" setup>
import { RDetails, RRate, RSpace, RTable } from 'roughness'
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

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'model-value', 'reactions']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:model-value:type>

  `number`

  </template>
  <template #body:model-value:default>
    <RText type="error">Required</RText>
  </template>
  <template #body:model-value:description>
    Value of the rate.
  </template>

  <template #body:reactions:type>

  `string[]`

  </template>
  <template #body:reactions:default>

  `['hover-at', 'focus-within', 'active']`

  </template>
  <template #body:reactions:description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>
</RTable>
</RSpace>

### Event

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:model-value']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:model-value:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:model-value:description>
    Callback function triggered when the value is changed.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'border-color', 'control-size']"
>
  <template #body:*:name="{ row }">--r-rate-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-common-primary-color)`

  </template>
  <template #body:color:description>
    Color of the rate control when active.
  </template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color:description>
    Color of the rate control border.
  </template>

  <template #body:control-size:values>

  `<length>`

  </template>
  <template #body:control-size:default>

  `var(--r-common-line-height)`

  </template>
  <template #body:control-size:description>
    Size of the rate control.
  </template>
</RTable>
</RSpace>
