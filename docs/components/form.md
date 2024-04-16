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

<RUsage file="src/form/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>

<RUsage file="src/form/form-item.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #styles>

  <RStyle name="...">

  See [Space Styles](/components/space#styles).

  </RStyle>

  </template>

</RUsage>
