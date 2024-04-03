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
    <RButton type="comment">Comment</RButton>
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
  <RButton type="comment">Comment</RButton>
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
    <RButton type="comment" filled>Comment</RButton>
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
  <RButton type="comment" filled>Comment</RButton>
</RSpace>

See also [GraphicsConfig](/components/graphics#configuration).

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

### State

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
    <RButton type="warning" loading>Give up domination</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RButton disabled>Train AlphaGo</RButton>
  <RButton type="primary" filled disabled>Let there be light</RButton>
  <RButton type="warning" loading>Give up domination</RButton>
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

<RPropsTable>

  <RProp name="block">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the button is displayed as block.

  </RProp>

  <RProp name="filled">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the button is filled with its color.

  </RProp>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="html-type">

  <template #type>

  `'submit' | 'reset' | 'button'`

  </template>

  [The `type` attribute of `HTMLButtonElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement#htmlbuttonelement.type).

  </RProp>

  <RProp name="loading">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the button is loading. It will be non-interactive in loading state.

  </RProp>

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `['hover', 'focus', 'active']`

  </template>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </RProp>

  <RProp name="rounded">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the button is round.

  </RProp>

  <RProp name="size">

  <template #type>

  `string`, but usually `'small' | 'large'`

  </template>

  Button size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  </RProp>

  <RProp name="tag">

  <template #type>

  `string`, but usually `'button' | 'a'`

  </template>

  <template #default-value>

  `'button'`

  </template>

  HTML tag for rendering the button.

  </RProp>

  <RProp name="type">

  <template #type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>

  Button style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  See also [Color Styles](/guide/theme#color-styles).

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="will-draw">

  Associating effects before graphics drawing.

  See [Reactions](/guide/theme#reactions).

  </REvent>

</REventsTable>

### Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the button.
    </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-button-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-element-color)` for `default` `type`, other theme colors for other `type`

  </template>

  Color of the button text.

  </RStyle>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-button-color)`

  </template>

  Color of the button border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused or active, `1px` else

  </template>

  Width of the button border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `8px` when hovered, `none` else

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the button border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </RStyle>

</RStylesTable>
