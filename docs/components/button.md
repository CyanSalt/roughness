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

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['block', 'filled', 'html-type', 'rounded', 'tag', 'type']"
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

  <template #body:html-type.type>

  [`'submit' | 'reset' | 'button'`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement#htmlbuttonelement.type)

  </template>
  <template #body:html-type.description>

  The `type` attribute of `HTMLButtonElement`.

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

  `string`, but usually `'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'`

  </template>
  <template #body:type.default>

  `'default'`

  </template>
  <template #body:type.description>
    Button style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>
</RTable>

### Styles

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

  `<integer>`

  </template>
  <template #body:border-width.default>

  `2` when focused or active, `1` else

  </template>
  <template #body:border-width.description>
    Size of the button border.
  </template>

  <template #body:border-dash.values>

  `<integer> +` or `none`

  </template>
  <template #body:border-dash.default>

  `8` when hovered, `none` else

  </template>
  <template #body:border-dash.description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the button border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  </template>
</RTable>
