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
    <RCard type="warning">No programmer can see warnings.</RCard>
    <RCard type="error">You threw tantrums on me!</RCard>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCard type="info">For every minute in Africa, 60 seconds pass.</RCard>
  <RCard type="success">You successfully failed.</RCard>
  <RCard type="warning">No programmer can see warnings.</RCard>
  <RCard type="error">You threw tantrums on me!</RCard>
</RSpace>

### Size

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCard, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RCard type="warning" size="small">You use dependencies from {{ 2023 - 1679 }} years ago.</RCard>
    <RCard type="info">Building 2 versions...</RCard>
    <RCard type="success" size="large">Build succeeded!</RCard>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCard type="warning" size="small">You use dependencies from {{ 2023 - 1679 }} years ago.</RCard>
  <RCard type="info">Building 2 versions...</RCard>
  <RCard type="success" size="large">Build succeeded!</RCard>
</RSpace>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['footer', 'graphics-options', 'header', 'reactions', 'size', 'tag', 'type', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:footer:type>

  `boolean`

  </template>
  <template #body:footer:default>

  `false`

  </template>
  <template #body:footer:description>
    Whether to display the card header.
  </template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:header:type>

  `boolean`

  </template>
  <template #body:header:default>

  `true`

  </template>
  <template #body:header:description>
    Whether to display the card header.
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

  <template #body:size:type>

  `string`, but usually `'small' | 'large'`

  </template>
  <template #body:size:description>
    Card size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>

  <template #body:type:type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>
  <template #body:type:description>

  Card style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  See also [Color Styles](/guide/theme#color-styles).

  </template>

  <template #body:...:description>

  See [Space Props](/components/space#props).

  Unlike Space, the default value of Card's `tag` is `article`.

  </template>
</RTable>
</RSpace>

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['title', 'header-end', 'default', 'footer']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:title:description>

  The content of the card title. When a reasonable `type` is specified, the uppercase form of `type` is displayed by default.

  Only available if the `header` is `true`.

  </template>

  <template #body:header-end:description>

  The content of the card header after title.

  Only available if the `header` is `true`.

  </template>

  <template #body:default:description>
    The content of the card.
  </template>

  <template #body:footer:description>

  The content of the card footer.

  Only available if the `footer` is `true`.

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'border-color', 'border-width', 'border-dash', 'padding-block', 'padding-inline', '...']"
>
  <template #body:*:name="{ row }">--r-card-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:color:description>
    Color of the card text.
  </template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-card-color)`

  </template>
  <template #body:border-color:description>
    Color of the card border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `1px`

  </template>
  <template #body:border-width:description>
    Width of the card border.
  </template>

  <template #body:border-dash:values>

  `<length> +` or `none`

  </template>
  <template #body:border-dash:default>

  `none`

  </template>
  <template #body:border-dash:description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the button border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </template>

  <template #body:padding-block:values>

  1-2 `<length>` or `<percentage>`

  </template>
  <template #body:padding-block:default>

  `calc(var(--r-common-box-padding-block) * 2)`

  </template>
  <template #body:padding-block:description>
    Vertical padding of the card.
  </template>

  <template #body:padding-inline:values>

  1-2 `<length>` or `<percentage>`

  </template>
  <template #body:padding-inline:default>

  `var(--r-common-box-padding-inline)`

  </template>
  <template #body:padding-inline:description>
    Horizontal padding of the card.
  </template>

  <template #body:...:name>...</template>
  <template #body:...:description>

  See [Space Styles](/components/space#styles).

  </template>
</RTable>
</RSpace>
