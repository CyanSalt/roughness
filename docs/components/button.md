<script lang="ts" setup>
import { RButton, RDetails, RSpace, RTable } from 'roughness'
</script>

# Button

My first name is Belly.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton>Normal</RButton>
    <RButton type="primary">Primary</RButton>
    <RButton type="info">Info</RButton>
    <RButton type="success">Success</RButton>
    <RButton type="warning">Warning</RButton>
    <RButton type="error">Error</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RButton>Normal</RButton>
  <RButton type="primary">Primary</RButton>
  <RButton type="info">Info</RButton>
  <RButton type="success">Success</RButton>
  <RButton type="warning">Warning</RButton>
  <RButton type="error">Error</RButton>
</RSpace>

### Size

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RButton size="small">Small</RButton>
    <RButton>Medium</RButton>
    <RButton size="large">Large</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace align="center">
  <RButton size="small">Small</RButton>
  <RButton>Medium</RButton>
  <RButton size="large">Large</RButton>
</RSpace>

### Filled

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton filled>Normal</RButton>
    <RButton type="primary" filled>Primary</RButton>
    <RButton type="info" filled>Info</RButton>
    <RButton type="success" filled>Success</RButton>
    <RButton type="warning" filled>Warning</RButton>
    <RButton type="error" filled>Error</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RButton filled>Normal</RButton>
  <RButton type="primary" filled>Primary</RButton>
  <RButton type="info" filled>Info</RButton>
  <RButton type="success" filled>Success</RButton>
  <RButton type="warning" filled>Warning</RButton>
  <RButton type="error" filled>Error</RButton>
</RSpace>

Also see [GraphicsConfig](/components/graphics#configuration).

### Rounded

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton rounded>Enter the Pipe</RButton>
    <RButton type="error" filled rounded>Eat the Mushroom</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RButton rounded>Enter the Pipe</RButton>
  <RButton type="error" filled rounded>Eat the Mushroom</RButton>
</RSpace>

### Disabled

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton disabled>Train AlphaGo</RButton>
    <RButton type="primary" filled disabled>Let there be light</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RButton disabled>Train AlphaGo</RButton>
  <RButton type="primary" filled disabled>Let there be light</RButton>
</RSpace>

### Block

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RButton block>Switch Account</RButton>
    <RButton type="error" block>Log out of Chaos</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RButton block>Switch Account</RButton>
  <RButton type="error" block>Log out of Chaos</RButton>
</RSpace>

### Tag

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton tag="a" type="primary" filled>Remote Bomb</RButton>
    <RButton tag="a" type="error">Magnesis</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RButton tag="a" type="primary" filled>Remote Bomb</RButton>
  <RButton tag="a" type="error">Magnesis</RButton>
</RSpace>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['block', 'filled', 'graphics-options', 'html-type', 'reactions', 'rounded', 'size', 'tag', 'type']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:block.type>

  `boolean`

  </template>
  <template #body:block.default>

  `false`

  </template>
  <template #body:block.description>
    Whether the button is displayed as block.
  </template>

  <template #body:filled.type>

  `boolean`

  </template>
  <template #body:filled.default>

  `false`

  </template>
  <template #body:filled.description>
    Whether the button is filled with its color.
  </template>

  <template #body:graphics-options.type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options.description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:html-type.type>

  `'submit' | 'reset' | 'button'`

  </template>
  <template #body:html-type.description>

  [The `type` attribute of `HTMLButtonElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement#htmlbuttonelement.type).

  </template>

  <template #body:reactions.type>

  `string[]`

  </template>
  <template #body:reactions.default>

  `['hover', 'focus', 'active']`

  </template>
  <template #body:reactions.description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>

  <template #body:rounded.type>

  `boolean`

  </template>
  <template #body:rounded.default>

  `false`

  </template>
  <template #body:rounded.description>
    Whether the button is round.
  </template>

  <template #body:size.type>

  `string`, but usually `'small' | 'medium' | 'large'`

  </template>
  <template #body:size.default>

  `'medium'`

  </template>
  <template #body:size.description>
    Button size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>

  <template #body:tag.type>

  `string`, but usually `'button' | 'a'`

  </template>
  <template #body:tag.default>

  `'button'`

  </template>
  <template #body:tag.description>
    HTML tag for rendering the button.
  </template>

  <template #body:type.type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error'`

  </template>
  <template #body:type.description>

  Button style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  Also see [Color Styles](/guide/theme#color-styles).

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'border-color', 'border-width', 'border-dash']"
>
  <template #body:*.name="{ row }">--r-button-{{ row }}</template>

  <template #body:color.values>

  `<color>`

  </template>
  <template #body:color.default>

  `var(--r-common-text-color)` for `default` `type`, other theme colors for other `type`

  </template>
  <template #body:color.description>
    Color of the button text.
  </template>

  <template #body:border-color.values>

  `<color>`

  </template>
  <template #body:border-color.default>

  `var(--r-button-color)`

  </template>
  <template #body:border-color.description>
    Color of the button border.
  </template>

  <template #body:border-width.values>

  `<length>`

  </template>
  <template #body:border-width.default>

  `2px` when focused or active, `1px` else

  </template>
  <template #body:border-width.description>
    Width of the button border.
  </template>

  <template #body:border-dash.values>

  `<length> +` or `none`

  </template>
  <template #body:border-dash.default>

  `8px` when hovered, `none` else

  </template>
  <template #body:border-dash.description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the button border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </template>
</RTable>
</RSpace>
