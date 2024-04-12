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

  `var(--r-common-color)`

  </template>

  Color of the avatar border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `1px`

  </template>

  Width of the avatar border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `none`

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the avatar border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

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
