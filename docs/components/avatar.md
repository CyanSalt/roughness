<script lang="ts" setup>
import { RAvatar, RInput, RSpace } from 'roughness'
import { ref } from 'vue'

const name = ref('Cameron')
</script>

# Avatar

The way of water has no beginning and no end.

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import { RAvatar, RInput, RSpace } from 'roughness'
import { ref } from 'vue'

const name = ref('Cameron')
</script>

<template>
  <RSpace align="center">
    <RAvatar :name="name" />
    <RInput v-model="name" />
    <RAvatar :name="[...name].reverse().join('')" round />
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RAvatar :name="name" />
  <RInput v-model="name" />
  <RAvatar :name="[...name].reverse().join('')" round />
</RSpace>

## Usage

<RUsage file="src/avatar/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Box Props](/components/box#props).

  </RProp>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Box Styles](/components/box#styles).

  </RStyle>

  </template>

</RUsage>
