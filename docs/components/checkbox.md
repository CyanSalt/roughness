<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup, RDetails, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

const checked = ref(true)
const values = ref<string[]>([])
const value = ref<string | undefined>()
const treeValue = ref<string | undefined>()
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

const values = ref<string[]>([])
</script>

<template>
  <RSpace vertical>
    <RCheckboxGroup v-model="values" vertical>
      <RCheckbox value="Peggy" />
      <RCheckbox value="George" />
      <RCheckbox value="Mummy" />
      <RCheckbox value="Daddy" />
    </RCheckboxGroup>
    <RText>{{ values.length ? values.join(', ') : 'Nobody' }} {{ values.length > 1 ? 'are' : 'is' }} going hiking.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCheckboxGroup v-model="values" vertical>
    <RCheckbox value="Peggy" />
    <RCheckbox value="George" />
    <RCheckbox value="Mummy" />
    <RCheckbox value="Daddy" />
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
      <RCheckbox value="Peggy" />
      <RCheckbox value="George" />
      <RCheckbox value="Mummy" />
      <RCheckbox value="Daddy" />
    </RCheckboxGroup>
    <RText>{{ value ?? 'Nobody' }} is going hiking.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCheckboxGroup v-model="value" :multiple="false">
    <RCheckbox value="Peggy" />
    <RCheckbox value="George" />
    <RCheckbox value="Mummy" />
    <RCheckbox value="Daddy" />
  </RCheckboxGroup>
  <RText>{{ value ?? 'Nobody' }} is going hiking.</RText>
</RSpace>

### State

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RSpace } from 'roughness'

</script>

<template>
  <RSpace vertical>
    <RCheckbox disabled>I can't move.</RCheckbox>
    <RCheckbox indeterminate>Maybe I should make a decision sooner.</RCheckbox>
    <RCheckboxGroup vertical disabled>
      <RCheckbox value="1984" />
      <RCheckbox value="Ugly Americans" />
    </RCheckboxGroup>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCheckbox checked disabled>I can't move.</RCheckbox>
  <RCheckbox indeterminate>Maybe I should make a decision sooner.</RCheckbox>
  <RCheckboxGroup vertical disabled>
    <RCheckbox value="1984" />
    <RCheckbox value="Ugly Americans" />
  </RCheckboxGroup>
</RSpace>

### Tree

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup } from 'roughness'
import { ref } from 'vue'

const treeValue = ref<string | undefined>()
</script>

<template>
  <RSpace vertical>
    <RCheckboxGroup v-model="treeValue" vertical :multiple="false">
      <RCheckbox value="Peggy's Family">
        <RSpace vertical>
          <RText>Peggy's Family</RText>
          <RCheckbox value="Peggy" />
          <RCheckbox value="George" />
          <RCheckbox value="Mummy" />
          <RCheckbox value="Daddy" />
        </RSpace>
      </RCheckbox>
      <RCheckbox value="Grandpa's Family">
        <RSpace vertical>
          <RText>Grandpa's Family</RText>
          <RCheckbox value="Grandpa" />
          <RCheckbox value="Granny" />
        </RSpace>
      </RCheckbox>
    </RCheckboxGroup>
    <RText>{{ treeValue ?? 'Nobody' }} is going hiking.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCheckboxGroup v-model="treeValue" vertical :multiple="false">
    <RCheckbox value="Peggy's Family">
      <RSpace vertical>
        <RText>Peggy's Family</RText>
        <RCheckbox value="Peggy" />
        <RCheckbox value="George" />
        <RCheckbox value="Mummy" />
        <RCheckbox value="Daddy" />
      </RSpace>
    </RCheckbox>
    <RCheckbox value="Grandpa's Family">
      <RSpace vertical>
        <RText>Grandpa's Family</RText>
        <RCheckbox value="Grandpa" />
        <RCheckbox value="Granny" />
      </RSpace>
    </RCheckbox>
  </RCheckboxGroup>
  <RText>{{ treeValue ?? 'Nobody' }} is going hiking.</RText>
</RSpace>

## Usage

### Checkbox Props

<RPropsTable>

  <RProp name="checked">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Checked state of the checkbox.

  </RProp>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="label">

  <template #type>

  `string`

  </template>

  <template #default-value>

  `startCase(keyOf(value))` if value exists.

  </template>

  Item label when checked and displayed, e.g. in Select.

  </RProp>

  <RProp name="indeterminate">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  [Indeterminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes) of the checkbox.

  </RProp>

  <RProp name="value">

  <template #type>

  `string | number`

  </template>

  Item key or data when checked in the CheckboxGroup.

  See [List Rendering](/guide/specs#list-rendering).

  </RProp>

  <RProp name="...">

  See [Space Props](/components/space#props).

  Unlike Space, the default value of Checkbox's `tag` is `label`.

  </RProp>

</RPropsTable>

### Checkbox Events

<REventsTable>

  <REvent name="update:checked">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when checked state of the checkbox is changed.

  </REvent>

</REventsTable>

### Checkbox Slots

<RSlotsTable>

  <RSlot name="default">
    Label of the checkbox.
  </RSlot>

</RSlotsTable>

### Checkbox Styles

<RStylesTable>

  <template #name="{ value }">--r-checkbox-{{ value }}</template>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the checkbox control border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused or active, `1px` else

  </template>

  Width of the checkbox control border.

  </RStyle>

  <RStyle name="checked-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-primary-color)`

  </template>

  Color of the checkbox checked line.

  </RStyle>

  <RStyle name="checked-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `1px`

  </template>

  Width of the checkbox checked line.

  </RStyle>

  <RStyle name="control-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Size of the checkbox control.

  </RStyle>

  <RStyle name="...">

  <template #name>...</template>

  See [Space Styles](/components/space#styles).

  </RStyle>

</RStylesTable>

### CheckboxGroup Props

<RPropsTable>

  <RProp name="disabled">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether to disable all checking items.

  </RProp>

  <RProp name="model-value">

  <template #type>

  `string | number | undefined` or `(string | number)[]`

  </template>

  Key(s) or data of the checked item(s) of the group.

  </RProp>

  <RProp name="multiple">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to support checking multiple items.

  </RProp>

  <RProp name="...">

  See [Space Props](/components/space#props).

  </RProp>

</RPropsTable>

### CheckboxGroup Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the checkbox group.
  </RSlot>

</RSlotsTable>

### CheckboxGroup Events

<REventsTable>

  <REvent name="update:model-value">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when the checked items are changed.

  </REvent>

</REventsTable>

### CheckboxGroup Styles

<RStylesTable>

  <template #name="{ value }">--r-checkbox-group-{{ value }}</template>

  <RStyle name="...">

  <template #name>...</template>

  See [Space Styles](/components/space#styles).

  </RStyle>

</RStylesTable>
