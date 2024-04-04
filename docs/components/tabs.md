<script lang="ts" setup>
import { RDetails, RSpace, RTable, RTabItem, RTabs, RText } from 'roughness'
</script>

# Tabs

My brain has too many tabs open.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RTabItem, RTabs } from 'roughness'
</script>

<template>
  <RTabs>
    <RTabItem value="amazon">The Amazon River in South America is the largest river by discharge volume of water in the world.</RTabItem>
    <RTabItem value="apple">An apple is a round, edible fruit produced by an apple tree.</RTabItem>
    <RTabItem value="meta">Meta is a prefix meaning "more comprehensive" or "transcending".</RTabItem>
  </RTabs>
</template>
```

</RDetails>

<RTabs>
  <RTabItem value="amazon">The Amazon River in South America is the largest river by discharge volume of water in the world.</RTabItem>
  <RTabItem value="apple">An apple is a round, edible fruit produced by an apple tree.</RTabItem>
  <RTabItem value="meta">Meta is a prefix meaning "more comprehensive" or "transcending".</RTabItem>
</RTabs>

### Anchor Side

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RTabItem, RTabs } from 'roughness'
</script>

<template>
  <RTabs anchor-side="left" :content="false">
    <RTabItem value="installation" />
    <RTabItem value="usage" />
    <RTabItem value="theme" />
    <RTabItem value="chart" />
  </RTabs>
</template>
```

</RDetails>

<RTabs anchor-side="left" :content="false">
  <RTabItem value="installation" />
  <RTabItem value="usage" />
  <RTabItem value="theme" />
  <RTabItem value="chart" />
</RTabs>

## Usage

### Tabs Props

<RPropsTable>

  <RProp name="content">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to display the tabs content.

  </RProp>

  <RProp name="model-value">

  <template #type>

  `string | number | undefined`

  </template>

  Value of the active tab item in tabs.

  </RProp>

  <RProp name="anchor-side">

  <template #type>

  `'top' | 'bottom' | 'left' | 'right'`

  </template>

  <template #default-value>

  `'top'`

  </template>

  Which side of the content the anchors will show on.

  </RProp>

  <RProp name="...">

  See [Space Props](/components/space#props).

  </RProp>

</RPropsTable>

### Tabs Events

<REventsTable>

  <REvent name="update:model-value">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when the active tab is changed.

  </REvent>

</REventsTable>

### Tabs Slots

<RSlotsTable>

  <RSlot name="default">

  Content of the tabs. You can render one or more TabItem by yourself.

  </RSlot>

</RSlotsTable>

### TabItem Props

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="value">

  <template #type>

  `string | number | RValue`

  </template>

  <template #default-value>
    <RText type="error">Required</RText>
  </template>

  Tab item key or data.

  See [List Rendering](/guide/specs#list-rendering).

  </RProp>

</RPropsTable>

### TabItem Slots

<RSlotsTable>

  <RSlot name="anchor">

  Anchor of the tab item.

  </RSlot>

  <RSlot name="default">

  Content of the tab item.

  </RSlot>

</RSlotsTable>

### TabAnchor Styles

<RStylesTable>

  <template #name="{ value }">--r-tab-anchor-{{ value }}</template>

  <RStyle name="active-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-primary-color)`

  </template>

  Color of the tab anchor and its border when active.

  </RStyle>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the tab anchor border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused or active, `1px` else

  </template>

  Width of the tab anchor border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `8px` when hovered, `none` else

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the tab anchor border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </RStyle>

</RStylesTable>
