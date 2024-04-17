<script lang="ts" setup>
import { RGridGuide } from 'roughness'
</script>

# Grid Guide

Guide lines are always straight.

## Example

::: details Show Code

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

:::

<section :style="{ '--r-grid-guide-color': 'var(--r-common-primary-color)', height: '240px' }">
  <RGridGuide />
</section>

## Usage

<RUsage file="src/grid-guide/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
