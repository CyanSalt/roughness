<script lang="ts" setup>
import { RDetails, RSpace, RTable, RText } from 'roughness'
</script>

# Text

The secret of being boring is to say everything.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace>
    <RText>Normal</RText>
    <RText type="primary">Primary</RText>
    <RText type="info">Info</RText>
    <RText type="success">Success</RText>
    <RText type="warning">Warning</RText>
    <RText type="error">Error</RText>
    <RText type="comment">Comment</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RText>Normal</RText>
  <RText type="primary">Primary</RText>
  <RText type="info">Info</RText>
  <RText type="success">Success</RText>
  <RText type="warning">Warning</RText>
  <RText type="error">Error</RText>
  <RText type="comment">Comment</RText>
</RSpace>

### Size

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RText size="small">Small</RText>
    <RText>Medium</RText>
    <RText size="large">Large</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace align="center">
  <RText size="small">Small</RText>
  <RText>Medium</RText>
  <RText size="large">Large</RText>
</RSpace>

### Tag

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace>
    <RText tag="h1" type="error">Statement on the second meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)</RText>
    <RText tag="del">Who really cares?</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RText tag="h1" type="error">Statement on the second meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)</RText>
  <RText tag="del">Who really cares?</RText>
</RSpace>

## Usage

### Props

<RPropsTable>

  <RProp name="block">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the text is displayed as block.

  </RProp>

  <RProp name="size">

  <template #type>

  `string`, but usually `'small' | 'large'`

  </template>

  Text size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  </RProp>

  <RProp name="tag">

  <template #type>

  `string`

  </template>

  <template #default-value>

  `'span'`

  </template>

  HTML tag for rendering the text.

  </RProp>

  <RProp name="type">

  <template #type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>

  Text style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  See also [Color Styles](/guide/theme#color-styles).

  </RProp>

</RPropsTable>

### Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the text.
  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-text-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-element-color)` for `default` `type`, other theme colors for other `type`.

  When `type` is `default`, it will also be inherited from ancestors.

  </template>

  Color of text.

  </RStyle>

</RStylesTable>
