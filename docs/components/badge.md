<script lang="ts" setup>
import { RBadge, RDetails, RLink, RSpace, RTable, RText } from 'roughness'
</script>

# Badge

Brezhnev was dressed for burial in his Marshal's uniform along with his medals.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RBadge, RButton } from 'roughness'
</script>

<template>
  <RSpace>
    <RBadge>
      <template #marker>3</template>
      <RLink>News</RLink>
    </RBadge>
    <RBadge>
      <RLink>Letters</RLink>
    </RBadge>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RBadge>
    <template #marker>3</template>
    <RLink>News</RLink>
  </RBadge>
  <RBadge>
    <RLink>Letters</RLink>
  </RBadge>
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

### Events

<REventsTable>

  <REvent name="will-draw">

  Associating effects before graphics drawing.

  See [Reactions](/guide/theme#reactions).

  </REvent>

</REventsTable>

### Slots

<RSlotsTable>

  <RSlot name="marker">
    Content of the badge marker.
  </RSlot>

  <RSlot name="default">
    Decorated content of the badge.
  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-badge-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-error-color)`

  </template>

  Color of the badge marker.

  </RStyle>

  <RStyle name="padding-block">

  <template #values>

  1-2 `<length>` or `<percentage>`

  </template>

  <template #default-value>

  `calc(0.5em - 4px)`

  </template>

  Vertical padding of the badge marker.

  </RStyle>

  <RStyle name="padding-inline">

  <template #values>

  1-2 `<length>` or `<percentage>`

  </template>

  <template #default-value>

  `calc(1em - 4px)`

  </template>

  Horizontal padding of the badge marker.

  </RStyle>

</RStylesTable>
