<script lang="ts" setup>
import { RDetails, RGridGuide, RSpace, RTable } from 'roughness'
</script>

# Grid Guide

Guide lines are always straight.

## Example

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

<section :style="{ height: '240px' }">
  <RGridGuide :style="{ '--r-grid-guide-color': 'var(--r-common-primary-color)' }" />
</section>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['max-sections', 'reactions', 'responsive', 'section-cells']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:max-sections.type>

  `number`

  </template>
  <template #body:max-sections.default>

  `10`

  </template>
  <template #body:max-sections.description>
    The maximum number of sections that can be displayed under the current viewport dimensions.
  </template>

  <template #body:reactions.type>

  `string[]`

  </template>
  <template #body:reactions.default>

  `['dark']`

  </template>
  <template #body:reactions.description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>

  <template #body:responsive.type>

  `boolean`

  </template>
  <template #body:responsive.default>

  `true`

  </template>
  <template #body:responsive.description>
    Whether to adjust the size to fit the parent element.
  </template>

  <template #body:section-cells.type>

  `number`

  </template>
  <template #body:section-cells.default>

  `8`

  </template>
  <template #body:section-cells.description>
    The number of cells in one section dimension.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color']"
>
  <template #body:*.name="{ row }">--r-grid-guide-{{ row }}</template>

  <template #body:color.values>

  `<color>`

  </template>
  <template #body:color.default>

  `rgb(255 255 255 / 0.1)` in dark theme, `#f5f5f5` else

  </template>
  <template #body:color.description>
    Color of the guide lines.
  </template>
</RTable>
</RSpace>
