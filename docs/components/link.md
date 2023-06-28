<script lang="ts" setup>
import { RLink, RSpace, RTable } from 'roughness'
</script>

# Link

The blood moon rises once again. Please be careful, Link...

## Example

### Basic

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

<RSpace>
  <RLink>Normal</RLink>
  <RLink type="primary">Primary</RLink>
  <RLink type="info">Info</RLink>
  <RLink type="success">Success</RLink>
  <RLink type="warning">Warning</RLink>
  <RLink type="error">Error</RLink>
</RSpace>

### With `href` attribute

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

<RSpace>
  <RLink href="https://en.wikipedia.org/wiki/Telephone">Start</RLink>
  <RLink type="error" href="https://en.wikipedia.org/wiki/Nuclear_weapon">End</RLink>
</RSpace>

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['type']"
>
  <template #head:*="{ column, helpers }">{{ helpers.startCase(column) }}</template>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:type.type>
    <code>string</code>, but usually <code>'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'</code>
  </template>
  <template #body:type.default>
    <code>'default'</code>
  </template>
  <template #body:type.description>
    Link style type.
  </template>
</RTable>
