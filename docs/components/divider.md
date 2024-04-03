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

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

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

  <RProp name="vertical">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether to display vertical divider.

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="will-draw">

  Associating effects before graphics drawing.

  See [Reactions](/guide/theme#reactions).

  </REvent>

</REventsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-divider-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-primary-color)`

  </template>

  Color of the divider.

  </RStyle>

  <RStyle name="gap-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `12px`

  </template>

  Size of the divider gap.

  </RStyle>

</RStylesTable>
