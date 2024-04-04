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

<RPropsTable>

  <RProp name="responsive">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to adjust the size to fit the parent element.

  </RProp>

</RPropsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-grid-guide-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `rgb(255 255 255 / 10%)` in dark theme, `#f5f5f5` else

  </template>

  Color of the guide lines.

  </RStyle>

  <RStyle name="cell-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-font-size)`

  </template>

  Size of the grid cell.

  </RStyle>

  <RStyle name="section-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-grid-guide-cell-size) * 8)`

  </template>

  Size of the grid section.

  </RStyle>

</RStylesTable>
