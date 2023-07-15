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
import { RPopover } from 'roughness'
</script>

<template>
  <RPopover>
    <template #anchor>Tom is dreaming...</template>
    About giving Jerry as a gift to the girl he loves
  </RPopover>
</template>
```

</RDetails>

<RPopover>
  <template #anchor>Tom is dreaming...</template>
  About giving Jerry as a gift to the girl he loves
</RPopover>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['align', 'graphics-options', 'open', 'reactions', 'side']"
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

  - `start`: Align to the left or top of the anchor, depending on the value of `side`
  - `end`: Align to the right or bottom of the anchor, depending on the value of `side`
  - `center`: Align to the center of the anchor
  - `stretch`: Align to both sides of the anchor at the same time

  </template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

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

  <template #body:side:type>

  `'top' | 'bottom' | 'left' | 'right'`

  </template>
  <template #body:side:default>

  `'top'`

  </template>
  <template #body:side:description>
    Which side of the anchor the popover will show on.
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
  :rows="['anchor', 'default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:anchor:description>
    Anchor of the popover.
  </template>

  <template #body:default:description>
    Content of the popover.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['border-color', 'border-width']"
>
  <template #body:*:name="{ row }">--r-popover-{{ row }}</template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color:description>
    Color of the popover border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `1px`

  </template>
  <template #body:border-width:description>
    Width of the popover border.
  </template>
</RTable>
</RSpace>
