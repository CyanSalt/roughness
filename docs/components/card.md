<script lang="ts" setup>
import { RButton, RCard, RDetails, RSpace, RTable, RText } from 'roughness'
</script>

# RCard

Sawatdee Card!

## Example

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

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['footer', 'header', 'reactions', 'tag']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:footer.type>

  `boolean`

  </template>
  <template #body:footer.default>

  `false`

  </template>
  <template #body:footer.description>
    Whether to display the card header.
  </template>

  <template #body:header.type>

  `boolean`

  </template>
  <template #body:header.default>

  `true`

  </template>
  <template #body:header.description>
    Whether to display the card header.
  </template>

  <template #body:reactions.type>

  `string[]`

  </template>
  <template #body:reactions.default>

  `[]`

  </template>
  <template #body:reactions.description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>

  <template #body:tag.type>

  `string`

  </template>
  <template #body:tag.default>

  `'article'`

  </template>
  <template #body:tag.description>
    HTML tag for rendering the button.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['border-color', 'border-width', 'border-dash', 'padding-block', 'padding-inline']"
>
  <template #body:*.name="{ row }">--r-card-{{ row }}</template>

  <template #body:border-color.values>

  `<color>`

  </template>
  <template #body:border-color.default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color.description>
    Color of the button border.
  </template>

  <template #body:border-width.values>

  `<length>`

  </template>
  <template #body:border-width.default>

  `1px`

  </template>
  <template #body:border-width.description>
    Width of the card border.
  </template>

  <template #body:border-dash.values>

  `<length> +` or `none`

  </template>
  <template #body:border-dash.default>

  `none`

  </template>
  <template #body:border-dash.description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the button border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </template>

  <template #body:padding-block.values>

  1-2 `<length>` or `<percentage>`

  </template>
  <template #body:padding-block.default>

  `calc(var(--r-common-box-padding-block) * 2)`

  </template>
  <template #body:padding-block.description>
    Vertical padding of the card and between the card header or footer and the body.
  </template>

  <template #body:padding-inline.values>

  1-2 `<length>` or `<percentage>`

  </template>
  <template #body:padding-inline.default>

  `var(--r-common-box-padding-inline)`

  </template>
  <template #body:padding-inline.description>
    Horizontal padding of the card.
  </template>
</RTable>
</RSpace>
