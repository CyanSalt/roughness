<script lang="ts" setup>
import { kebabCase } from 'lodash-es'
import { CaseSensitive, icons, Regex, WholeWord } from 'lucide'
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
  <RSpace>
    <RIcon :icon="CaseSensitive" />
    <RIcon :icon="WholeWord" />
    <RIcon :icon="Regex" />
    <RIcon />
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RIcon :icon="CaseSensitive" />
  <RIcon :icon="WholeWord" />
  <RIcon :icon="Regex" />
  <RIcon />
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

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'icon', 'name', 'reactions', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:icon:type>

  `[tag: string, attrs: SVGProps, children?: IconNodeChild[]]`

  </template>
  <template #body:icon:description>

  Icon object conforming to the type constraint. It can be imported from [`lucide`](https://lucide.dev/guide/packages/lucide).

  `icon` has higher priority than `name`.

  </template>

  <template #body:name:type>

  `string`

  </template>
  <template #body:name:description>

  Name of the icon defined by `defineIcons`.

  </template>

  <template #body:reactions:type>

  `string[]`

  </template>
  <template #body:reactions:default>

  `[]`

  </template>
  <template #body:reactions:description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>

  <template #body:...:description>

  See [Text Props](/components/text#props).

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'line-width', '...']"
>
  <template #body:*:name="{ row }">--r-icon-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-text-color)`

  </template>
  <template #body:color:description>
    Color of the icon.
  </template>

  <template #body:line-width:values>

  `<length>`

  </template>
  <template #body:line-width:default>

  `2px`

  </template>
  <template #body:line-width:description>
    Line width of the icon.
  </template>

  <template #body:...:name>...</template>
  <template #body:...:description>

  See [Text Styles](/components/text#styles).

  </template>
</RTable>
</RSpace>
