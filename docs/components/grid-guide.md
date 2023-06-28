<script lang="ts" setup>
import { RGridGuide, RTable } from 'roughness'
</script>

# Grid Guide

Guide lines are always straight.

## Example

```vue
<script lang="ts" setup>
import { RGridGuide } from 'roughness'
</script>

<template>
  <section :style="{ height: '240px' }">
    <RGridGuide :style="{ '--r-grid-guide-color': 'var(--r-common-primary-color)' }" />
  </section>
</template>
```

<section :style="{ height: '240px' }">
  <RGridGuide :style="{ '--r-grid-guide-color': 'var(--r-common-primary-color)' }" />
</section>

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['max-sections', 'responsive', 'section-cells']"
>
  <template #head:*="{ column, helpers }">{{ helpers.startCase(column) }}</template>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:max-sections.type>
    <code>number</code>
  </template>
  <template #body:max-sections.default>
    <code>10</code>
  </template>
  <template #body:max-sections.description>
    The maximum number of sections that can be displayed under the current viewport dimensions.
  </template>

  <template #body:responsive.type>
    <code>boolean</code>
  </template>
  <template #body:responsive.default>
    <code>true</code>
  </template>
  <template #body:responsive.description>
    Whether to adjust the size to fit the parent element.
  </template>

  <template #body:section-cells.type>
    <code>number</code>
  </template>
  <template #body:section-cells.default>
    <code>8</code>
  </template>
  <template #body:section-cells.description>
    The number of cells in one section dimension.
  </template>
</RTable>
