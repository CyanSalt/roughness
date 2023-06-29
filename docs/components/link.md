<script lang="ts" setup>
import { RDetails, RLink, RSpace, RTable } from 'roughness'
</script>

# Link

The blood moon rises once again. Please be careful, Link...

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RLink>Normal</RLink>
    <RLink type="primary">Primary</RLink>
    <RLink type="info">Info</RLink>
    <RLink type="success">Success</RLink>
    <RLink type="warning">Warning</RLink>
    <RLink type="error">Error</RLink>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RLink>Normal</RLink>
  <RLink type="primary">Primary</RLink>
  <RLink type="info">Info</RLink>
  <RLink type="success">Success</RLink>
  <RLink type="warning">Warning</RLink>
  <RLink type="error">Error</RLink>
</RSpace>

### Size

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RLink size="small">Small</RLink>
    <RLink>Medium</RLink>
    <RLink size="large">Large</RLink>
  </RSpace>
</template>
```

</RDetails>

<RSpace align="center">
  <RLink size="small">Small</RLink>
  <RLink>Medium</RLink>
  <RLink size="large">Large</RLink>
</RSpace>

### With `href` attribute

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RLink href="https://en.wikipedia.org/wiki/Telephone">Start</RLink>
    <RLink type="error" href="https://en.wikipedia.org/wiki/Nuclear_weapon">End</RLink>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RLink href="https://en.wikipedia.org/wiki/Telephone">Start</RLink>
  <RLink type="error" href="https://en.wikipedia.org/wiki/Nuclear_weapon">End</RLink>
</RSpace>

### As Button

See <RLink href="/components/button.html#tag">Button</RLink>.

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['size', 'type']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:size.type>

  `string`, but usually `'small' | 'medium' | 'large'`

  </template>
  <template #body:size.default>

  `'medium'`

  </template>
  <template #body:size.description>
    Link size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>

  <template #body:type.type>

  `string`, but usually `'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'`

  </template>
  <template #body:type.default>

  `'default'`

  </template>
  <template #body:type.description>
    Link style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>
</RTable>

### Styles

<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'underline-width']"
>
  <template #body:*.name="{ row }">--r-link-{{ row }}</template>

  <template #body:color.values>

  `<color>`

  </template>
  <template #body:color.default>

  `var(--r-common-text-color)` for `default` `type`, other theme colors for other `type`

  </template>
  <template #body:color.description>
    Color of the link.
  </template>

  <template #body:underline-width.values>

  `<length>`

  </template>
  <template #body:underline-width.default>

  `3px` when focused or active, `2px` else

  </template>
  <template #body:underline-width.description>

  Size of the link underline. Only visible when hovered, or with the `href` attribute.

  </template>
</RTable>
