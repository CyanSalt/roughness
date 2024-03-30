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

<RSpace>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['list-style', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:list-style:type>

  `'disc' | 'circle' | 'square' | 'auto'`

  </template>
  <template #body:list-style:default>

  `'disc'`

  </template>
  <template #body:list-style:description>

  Marker style of the list. See [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type).

  When specified as `auto`, the list will be **ordered** and the markers will be drawn by the user agent.

  </template>

  <template #body:...:description>

  See [Space Props](/components/space#props).

  Unlike Space, the default value of List's `tag` is `ul` or `ol`.

  </template>
</RTable>
</RSpace>

### List Slots

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:description>

  Content of the list. You can render one or more ListItem by yourself.

  </template>
</RTable>
</RSpace>

### List Styles

<RSpace>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['marker-color', 'marker-block-size', 'marker-inline-size', '...']"
>
  <template #body:*:name="{ row }">--r-list-{{ row }}</template>

  <template #body:marker-color:values>

  `<color>`

  </template>
  <template #body:marker-color:default>

  `var(--r-common-primary-color)`

  </template>
  <template #body:marker-color:description>
    Color of the list marker.
  </template>

  <template #body:marker-block-size:values>

  `<length>`

  </template>
  <template #body:marker-block-size:default>

  `var(--r-common-line-height)`

  </template>
  <template #body:marker-block-size:description>
    Area height of the list marker.
  </template>

  <template #body:marker-inline-size:values>

  `<length>`

  </template>
  <template #body:marker-inline-size:default>

  `1.5em`

  </template>
  <template #body:marker-inline-size:description>
    Area width of the list marker.
  </template>

  <template #body:...:name>...</template>
  <template #body:...:description>

  See [Space Styles](/components/space#styles).

  </template>
</RTable>
</RSpace>

### ListItem Props

<RSpace>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'reactions']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

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
</RTable>
</RSpace>

### ListItem Slots

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:description>
    Content of the list item.
  </template>
</RTable>
</RSpace>
