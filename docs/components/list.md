<script lang="ts" setup>
import { RDetails, RList, RListItem, RSpace, RTable, RText } from 'roughness'
</script>

# List

I always make a list before I go to the grocery store. Sometimes, I even remember to bring it with me.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RList, RListItem } from 'roughness'
</script>

<template>
  <RList>
    <RListItem>Dog Food</RListItem>
    <RListItem>Cat Food</RListItem>
    <RListItem>
      <RText type="warning">Human Food</RText>
    </RListItem>
  </RList>
</template>
```

</RDetails>

<RList>
  <RListItem>Dog Food</RListItem>
  <RListItem>Cat Food</RListItem>
  <RListItem>
    <RText type="warning">Human Food</RText>
  </RListItem>
</RList>

### List Style

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RList, RListItem } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RList list-style="square">
      <RListItem>How are you?</RListItem>
      <RListItem>Fine, thank you.<br>And you?</RListItem>
    </RList>
    <RList list-style="auto">
      <RListItem>4142135623730951</RListItem>
      <RListItem>23606797749979</RListItem>
    </RList>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RList list-style="square">
    <RListItem>How are you?</RListItem>
    <RListItem>Fine, thank you.<br>And you?</RListItem>
  </RList>
  <RList list-style="auto">
    <RListItem>4142135623730951</RListItem>
    <RListItem>23606797749979</RListItem>
  </RList>
</RSpace>

## Usage

### List Props

<RPropsTable>

  <RProp name="list-style">

  <template #type>

  `'disc' | 'circle' | 'square' | 'auto'`

  </template>

  <template #default-value>

  `'disc'`

  </template>

  Marker style of the list. See [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type).

  When specified as `auto`, the list will be **ordered** and the markers will be drawn by the user agent.

  </RProp>

  <RProp name="...">

  See [Space Props](/components/space#props).

  Unlike Space, the default value of List's `tag` is `ul` or `ol`.

  </RProp>

</RPropsTable>

### List Slots

<RSlotsTable>

  <RSlot name="default">

  Content of the list. You can render one or more ListItem by yourself.

  </RSlot>

</RSlotsTable>

### List Styles

<RStylesTable>

  <template #name="{ value }">--r-list-{{ value }}</template>

  <RStyle name="marker-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-primary-color)`

  </template>

  Color of the list marker.

  </RStyle>

  <RStyle name="marker-block-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Area height of the list marker.

  </RStyle>

  <RStyle name="marker-inline-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `1.5em`

  </template>

  Area width of the list marker.

  </RStyle>

  <RStyle name="...">

  <template #name>...</template>

  See [Space Styles](/components/space#styles).

  </RStyle>

</RStylesTable>

### ListItem Props

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

</RPropsTable>

### ListItem Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the list item.
  </RSlot>

</RSlotsTable>
