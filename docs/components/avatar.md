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
import { RAvatar, RSpace } from 'roughness'
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

### Props

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="name">

  <template #type>

  `string`

  </template>

  <template #default-value>
    <RText type="error">Required</RText>
  </template>

  Unique key to generate color and pixels.

  </RProp>

  <RProp name="round">

  <template #type>

  `boolean`

  </template>

  Whether the avatar is round.

  </RProp>

</RPropsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-avatar-{{ value }}</template>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-comment-color)`

  </template>

  Border color of the avatar.

  </RStyle>

  <RStyle name="size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2em`

  </template>

  Size of the avatar.

  </RStyle>

</RStylesTable>
