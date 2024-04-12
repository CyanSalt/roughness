<script lang="ts" setup>
import { RButton, RCard, RDetails, RSpace, RTable, RText } from 'roughness'
</script>

# Card

Sawatdee Card!

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCard } from 'roughness'
</script>

<template>
  <RCard>
    <template #title>A Tranquil Night</template>
    Abed, I see a silver light,<br>
    I wonder if It’s frost around.<br>
    Looking up, I find the moon bright;<br>
    Bowing, in homesickness I’m drowned.
  </RCard>
</template>
```

</RDetails>

<RCard>
  <template #title>A Tranquil Night</template>
  Abed, I see a silver light,<br>
  I wonder if It’s frost around.<br>
  Looking up, I find the moon bright;<br>
  Bowing, in homesickness I’m drowned.
</RCard>

### Alert

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCard, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RCard type="info">For every minute in Africa, 60 seconds pass.</RCard>
    <RCard type="success">You successfully failed.</RCard>
    <RCard type="warning" size="small">No programmer can see warnings.</RCard>
    <RCard type="error" size="large">You threw tantrums on me!</RCard>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCard type="info">For every minute in Africa, 60 seconds pass.</RCard>
  <RCard type="success">You successfully failed.</RCard>
  <RCard type="warning" size="small">No programmer can see warnings.</RCard>
  <RCard type="error" size="large">You threw tantrums on me!</RCard>
</RSpace>

## Usage

### Props

<RPropsTable>

  <RProp name="footer">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether to display the card footer.

  </RProp>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="header">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to display the card header.

  </RProp>

  <RProp name="type">

  <template #type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>

  Card style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  See also [Color Styles](/guide/theme#color-styles).

  </RProp>

  <RProp name="...">

  See [Space Props](/components/space#props).

  Unlike Space, the default value of Card's `tag` is `article`.

  </RProp>

</RPropsTable>

### Slots

<RSlotsTable>

  <RSlot name="title">

  Content of the card title. When a reasonable `type` is specified, the uppercase form of `type` is displayed by default.

  Only available if the `header` is `true`.

  </RSlot>

  <RSlot name="header-end">

  Content of the card header after title.

  Only available if the `header` is `true`.

  </RSlot>

  <RSlot name="default">
    Content of the card.
  </RSlot>

  <RSlot name="footer">

  Content of the card footer.

  Only available if the `footer` is `true`.

  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-card-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-color)`

  </template>

  Color of the card text.

  </RStyle>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-card-color)`

  </template>

  Color of the card border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `1px`

  </template>

  Width of the card border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `none`

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the card border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </RStyle>

  <RStyle name="padding-block">

  <template #values>

  1-2 `<length>` or `<percentage>`

  </template>

  <template #default-value>

  `calc(var(--r-common-box-padding-block) * 2)`

  </template>

  Vertical padding of the card.

  </RStyle>

  <RStyle name="padding-inline">

  <template #values>

  1-2 `<length>` or `<percentage>`

  </template>

  <template #default-value>

  `var(--r-common-box-padding-inline)`

  </template>

  Horizontal padding of the card.

  </RStyle>

  <RStyle name="...">

  <template #name>...</template>

  See [Space Styles](/components/space#styles).

  </RStyle>

</RStylesTable>
