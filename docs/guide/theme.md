<script lang="ts" setup>
import { RButton, RDetails, RSpace, RSwitch, RTable, RText, useDark } from 'roughness'

const dark = useDark()
</script>

# Theme

Roughness has a built-in set of colors and supports dark and light themes.

## Colors

In dark and light mode, in addition to the foreground and background colors, the theme colors are also different. In light mode, the colors are rendered in a *pen-style*; in dark mode, they are rendered in a *chalk-style*.

<RSpace vertical>
  <RSpace>
    <RSwitch v-model="dark">Enable dark mode</RSwitch>
  </RSpace>
  <RSpace>
    <RButton filled>Normal</RButton>
    <RButton type="primary" filled>Primary</RButton>
    <RButton type="info" filled>Info</RButton>
    <RButton type="success" filled>Success</RButton>
    <RButton type="warning" filled>Warning</RButton>
    <RButton type="error" filled>Error</RButton>
  </RSpace>
</RSpace>

## Customizing Theme

Most components support specific CSS custom properties. You can find them in the documentation related to components, such as [Button Styles](/components/button#styles).

Obviously, you can also customize these CSS properties. For example:

```css
/* Render thicker borders for all buttons */
.r-button {
  --r-button-border-width: 2px;
}
```

Note that due to the limitations of HTML itself, modifying CSS dynamically cannot trigger Rough.js to redraw the background graphics in real time. If you wish to associate specific actions with the drawing of the graphics, you may use the `reactions` property: {#reactions}

```vue
<template>
  <RDetails :reactions="['hover']" class="my-details">
    <template #summary>Beyond 99% sweat</template>
    Good luck.
  </RDetails>
</template>

<style scoped>
.my-details:hover {
  --r-details-summary-color: var(--r-common-error-color);
}
</style>
```

<RDetails :reactions="['hover']" class="my-details">
  <template #summary>Beyond 99% sweat</template>
  Good luck.
</RDetails>

<style scoped>
.my-details:hover {
  --r-details-summary-color: var(--r-common-error-color);
}
</style>

### Styles

Common style properties are declared under the root node. Changing them will affect all components.

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['font-family', 'font-size', 'small-font-size', 'large-font-size', 'line-height', 'box-padding-block', 'box-padding-inline']"
>
  <template #body:*:name="{ row }">--r-common-{{ row }}</template>

  <template #body:font-family:values>

  `<family-name> +`

  </template>
  <template #body:font-family:default>

  `'CabinSketch'`

  </template>
  <template #body:font-family:description>

  Font family of components. This is only valid for Roughness components. If you want it to take effect for the entire page, you can define the following styles:

  ```css
  body {
    font-family: var(--r-common-font-family);
  }
  ```

  </template>

  <template #body:font-size:values>

  `<length>`

  </template>
  <template #body:font-size:default>

  `16px`

  </template>
  <template #body:font-size:description>
    Font size of components.
  </template>

  <template #body:small-font-size:values>

  `<length>`

  </template>
  <template #body:small-font-size:default>

  `calc(var(--r-common-font-size) - 4px)`

  </template>
  <template #body:small-font-size:description>

  Font size of components with `size="small"`.

  Some browsers (such as Chrome on PC devices) have a minimum font size (`12px`) by default. In these environments, the font size cannot be lowered below that value.

  </template>

  <template #body:large-font-size:values>

  `<length>`

  </template>
  <template #body:large-font-size:default>

  `calc(var(--r-common-font-size) + 4px)`

  </template>
  <template #body:large-font-size:description>

  Font size of components with `size="large"`.

  </template>

  <template #body:line-height:values>

  `<number>` or `<length>` or `<percentage>` or `normal`

  </template>
  <template #body:line-height:default>

  `calc(1em + 8px)`

  </template>
  <template #body:line-height:description>
    Line height of components.
  </template>

  <template #body:box-padding-block:values>

  1-2 `<length>` or `<percentage>`

  </template>
  <template #body:box-padding-block:default>

  `0.5em`

  </template>
  <template #body:box-padding-block:description>
    Vertical padding of components with rectangular boxes. Such as Button, or cells of Table.
  </template>

  <template #body:box-padding-inline:values>

  1-2 `<length>` or `<percentage>`

  </template>
  <template #body:box-padding-inline:default>

  `calc(1em + 4px)`

  </template>
  <template #body:box-padding-inline:description>
    Horizontal padding of components with rectangular boxes. Such as Button, or cells of Table.
  </template>
</RTable>
</RSpace>

The following properties (of colors) change with dark/light theme changes: {#color-styles}

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['text-color', 'background-color', 'primary-color', 'info-color', 'success-color', 'warning-color', 'error-color']"
>
  <template #body:*:name="{ row }">--r-common-{{ row }}</template>

  <template #body:*:values>

  `<color>`

  </template>

  <template #body:text-color:default>

  `#f4f4f0` in the dark mode, `#44413c` else

  </template>
  <template #body:text-color:description>

  Color of foreground content such as text and borders. This is only valid for Roughness components. If you want it to take effect for the entire page, you can define the following styles:

  ```css
  body {
    color: var(--r-common-text-color);
  }
  ```

  </template>

  <template #body:background-color:default>

  `#31343a` in the dark mode, `#ffffff` else

  </template>
  <template #body:background-color:description>

  Color of background content such as backdrop and text stroke. This is only valid for Roughness components. If you want it to take effect for the entire page, you can define the following styles:

  ```css
  body {
    background-color: var(--r-common-text-color);
  }
  ```

  </template>

  <template #body:primary-color:default>

  `#94c0cc` in the dark mode, `#0247fe` else

  </template>
  <template #body:primary-color:description>

  Color of the key content on the page. Components with `type="primary"` use this color.

  </template>

  <template #body:info-color:default>

  `#a6aebb` in the dark mode, `#2b4057` else

  </template>
  <template #body:info-color:description>

  Color of auxiliary information on the page. Components with `type="info"` use this color.

  </template>

  <template #body:success-color:default>

  `#bcdf8a` in the dark mode, `#11887b` else

  </template>
  <template #body:success-color:description>

  Color of success message. Components with `type="success"` use this color.

  </template>

  <template #body:warning-color:default>

  `#dfc281` in the dark mode, `#9d6016` else

  </template>
  <template #body:warning-color:description>

  Color of warning message. Components with `type="warning"` use this color.

  </template>

  <template #body:error-color:default>

  `#ed7777` in the dark mode, `#ac3235` else

  </template>
  <template #body:error-color:description>

  Color of error message. Components with `type="error"` use this color.

  </template>
</RTable>
</RSpace>

## Dark Mode

When the document's root element (usually `html`) has a `class` of `dark`, components will automatically switch to dark mode.

We also provide `useDark` function to control dark mode through script:

```js
import { useDark } from 'roughness'

const dark = useDark()

// Toggle dark mode
dark.value = !dark.value
```

## Theming Custom Components

Sometimes you may want customize styles with the theme colors of Roughness components. You can use the Roughness common style properties via CSS `var()`:

```css
.my-element {
  color: var(--r-common-primary-color);
}
```

For situations where CSS cannot be used, such as canvas, you can use `useColors` to get the colors in current common properties:

```js
import { useColors } from 'roughness'

const colors = useColors()

const context = canvas.getContext('2d')
context.stroke = colors.value.primaryColor
```

Alternatively, you can directly use colors from light or dark theme:

```js
import { darkColors, lightColors } from 'roughness'

const context = canvas.getContext('2d')
context.stroke = mix(lightColors.primaryColor, darkColors.primaryColor, 0.5)
```
