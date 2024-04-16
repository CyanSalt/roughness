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
  <section :style="{ '--r-grid-guide-color': 'var(--r-common-primary-color)', height: '240px' }">
    <RGridGuide />
  </section>
</template>
```

</RDetails>

<section :style="{ '--r-grid-guide-color': 'var(--r-common-primary-color)', height: '240px' }">
  <RGridGuide />
</section>

## Usage

<RUsage file="src/grid-guide/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
