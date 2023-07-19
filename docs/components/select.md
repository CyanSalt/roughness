<script lang="ts" setup>
import { RCheckbox, RDetails, RSelect, RSpace, RTable, RText } from 'roughness'
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
    <RCheckbox value="stable" label="Stable" />
    <RCheckbox value="beta" label="Beta" />
    <RCheckbox value="dev" label="Dev" />
    <RCheckbox value="canary" label="Canary" />
  </RSelect>
</template>
```

</RDetails>

<RSelect placeholder="Test engineer rank">
  <RCheckbox value="stable" label="Stable" />
  <RCheckbox value="beta" label="Beta" />
  <RCheckbox value="dev" label="Dev" />
  <RCheckbox value="canary" label="Canary" />
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
    <RCheckbox value="Right Arm" label="Right Arm" />
    <RCheckbox value="Left Arm" label="Left Arm" />
    <RCheckbox value="Right Leg" label="Right Leg" />
    <RCheckbox value="Left Leg" label="Left Leg" />
  </RSelect>
</template>
```

</RDetails>

<RSelect multiple placeholder="Exodia">
  <RCheckbox value="Right Arm" label="Right Arm" />
  <RCheckbox value="Left Arm" label="Left Arm" />
  <RCheckbox value="Right Leg" label="Right Leg" />
  <RCheckbox value="Left Leg" label="Left Leg" />
</RSelect>

### State

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RSpace, RSelect } from 'roughness'
</script>

<template>
  <RSpace>
    <RSelect :model-value="['basic']" multiple disabled>
      <RCheckbox value="basic" label="Basic User Info" />
    </RSelect>
    <RSelect loading placeholder="Arsenal" />
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RSelect :model-value="['basic']" multiple disabled>
    <RCheckbox value="basic" label="Basic User Info" />
  </RSelect>
  <RSelect loading placeholder="Arsenal" />
</RSpace>

### Clearable

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCheckbox, RSelect } from 'roughness'
</script>

<template>
  <RSelect clearable placeholder="Blue time">
    <RCheckbox value="Spring" label="Spring" />
    <RCheckbox value="Summer" label="Summer" />
    <RCheckbox value="Autumn" label="Autumn" />
    <RCheckbox value="Winter" label="Winter" />
  </RSelect>
</template>
```

</RDetails>

<RSelect clearable placeholder="Blue time">
  <RCheckbox value="Spring" label="Spring" />
  <RCheckbox value="Summer" label="Summer" />
  <RCheckbox value="Autumn" label="Autumn" />
  <RCheckbox value="Winter" label="Winter" />
</RSelect>

### Tree

See [Checkbox Tree](/components/checkbox#tree).

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['clearable', 'graphics-options', 'loading', 'model-value', 'multiple', 'reactions']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:clearable:type>

  `boolean`

  </template>
  <template #body:clearable:default>

  `false`

  </template>
  <template #body:clearable:description>
    Whether the select is clearable.
  </template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:loading:type>

  `boolean`

  </template>
  <template #body:loading:default>

  `false`

  </template>
  <template #body:loading:description>
    Whether the select is loading. It will be non-interactive in loading state.
  </template>

  <template #body:model-value:type>

  `string | number | undefined` or `(string | number)[]`

  </template>
  <template #body:model-value:default>
    <RText type="error">Required</RText>
  </template>
  <template #body:model-value:description>
    Value(s) of the selected item(s).
  </template>

  <template #body:multiple:type>

  `boolean`

  </template>
  <template #body:multiple:default>

  `false`

  </template>
  <template #body:multiple:description>
    Whether to support selecting multiple items.
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
    Callback function triggered when the selected item is changed.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['border-color', 'border-width', 'dropdown-border-width', 'dropdown-padding-block', 'dropdown-padding-inline']"
>
  <template #body:*:name="{ row }">--r-select-{{ row }}</template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color:description>
    Color of the select control border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `2px` when focused, `1px` else

  </template>
  <template #body:border-width:description>
    Width of the select control border.
  </template>

  <template #body:dropdown-border-width:values>

  `<length>`

  </template>
  <template #body:dropdown-border-width:default>

  `1px`

  </template>
  <template #body:dropdown-border-width:description>
    Width of the select dropdown border.
  </template>

  <template #body:dropdown-padding-block:values>

  1-2 `<length>` or `<percentage>`

  </template>
  <template #body:dropdown-padding-block:default>

  `12px`

  </template>
  <template #body:dropdown-padding-block:description>
    Vertical padding of the select dropdown.
  </template>

  <template #body:dropdown-padding-inline:values>

  1-2 `<length>` or `<percentage>`

  </template>
  <template #body:dropdown-padding-inline:default>

  `12px`

  </template>
  <template #body:dropdown-padding-inline:description>
    Horizontal padding of the select dropdown.
  </template>
</RTable>
</RSpace>
