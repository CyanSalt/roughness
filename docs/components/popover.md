<script lang="ts" setup>
import { RDetails, RPopover, RSpace, RTable } from 'roughness'
</script>

# Popover

Should this text appear in a popover?

## Example

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
    <RPopover trigger="click" placement="bottom">
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
  <RPopover trigger="click" placement="bottom">
    <template #anchor>Click to wake Tom up</template>
    And let him find out that Jerry stole his cheese
  </RPopover>
</RSpace>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['align', 'placement', 'open', 'trigger', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:align:type>

  `'start' | 'end' | 'center' | 'stretch'`

  </template>
  <template #body:align:default>

  `'start'`

  </template>
  <template #body:align:description>

  Alignment of the popover content relative to the anchor.

  - `start`: Align to the left or top of the anchor, depending on the value of `placement`
  - `end`: Align to the right or bottom of the anchor, depending on the value of `placement`
  - `center`: Align to the center of the anchor
  - `stretch`: Align to both sides of the anchor at the same time

  </template>

  <template #body:placement:type>

  `'top' | 'bottom' | 'left' | 'right'`

  </template>
  <template #body:placement:default>

  `'top'`

  </template>
  <template #body:placement:description>
    Which side of the anchor the popover will show on.
  </template>

  <template #body:open:type>

  `boolean`

  </template>
  <template #body:open:default>

  `false`

  </template>
  <template #body:open:description>
    Whether to display the popover content.
  </template>

  <template #body:trigger:type>

  `'hover' | 'click'`

  </template>
  <template #body:trigger:default>

  `'hover'`

  </template>
  <template #body:trigger:description>
    How to trigger the display of popover content.
  </template>

  <template #body:...:description>

  See [Card Props](/components/card#props).

  Unlike Card, the default value of Popover's `header` is `false`.

  </template>
</RTable>
</RSpace>

### Events

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:open']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:open:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:open:description>
    Callback function triggered when visibility of the popover is changed.
  </template>
</RTable>
</RSpace>

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['anchor', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:anchor:description>
    Anchor of the popover.
  </template>

  <template #body:...:description>

  See [Card Slots](/components/card#slots).

  </template>
</RTable>
</RSpace>
