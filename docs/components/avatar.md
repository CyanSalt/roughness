<script lang="ts" setup>
import { RAvatar, RDetails, RInput, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

const name = ref('Cameron')
</script>

# Avatar

The way of water has no beginning and no end.

## Example

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

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

</RUsage>
