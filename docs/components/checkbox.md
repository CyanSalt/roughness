<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup, RDetails, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

const checked = ref(true)
const values = ref([])
const value = ref<string | undefined>()
</script>

# Checkbox

Check-ch-check-check-check-ch-check it out. What-wha-what-what-what's it all about.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox } from 'roughness'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <RSpace vertical>
    <RCheckbox v-model:checked="checked">Are you OK, Indian MI fans?</RCheckbox>
    <RText>Oh {{ checked ? 'yes!' : 'no...' }}</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCheckbox v-model:checked="checked">Are you OK, Indian MI fans?</RCheckbox>
  <RText>Oh {{ checked ? 'yes!' : 'no...' }}</RText>
</RSpace>

### Group

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup } from 'roughness'
import { ref } from 'vue'

const values = ref([])
</script>

<template>
  <RSpace vertical>
    <RCheckboxGroup v-model="values" vertical>
      <RCheckbox value="Peggy">Peggy</RCheckbox>
      <RCheckbox value="George">George</RCheckbox>
      <RCheckbox value="Mummy">Mummy</RCheckbox>
      <RCheckbox value="Daddy">Daddy</RCheckbox>
    </RCheckboxGroup>
    <RText>{{ values.length ? values.join(', ') : 'Nobody' }} {{ values.length > 1 ? 'are' : 'is' }} going hiking.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCheckboxGroup v-model="values" vertical>
    <RCheckbox value="Peggy">Peggy</RCheckbox>
    <RCheckbox value="George">George</RCheckbox>
    <RCheckbox value="Mummy">Mummy</RCheckbox>
    <RCheckbox value="Daddy">Daddy</RCheckbox>
  </RCheckboxGroup>
  <RText>{{ values.length ? values.join(', ') : 'Nobody' }} {{ values.length > 1 ? 'are' : 'is' }} going hiking.</RText>
</RSpace>

### Radio

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup } from 'roughness'
import { ref } from 'vue'

const value = ref<string | undefined>()
</script>

<template>
  <RSpace vertical>
    <RCheckboxGroup v-model="value" :multiple="false">
      <RCheckbox value="Peggy">Peggy</RCheckbox>
      <RCheckbox value="George">George</RCheckbox>
      <RCheckbox value="Mummy">Mummy</RCheckbox>
      <RCheckbox value="Daddy">Daddy</RCheckbox>
    </RCheckboxGroup>
    <RText>{{ value ?? 'Nobody' }} is going hiking.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCheckboxGroup v-model="value" :multiple="false">
    <RCheckbox value="Peggy">Peggy</RCheckbox>
    <RCheckbox value="George">George</RCheckbox>
    <RCheckbox value="Mummy">Mummy</RCheckbox>
    <RCheckbox value="Daddy">Daddy</RCheckbox>
  </RCheckboxGroup>
  <RText>{{ value ?? 'Nobody' }} is going hiking.</RText>
</RSpace>

## Usage

### Checkbox Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['checked', 'reactions', 'value']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:checked.type>

  `boolean`

  </template>
  <template #body:checked.default>

  `false`

  </template>
  <template #body:checked.description>
    Checked state of the checkbox.
  </template>

  <template #body:reactions.type>

  `string[]`

  </template>
  <template #body:reactions.default>

  `['hover', 'focus', 'active']`

  </template>
  <template #body:reactions.description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>

  <template #body:value.type>

  `string | number`

  </template>
  <template #body:value.description>
    Item value when checked in the CheckboxGroup.
  </template>
</RTable>
</RSpace>

### Checkbox Event

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:checked']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:update:checked.parameters>

  `(value: boolean)`

  </template>
  <template #body:update:checked.description>
    Callback function triggered when checked state of the checkbox are changed.
  </template>
</RTable>
</RSpace>

### Checkbox Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:default.description>
    Label of the checkbox.
  </template>
</RTable>
</RSpace>

### Checkbox Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['border-color', 'border-width', 'checked-color', 'checked-width', 'control-size']"
>
  <template #body:*.name="{ row }">--r-checkbox-{{ row }}</template>

  <template #body:border-color.values>

  `<color>`

  </template>
  <template #body:border-color.default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color.description>
    Color of the checkbox control border.
  </template>

  <template #body:border-width.values>

  `<integer>`

  </template>
  <template #body:border-width.default>

  `2` when focused or active, `1` else

  </template>
  <template #body:border-width.description>
    Width of the checkbox control border.
  </template>

  <template #body:checked-color.values>

  `<color>`

  </template>
  <template #body:checked-color.default>

  `var(--r-common-primary-color)`

  </template>
  <template #body:checked-color.description>
    Color of the checkbox checked line.
  </template>

  <template #body:checked-width.values>

  `<integer>`

  </template>
  <template #body:checked-width.default>

  `1`

  </template>
  <template #body:checked-width.description>
    Width of the checkbox checked line.
  </template>

  <template #body:control-size.values>

  `<length>`

  </template>
  <template #body:control-size.default>

  `var(--r-common-line-height)`

  </template>
  <template #body:control-size.description>
    Size of the checkbox control.
  </template>
</RTable>
</RSpace>

### CheckboxGroup Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['model-value', 'multiple', '...']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:model-value.type>

  `string | number | undefined` or `(string | number)[]`

  </template>
  <template #body:model-value.default>
    <RText type="error">Required</RText>
  </template>
  <template #body:model-value.description>
    Value(s) of the checked item(s) of the group.
  </template>

  <template #body:multiple.type>

  `boolean`

  </template>
  <template #body:multiple.default>

  `true`

  </template>
  <template #body:multiple.description>
    Whether to support checking multiple items.
  </template>

  <template #body:....description>

  See [Space Props](/components/space#props).

  </template>
</RTable>
</RSpace>

### CheckboxGroup Event

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
    Callback function triggered when checked items of the group are changed.
  </template>
</RTable>
</RSpace>

### CheckboxGroup Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['...']"
>
  <template #body:*.name="{ row }">--r-checkbox-group-{{ row }}</template>

  <template #body:....name>...</template>
  <template #body:....description>

  See [Space Styles](/components/space#styles).

  </template>
</RTable>
</RSpace>