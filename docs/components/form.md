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
        <RText type="comment">Please support us a lot!</RText>
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
      <RText type="comment">Please support us a lot!</RText>
    </template>
  </RFormItem>
</RForm>

## Usage

### Form Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['label-inline']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:label-inline:type>

  `boolean`

  </template>
  <template #body:label-inline:description>
    Whether the labels of the form items are displayed as inline boxes.
  </template>
</RTable>
</RSpace>

### FormItem Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'label-inline', 'name', 'reactions', 'required']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:label-inline:type>

  `boolean`

  </template>
  <template #body:label-inline:description>
    Whether the label of the form item is displayed as an inline box.
  </template>

  <template #body:name:type>

  `string`

  </template>
  <template #body:name:description>
    Field name of the form model.
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

  <template #body:required:type>

  `boolean`

  </template>
  <template #body:required:default>

  `false`

  </template>
  <template #body:required:description>
    Whether the field is required.
  </template>
</RTable>
</RSpace>

### FormItem Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['label', 'default', 'message']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:label:description>
    Label of the form item.
  </template>

  <template #body:default:description>
    Content of the form item.
  </template>

  <template #body:message:description>
    Footnote of the form item.
  </template>
</RTable>
</RSpace>

### FormItem Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['required-marker-size', 'required-marker-color', '...']"
>
  <template #body:*:name="{ row }">--r-form-item-{{ row }}</template>

  <template #body:required-marker-size:values>

  `<length>`

  </template>
  <template #body:required-marker-size:default>

  `4px`

  </template>
  <template #body:required-marker-size:description>
    Size of the marker when `required` is `true`.
  </template>

  <template #body:required-marker-color:values>

  `<color>`

  </template>
  <template #body:required-marker-color:default>

  `var(--r-common-error-color)`

  </template>
  <template #body:required-marker-color:description>
    Color of the marker when `required` is `true`.
  </template>

  <template #body:...:name>...</template>
  <template #body:...:description>

  See [Space Styles](/components/space#styles).

  </template>
</RTable>
</RSpace>
