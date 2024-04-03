<script lang="ts" setup>
import { RButton, RDetails, RPopover, RSpace, RTable } from 'roughness'
</script>

# Popover

Should this text appear in a popover?

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RPopover, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RPopover>
      <template #anchor>Tom is dreaming...</template>
      About giving Jerry as a gift to the girl he loves
    </RPopover>
    <RPopover trigger="click" side="bottom">
      <template #anchor>Click to wake Tom up</template>
      And let him find out that Jerry stole his cheese
    </RPopover>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RPopover>
    <template #anchor>Tom is dreaming...</template>
    About giving Jerry as a gift to the girl he loves
  </RPopover>
  <RPopover trigger="click" side="bottom">
    <template #anchor>Click to wake Tom up</template>
    And let him find out that Jerry stole his cheese
  </RPopover>
</RSpace>

### Dropdown

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RPopover, RSpace } from 'roughness'
</script>

<template>
  <RPopover side="bottom">
    <template #anchor>
      <RButton>Hamburger</RButton>
    </template>
    <RSpace vertical>
      <RButton>Nord</RButton>
      <RButton>Mitte</RButton>
      <RButton>Harburg</RButton>
    </RSpace>
  </RPopover>
</template>
```

</RDetails>

<RPopover side="bottom">
  <template #anchor>
    <RButton>Hamburger</RButton>
  </template>
  <RSpace vertical>
    <RButton>Nord</RButton>
    <RButton>Mitte</RButton>
    <RButton>Harburg</RButton>
  </RSpace>
</RPopover>

## Usage

### Props

<RPropsTable>

  <RProp name="align">

  <template #type>

  `'start' | 'end' | 'center' | 'stretch'`

  </template>

  <template #default-value>

  `'start'`

  </template>

  Alignment of the popover content relative to the anchor.

  - `start`: Align to the left or top of the anchor, depending on the value of `side`
  - `end`: Align to the right or bottom of the anchor, depending on the value of `side`
  - `center`: Align to the center of the anchor
  - `stretch`: Align to both sides of the anchor at the same time

  </RProp>

  <RProp name="open">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether to display the popover content.

  </RProp>

  <RProp name="side">

  <template #type>

  `'top' | 'bottom' | 'left' | 'right'`

  </template>

  <template #default-value>

  `'top'`

  </template>

  Which side of the anchor the popover will show on.

  </RProp>

  <RProp name="trigger">

  <template #type>

  `'hover' | 'click'`

  </template>

  <template #default-value>

  `'hover'`

  </template>

  How to trigger the display of popover content.

  </RProp>

  <RProp name="...">

  See [Card Props](/components/card#props).

  Unlike Card, the default value of Popover's `header` is `false`.

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="update:open">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when visibility of the popover is changed.

  </REvent>

</REventsTable>

### Slots

<RSlotsTable>

  <RSlot name="anchor">
    Anchor of the popover.
  </RSlot>

  <RSlot name="...">

  See [Card Slots](/components/card#slots).

  </RSlot>

</RSlotsTable>
