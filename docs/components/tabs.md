<script lang="ts" setup>
import { RDetails, RSpace, RTable, RTabs, RText } from 'roughness'
</script>

# Tabs

My brain has too many tabs open.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RTabs } from 'roughness'
</script>

<template>
  <RTabs :tabs="['amazon', 'apple', 'meta']">
    <template #content:amazon>The Amazon River in South America is the largest river by discharge volume of water in the world.</template>
    <template #content:apple>An apple is a round, edible fruit produced by an apple tree.</template>
    <template #content:meta>Meta is a prefix meaning "more comprehensive" or "transcending".</template>
  </RTabs>
</template>
```

</RDetails>

<RTabs :tabs="['amazon', 'apple', 'meta']">
  <template #content:amazon>The Amazon River in South America is the largest river by discharge volume of water in the world.</template>
  <template #content:apple>An apple is a round, edible fruit produced by an apple tree.</template>
  <template #content:meta>Meta is a prefix meaning "more comprehensive" or "transcending".</template>
</RTabs>

### Anchor Side

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RTabs } from 'roughness'
</script>

<template>
  <RTabs :tabs="['installation', 'usage', 'theme', 'chart']" anchor-side="left" :content="false" />
</template>
```

</RDetails>

<RTabs :tabs="['installation', 'usage', 'theme', 'chart']" anchor-side="left" :content="false" />

## Usage

### Tabs Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['anchor-side', 'content', 'graphics-options', 'model-value', 'reactions', 'tabs', '...']"
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

  `number` if `tabs` is `number`, `string` else.

  </template>
  <template #body:model-value:description>

  Currently active tab key.

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

  <template #body:tabs:type>

  `(string | number | RValue)[] | number`

  </template>
  <template #body:tabs:default>
    <RText type="error">Required</RText>.
  </template>
  <template #body:tabs:description>

  Tab keys or data.

  See [List Rendering](/guide/specs#list-rendering).

  </template>

  <template #body:...:description>

  See [Space Props](/components/space#props).

  </template>
</RTable>
</RSpace>

### Tabs Events

<RSpace overflow>
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

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['anchor:_tab_', 'anchor:*', 'content:_tab_', 'content:*']"
>
  <template #body:*:name="{ row }">{{ row.replace(/_(\w+)_/g, '[$1]') }}</template>

  <template #body:anchor:_tab_:description>

  Anchor for tab corresponding to `[tab]`. Fallback to `anchor:*`.

  </template>

  <template #body:anchor:*:parameters>

  `{ tab: string }`

  </template>
  <template #body:anchor:*:description>

  Anchor for each tab. Defaults to `startCase(keyOf(tab))`.

  </template>

  <template #body:content:_tab_:description>

  Content for tab corresponding to `[tab]`. Fallback to `content:*`.

  </template>

  <template #body:content:*:parameters>

  `{ tab: string }`

  </template>
  <template #body:content:*:description>

  Content for each tab.

  </template>
</RTable>
</RSpace>

### TabAnchor Styles

<RSpace overflow>
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
