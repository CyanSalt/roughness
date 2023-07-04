<script lang="ts" setup>
import { RCheckbox, RSelect, RDetails, RSpace, RTable } from 'roughness'
</script>

# Select

We never choose anything at all. Things happen. Or not.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RSelect } from 'roughness'
</script>

<template>
  <RSelect placeholder="Test engineer rank">
    <RCheckbox value="Stable">Stable</RCheckbox>
    <RCheckbox value="Beta">Beta</RCheckbox>
    <RCheckbox value="Dev">Dev</RCheckbox>
    <RCheckbox value="Canary">Canary</RCheckbox>
  </RSelect>
</template>
```

</RDetails>

<RSelect placeholder="Test engineer rank">
  <RCheckbox value="Stable">Stable</RCheckbox>
  <RCheckbox value="Beta">Beta</RCheckbox>
  <RCheckbox value="Dev">Dev</RCheckbox>
  <RCheckbox value="Canary">Canary</RCheckbox>
</RSelect>

### Multiple

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RSelect } from 'roughness'
</script>

<template>
  <RSelect multiple placeholder="Exodia">
    <RCheckbox value="Right Arm">Right Arm</RCheckbox>
    <RCheckbox value="Left Arm">Left Arm</RCheckbox>
    <RCheckbox value="Right Leg">Right Leg</RCheckbox>
    <RCheckbox value="Left Leg">Left Leg</RCheckbox>
  </RSelect>
</template>
```

</RDetails>

<RSelect multiple placeholder="Exodia">
  <RCheckbox value="Right Arm">Right Arm</RCheckbox>
  <RCheckbox value="Left Arm">Left Arm</RCheckbox>
  <RCheckbox value="Right Leg">Right Leg</RCheckbox>
  <RCheckbox value="Left Leg">Left Leg</RCheckbox>
</RSelect>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['model-value', 'multiple', 'reactions']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:model-value.type>

  `string | number | undefined` or `(string | number)[]`

  </template>
  <template #body:model-value.default>
    <RText type="error">Required</RText>
  </template>
  <template #body:model-value.description>
    Value(s) of the selected item(s).
  </template>

  <template #body:multiple.type>

  `boolean`

  </template>
  <template #body:multiple.default>

  `false`

  </template>
  <template #body:multiple.description>
    Whether to support selecting multiple items.
  </template>

  <template #body:reactions.type>

  `string[]`

  </template>
  <template #body:reactions.default>

  `[]`

  </template>
  <template #body:reactions.description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['border-color', 'border-width', 'dropdown-border-width']"
>
  <template #body:*.name="{ row }">--r-select-{{ row }}</template>

  <template #body:border-color.values>

  `<color>`

  </template>
  <template #body:border-color.default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color.description>
    Color of the select control border.
  </template>

  <template #body:border-width.values>

  `<integer>`

  </template>
  <template #body:border-width.default>

  `2` when focused, `1` else

  </template>
  <template #body:border-width.description>
    Width of the select control border.
  </template>

  <template #body:dropdown-border-width.values>

  `<integer>`

  </template>
  <template #body:dropdown-border-width.default>

  `1`

  </template>
  <template #body:dropdown-border-width.description>
    Width of the select dropdown border.
  </template>
</RTable>
</RSpace>
