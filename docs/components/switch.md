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

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['model-value', 'reactions']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:model-value.type>

  `boolean`

  </template>
  <template #body:model-value.default>

  `false`

  </template>
  <template #body:model-value.description>
    State of the switch.
  </template>

  <template #body:reactions.type>

  `string[]`

  </template>
  <template #body:reactions.default>

  `['focus-within', 'active']`

  </template>
  <template #body:reactions.description>

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
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:update:model-value.parameters>

  `(value: boolean)`

  </template>
  <template #body:update:model-value.description>
    Callback function triggered when state of the switch is changed.
  </template>
</RTable>
</RSpace>

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:default.description>
    Label of the switch.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['border-color', 'border-width', 'control-size', 'track-color', 'handle-color']"
>
  <template #body:*.name="{ row }">--r-switch-{{ row }}</template>

  <template #body:border-color.values>

  `<color>`

  </template>
  <template #body:border-color.default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color.description>
    Color of the switch control border.
  </template>

  <template #body:border-width.values>

  `<integer>`

  </template>
  <template #body:border-width.default>

  `2` when focused or active, `1` else

  </template>
  <template #body:border-width.description>
    Width of the switch control border.
  </template>

  <template #body:control-size.values>

  `<length>`

  </template>
  <template #body:control-size.default>

  `var(--r-common-line-height)`

  </template>
  <template #body:control-size.description>
    Size of the switch control.
  </template>

  <template #body:track-color.values>

  `<color>`

  </template>
  <template #body:track-color.default>

  `var(--r-common-primary-color)`

  </template>
  <template #body:track-color.description>
    Color of the switch track when open.
  </template>

  <template #body:handle-color.values>

  `<color>`

  </template>
  <template #body:handle-color.default>

  `var(--r-common-background-color)`

  </template>
  <template #body:handle-color.description>
    Color of the switch handle.
  </template>
</RTable>
</RSpace>
