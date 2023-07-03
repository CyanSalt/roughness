<script lang="ts" setup>
import { RAlert, RDetails, RSpace, RTable } from 'roughness'
</script>

# Alert

I've warned you once.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RAlert, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RAlert>Normal</RAlert>
    <RAlert type="primary">Primary</RAlert>
    <RAlert type="info">Info</RAlert>
    <RAlert type="success">Success</RAlert>
    <RAlert type="warning">Warning</RAlert>
    <RAlert type="error">Error</RAlert>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RAlert>Normal</RAlert>
  <RAlert type="primary">Primary</RAlert>
  <RAlert type="info">Info</RAlert>
  <RAlert type="success">Success</RAlert>
  <RAlert type="warning">Warning</RAlert>
  <RAlert type="error">Error</RAlert>
</RSpace>

### Inline

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RAlert, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RAlert type="warning" inline>Bulb</RAlert>
    <RAlert type="error" inline>Bomb</RAlert>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RAlert type="warning" inline>Bulb</RAlert>
  <RAlert type="error" inline>Bomb</RAlert>
</RSpace>

### Size

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RAlert, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RAlert type="warning" size="small">Germany broke diplomatic relations with France.</RAlert>
    <RAlert type="error">Germany has declared war on France.</RAlert>
    <RAlert size="large">France surrendered.</RAlert>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RAlert type="warning" size="small">Germany broke diplomatic relations with France.</RAlert>
  <RAlert type="error">Germany has declared war on France.</RAlert>
  <RAlert size="large">France surrendered.</RAlert>
</RSpace>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['inline', 'reactions', 'size', 'type']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:inline.type>

  `boolean`

  </template>
  <template #body:inline.default>

  `false`

  </template>
  <template #body:inline.description>
    Whether the alert is displayed as an inline box.
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

  <template #body:size.type>

  `string`, but usually `'small' | 'medium' | 'large'`

  </template>
  <template #body:size.default>

  `'medium'`

  </template>
  <template #body:size.description>
    Alert size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>

  <template #body:type.type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error'`

  </template>
  <template #body:type.description>

  Alert style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  Also see [Color Styles](/guide/theme#color-styles).

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'line-color', 'line-width', 'line-length', 'line-gap']"
>
  <template #body:*.name="{ row }">--r-alert-{{ row }}</template>

  <template #body:color.values>

  `<color>`

  </template>
  <template #body:color.default>

  `var(--r-common-text-color)` for `default` `type`, other theme colors for other `type`

  </template>
  <template #body:color.description>
    Color of the alert text.
  </template>

  <template #body:line-color.values>

  `<color>`

  </template>
  <template #body:line-color.default>

  `var(--r-alert-color)`

  </template>
  <template #body:line-color.description>
    Color of the alert lines.
  </template>

  <template #body:line-width.values>

  `<length>`

  </template>
  <template #body:line-width.default>

  `2px`

  </template>
  <template #body:line-width.description>
    Width of the alert lines.
  </template>

  <template #body:line-length.values>

  `<integer>`

  </template>
  <template #body:line-length.default>

  `8`

  </template>
  <template #body:line-length.description>
    Length of the alert lines.
  </template>

  <template #body:line-gap.values>

  `<integer>`

  </template>
  <template #body:line-gap.default>

  `12`

  </template>
  <template #body:line-gap.description>
    Gap size of the alert lines.
  </template>
</RTable>
</RSpace>