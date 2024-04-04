<script lang="ts" setup>
import { RCheckbox, RDetails, RSelect, RSpace, RTable } from 'roughness'
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
    <RCheckbox value="stable" />
    <RCheckbox value="beta" />
    <RCheckbox value="dev" />
    <RCheckbox value="canary" />
  </RSelect>
</template>
```

</RDetails>

<RSelect placeholder="Test engineer rank">
  <RCheckbox value="stable" />
  <RCheckbox value="beta" />
  <RCheckbox value="dev" />
  <RCheckbox value="canary" />
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
    <RCheckbox value="Right Arm" />
    <RCheckbox value="Left Arm" />
    <RCheckbox value="Right Leg" />
    <RCheckbox value="Left Leg" />
  </RSelect>
</template>
```

</RDetails>

<RSelect multiple placeholder="Exodia">
  <RCheckbox value="Right Arm" />
  <RCheckbox value="Left Arm" />
  <RCheckbox value="Right Leg" />
  <RCheckbox value="Left Leg" />
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
    <RSelect :model-value="[1]" multiple disabled>
      <RCheckbox :value="1" label="Basic User Info" />
    </RSelect>
    <RSelect loading placeholder="Arsenal" />
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RSelect :model-value="[1]" multiple disabled>
    <RCheckbox :value="1" label="Basic User Info" />
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
    <RCheckbox value="Spring" />
    <RCheckbox value="Summer" />
    <RCheckbox value="Autumn" />
    <RCheckbox value="Winter" />
  </RSelect>
</template>
```

</RDetails>

<RSelect clearable placeholder="Blue time">
  <RCheckbox value="Spring" />
  <RCheckbox value="Summer" />
  <RCheckbox value="Autumn" />
  <RCheckbox value="Winter" />
</RSelect>

### Tree

See [Checkbox Tree](/components/checkbox#tree).

## Usage

### Props

<RPropsTable>

  <RProp name="clearable">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the select is clearable.

  </RProp>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="loading">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the select is loading. It will be non-interactive in loading state.

  </RProp>

  <RProp name="model-value">

  <template #type>

  `string | number | undefined` or `(string | number)[]`

  </template>

  Key(s) or data of the selected item(s).

  </RProp>

  <RProp name="multiple">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether to support selecting multiple items.

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="update:model-value">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when the selected item is changed.

  </REvent>

</REventsTable>

### Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the select dropdown.
  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-select-{{ value }}</template>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the select control border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused, `1px` else

  </template>

  Width of the select control border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `none`

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the select border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </RStyle>

  <RStyle name="dropdown-border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `1px`

  </template>

  Width of the select dropdown border.

  </RStyle>

  <RStyle name="dropdown-border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `none`

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the select dropdown border.

  </RStyle>

  <RStyle name="dropdown-padding-block">

  <template #values>

  1-2 `<length>` or `<percentage>`

  </template>

  <template #default-value>

  `12px`

  </template>

  Vertical padding of the select dropdown.

  </RStyle>

  <RStyle name="dropdown-padding-inline">

  <template #values>

  1-2 `<length>` or `<percentage>`

  </template>

  <template #default-value>

  `12px`

  </template>

  Horizontal padding of the select dropdown.

  </RStyle>

</RStylesTable>
