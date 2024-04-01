<script lang="ts" setup>
import { RCheckbox, RDetails, RForm, RFormItem, RInput, RRate, RSpace, RSelect, RSwitch, RTable, RText } from 'roughness'
import { ref } from 'vue'

let label = ref<string>('Label')
let labelInline = ref(false)
let required = ref(true)
</script>

# Form

Power takes many forms.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RForm, RFormItem, RInput, RRate, RSelect, RSwitch, RText } from 'roughness'
import { ref } from 'vue'

let labelInline = ref(false)
</script>

<template>
  <RForm :label-inline="labelInline">
    <RFormItem name="label-inline">
      <RSwitch v-model="labelInline" />
    </RFormItem>
    <RFormItem name="label">
      <RInput v-model="label" />
    </RFormItem>
    <RFormItem name="required" :required="required">
      <RCheckbox v-model:checked="required" />
    </RFormItem>
    <RFormItem name="drink">
      <RSelect>
        <RCheckbox value="juice" />
        <RCheckbox value="milk" />
      </RSelect>
    </RFormItem>
    <RFormItem name="satisfaction">
      <RRate />
      <template #message>
        <RText type="comment" size="small">Please support us a lot!</RText>
      </template>
    </RFormItem>
  </RForm>
</template>
```

</RDetails>

<RForm :label-inline="labelInline">
  <RFormItem name="label-inline">
    <RSwitch v-model="labelInline" />
  </RFormItem>
  <RFormItem name="label">
    <template #label>{{ label }}</template>
    <RInput v-model="label" />
  </RFormItem>
  <RFormItem name="required" :required="required">
    <RCheckbox v-model:checked="required" />
  </RFormItem>
  <RFormItem name="drink">
    <RSelect>
      <RCheckbox value="juice" />
      <RCheckbox value="milk" />
    </RSelect>
  </RFormItem>
  <RFormItem name="satisfaction">
    <RRate />
    <template #message>
      <RText type="comment" size="small">Please support us a lot!</RText>
    </template>
  </RFormItem>
</RForm>

## Usage

### Form Props

<RPropsTable>

  <RProp name="label-inline">

  <template #type>

  `boolean`

  </template>

  Whether the labels of the form items are displayed as inline boxes.

  </RProp>

</RPropsTable>

### Form Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the form.
  </RSlot>

</RSlotsTable>

### FormItem Props

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="label-inline">

  <template #type>

  `boolean`

  </template>

  Whether the label of the form item is displayed as an inline box.

  </RProp>

  <RProp name="name">

  <template #type>

  `string`

  </template>

  Field name of the form model.

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

  <RProp name="required">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the field is required.

  </RProp>

</RPropsTable>

### FormItem Slots

<RSlotsTable>

  <RSlot name="label">
    Label of the form item.
  </RSlot>

  <RSlot name="default">
    Content of the form item.
  </RSlot>

  <RSlot name="message">
    Footnote of the form item.
  </RSlot>

</RSlotsTable>

### FormItem Styles

<RStylesTable>

  <template #name="{ value }">--r-form-item-{{ value }}</template>

  <RStyle name="required-marker-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `4px`

  </template>

  Size of the marker when `required` is `true`.

  </RStyle>

  <RStyle name="required-marker-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-error-color)`

  </template>

  Color of the marker when `required` is `true`.

  </RStyle>

  <RStyle name="...">

  <template #name>...</template>

  See [Space Styles](/components/space#styles).

  </RStyle>

</RStylesTable>
