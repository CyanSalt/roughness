<script lang="ts" setup>
import { RDetails, RDivider, RSpace, RTable, RText } from 'roughness'
</script>

# Divider

The LORD caused the sea to go back by a strong east wind all the night, and made the sea dry land, and the waters were divided.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RDivider } from 'roughness'
</script>

<template>
  <RDivider />
</template>
```

</RDetails>

<RDivider />

### Vertical

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RDivider, RText } from 'roughness'
</script>

<template>
  <RText>Hello<RDivider vertical />World</RText>
</template>
```

</RDetails>

<RText>Cowherd<RDivider vertical />Weaver Girl</RText>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'reactions', 'vertical']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

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

  <template #body:vertical:type>

  `boolean`

  </template>
  <template #body:vertical:default>

  `false`

  </template>
  <template #body:vertical:description>
    Whether to display vertical divider.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'gap-size']"
>
  <template #body:*:name="{ row }">--r-divider-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-common-primary-color)`

  </template>
  <template #body:color:description>
    Color of the divider.
  </template>

  <template #body:gap-size:values>

  `<length>`

  </template>
  <template #body:gap-size:default>

  `12px`

  </template>
  <template #body:gap-size:description>
    Size of the divider gap.
  </template>
</RTable>
</RSpace>
