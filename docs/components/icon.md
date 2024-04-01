<script lang="ts" setup>
import { kebabCase } from 'lodash-es'
import { CaseSensitive, icons, Regex, Tv, WholeWord } from 'lucide'
import { defineIcons, RCard, RDetails, RIcon, RInput, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

defineIcons(icons)

let name = ref('pencil')
</script>

# Icon

No Picture, No Truth.

<RCard type="info">

Roughness recommends using (and redraws) [Lucide Icons](https://lucide.dev/).

</RCard>

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```ts
import { icons } from 'lucide'
import { defineIcons } from 'roughness'

defineIcons(icons)
```

```vue
<script lang="ts" setup>
import { CaseSensitive, Regex, WholeWord } from 'lucide'
import { RIcon, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RSpace>
      <RIcon :icon="CaseSensitive" />
      <RIcon :icon="WholeWord" />
      <RIcon :icon="Regex" />
      <RIcon />
    </RSpace>
    <RSpace>
      <RIcon :icon="Tv" filled />
    </RSpace>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RSpace>
    <RIcon :icon="CaseSensitive" />
    <RIcon :icon="WholeWord" />
    <RIcon :icon="Regex" />
    <RIcon />
  </RSpace>
  <RSpace>
    <RIcon :icon="Tv" filled />
  </RSpace>
</RSpace>

### Batch Definition

<RDetails>
  <template #summary>Show Code</template>

```ts
import { icons } from 'lucide'
import { defineIcons } from 'roughness'

defineIcons(icons)
```

```vue
<script lang="ts" setup>
import { RIcon, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RIcon name="minus" />
    <RIcon name="maximize-2" />
    <RIcon name="x" />
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RIcon name="minus" />
  <RIcon name="maximize-2" />
  <RIcon name="x" />
</RSpace>

### Color and Size

See [Text](/components/text).

## Usage

<RSpace align="center">
  <RInput v-model="name" />
  <RIcon :name="name" />
</RSpace>

View all available icons [here](https://lucide.dev/icons/).

### Props

<RPropsTable>

  <RProp name="filled">

  <template #type>

  `boolean`

  </template>

  Whether to fill the icon.

  </RProp>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  <template #default-value>

  `{ roughness: 0.5, disableMultiStroke: true }`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="icon">

  <template #type>

  `[tag: string, attrs: SVGProps, children?: IconNodeChild[]]`

  </template>

  Icon object conforming to the type constraint. It can be imported from [`lucide`](https://lucide.dev/guide/packages/lucide).

  `icon` has higher priority than `name`.

  </RProp>

  <RProp name="name">

  <template #type>

  `string`

  </template>

  Name of the icon defined by `defineIcons`.

  </RProp>

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `[]`

  </template>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </RProp>

  <RProp name="...">

  See [Text Props](/components/text#props).

  </RProp>

</RPropsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-icon-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-text-color)`

  </template>

  Color of the icon.

  </RStyle>

  <RStyle name="line-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px`

  </template>

  Line width of the icon.

  </RStyle>

  <RStyle name="...">

  <template #name>...</template>

  See [Text Styles](/components/text#styles).

  </RStyle>

</RStylesTable>
