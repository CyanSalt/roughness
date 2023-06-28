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

See [Button](/components/button.html#tag).

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['type']"
>
  <template #head:*="{ column, helpers }">{{ helpers.startCase(column) }}</template>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:type.type>

  `string`, but usually `'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'`

  </template>
  <template #body:type.default>

  `'default'`

  </template>
  <template #body:type.description>
    Link style type.
  </template>
</RTable>
