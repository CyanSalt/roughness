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

<RSpace>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['anchor-side', 'content', 'graphics-options', 'model-value', 'reactions', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:content:type>

  `boolean`

  </template>
  <template #body:content:default>

  `true`

  </template>
  <template #body:content:description>
    Whether to display the tabs content.
  </template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:model-value:type>

  `string | number | undefined`

  </template>
  <template #body:model-value:description>

  Value of the active tab item in tabs.

  </template>

  <template #body:anchor-side:type>

  `'top' | 'bottom' | 'left' | 'right'`

  </template>
  <template #body:anchor-side:default>

  `'top'`

  </template>
  <template #body:anchor-side:description>
    Which side of the content the anchors will show on.
  </template>

  <template #body:reactions:type>

  `string[]`

  </template>
  <template #body:reactions:default>

  `['hover', 'focus-within', 'active']`

  </template>
  <template #body:reactions:description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>

  <template #body:...:description>

  See [Space Props](/components/space#props).

  </template>
</RTable>
</RSpace>

### Tabs Events

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:model-value']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:model-value:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:model-value:description>
    Callback function triggered when the active tab is changed.
  </template>
</RTable>
</RSpace>

### Tabs Slots

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:description>

  Content of the tabs. You can render one or more TabItem by yourself.

  </template>
</RTable>
</RSpace>

### TabItem Props

<RSpace>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['value']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:value:type>

  `string | number | RValue`

  </template>
  <template #body:value:default>
    <RText type="error">Required</RText>
  </template>
  <template #body:content:description>

  Tab item key or data.

  See [List Rendering](/guide/specs#list-rendering).

  </template>
</RTable>
</RSpace>

### TabItem Slots

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['anchor', 'default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:anchor:description>

  Anchor of the tab item.

  </template>

  <template #body:default:description>

  Content of the tab item.

  </template>
</RTable>
</RSpace>

### TabAnchor Styles

<RSpace>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['active-color', 'border-color', 'border-width', 'border-dash']"
>
  <template #body:*:name="{ row }">--r-tab-anchor-{{ row }}</template>

  <template #body:active-color:values>

  `<color>`

  </template>
  <template #body:active-color:default>

  `var(--r-common-primary-color)`

  </template>
  <template #body:active-color:description>
    Color of the tab anchor and its border when active.
  </template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color:description>
    Color of the tab anchor border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `2px` when focused or active, `1px` else

  </template>
  <template #body:border-width:description>
    Width of the tab anchor border.
  </template>

  <template #body:border-dash:values>

  `<length> +` or `none`

  </template>
  <template #body:border-dash:default>

  `8px` when hovered, `none` else

  </template>
  <template #body:border-dash:description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the tab anchor border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </template>
</RTable>
</RSpace>
