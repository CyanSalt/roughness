<script lang="ts" setup>
import { RButton, RDetails, RSpace, RSwitch, RTable, RText, useDark } from 'roughness'
import { ref } from 'vue'

const dark = useDark()
const flag = ref(false)
</script>

# Theme

Roughness has a built-in set of colors and supports dark and light themes.

## Colors

In dark and light mode, in addition to the foreground and background colors, the theme colors are also different. The built-in color themes use [One Light](https://github.com/atom/atom/tree/master/packages/one-light-syntax) and [One Dark](https://github.com/atom/atom/tree/master/packages/one-dark-syntax) color schemes.

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
    <RButton type="comment" filled>Comment</RButton>
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

<style>
.my-details:hover {
  --r-details-summary-color: var(--r-common-error-color);
}
</style>
```

<RDetails :reactions="['hover']" class="my-details">
  <template #summary>Beyond 99% sweat</template>
  Good luck.
</RDetails>

<style>
.my-details:hover {
  --r-details-summary-color: var(--r-common-error-color);
}
</style>

The optional values for `reactions` include `hover`, `focus`, `focus-within`, `active` and `dark`. You can also use the `will-draw` event if you wish to associate graphics drawing with custom effects.

```vue
<script lang="ts" setup>
import { RButton RSpace, RSwitch } from 'roughness'
import { ref } from 'vue'

const flag = ref(false)
</script>

<template>
  <RSpace vertical align="start">
    <RSwitch v-model="flag">Twinkle</RSwitch>
    <RButton type="warning" @will-draw="() => flag">Little Star</RButton>
  </RSpace>
</template>
```

<RSpace vertical align="start">
  <RSwitch v-model="flag">Twinkle</RSwitch>
  <RButton type="warning" @will-draw="() => flag">Little Star</RButton>
</RSpace>

### Styles

All elements with `r-*` classes support the following style variables:

<RStylesTable>

  <template #name="{ value }">--r-element-{{ value }}</template>

  <RStyle name="font-family">

  <template #values>

  `<family-name> +`

  </template>

  <template #default-value>

  `var(--r-common-font-family)`

  </template>

  Font family of the element.

  </RStyle>

  <RStyle name="font-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-font-size)`

  </template>

  Font size of the element.

  </RStyle>

  <RStyle name="line-height">

  <template #values>

  `<number>` or `<length>` or `<percentage>` or `normal`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Line height of the element.

  </RStyle>

</RStylesTable>

These are only valid for Roughness elements. If you want it to take effect for the entire page, you can define the following styles:

```css
body {
  font-family: var(--r-element-font-family);
  font-size: var(--r-element-font-size);
  line-height: var(--r-element-line-height);
}
```

Common style properties are declared under the root node. Changing them will affect all components.

<RStylesTable>

  <template #name="{ value }">--r-common-{{ value }}</template>

  <template #values>

  `<color>`

  </template>

  <RStyle name="font-family">

  <template #values>

  `<family-name> +`

  </template>

  <template #default-value>

  `'CabinSketch', cursive`

  </template>

  Font family of components.

  </RStyle>

  <RStyle name="font-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `16px`

  </template>

  Font size of components.

  </RStyle>

  <RStyle name="small-font-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-common-font-size) - 4px)`

  </template>

  Font size of components with `size="small"`.

  Some browsers (such as Chrome on PC devices) have a minimum font size (`12px`) by default. In these environments, the font size cannot be lowered below that value.

  </RStyle>

  <RStyle name="large-font-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-common-font-size) + 4px)`

  </template>

  Font size of components with `size="large"`.

  </RStyle>

  <RStyle name="line-height">

  <template #values>

  `<number>` or `<length>` or `<percentage>` or `normal`

  </template>

  <template #default-value>

  `calc(1em + 8px)`

  </template>

  Line height of components.

  </RStyle>

  <RStyle name="box-padding-block">

  <template #values>

  1-2 `<length>` or `<percentage>`

  </template>

  <template #default-value>

  `0.5em`

  </template>

  Vertical padding of components with rectangular boxes. Such as Button, or cells of Table.

  </RStyle>

  <RStyle name="box-padding-inline">

  <template #values>

  1-2 `<length>` or `<percentage>`

  </template>

  <template #default-value>

  `calc(1em + 4px)`

  </template>

  Horizontal padding of components with rectangular boxes. Such as Button, or cells of Table.

  </RStyle>

  <RStyle name="overlay-z-index">

  <template #values>

  `<integer>`

  </template>

  <template #default-value>

  `2`

  </template>

  Z-order of components at the top of the page. Such as Propover, or dropdown of Select.

  </RStyle>

</RStylesTable>

The following properties (of colors) change with dark/light theme changes: {#color-styles}

<RStylesTable>

  <template #name="{ value }">--r-common-{{ value }}</template>

  <template #values>

  `<color>`

  </template>

  <RStyle name="text-color">

  <template #default-value>

  `#abb2bf` in the dark mode, `#383a42` else

  </template>

  Color of foreground content such as text and borders. This is only valid for Roughness components. If you want it to take effect for the entire page, you can define the following styles:

  ```css
  body {
    color: var(--r-common-text-color);
  }
  ```

  </RStyle>

  <RStyle name="background-color">

  <template #default-value>

  `#282c34` in the dark mode, `#fafafa` else

  </template>

  Color of background content such as backdrop and text stroke. This is only valid for Roughness components. If you want it to take effect for the entire page, you can define the following styles:

  ```css
  body {
    background-color: var(--r-common-background-color);
  }
  ```

  </RStyle>

  <RStyle name="primary-color">

  <template #default-value>

  `#61aff0` in the dark mode, `#4078f2` else

  </template>

  Color of the key content on the page. Components with `type="primary"` use this color.

  </RStyle>

  <RStyle name="info-color">

  <template #default-value>

  `#56b6c2` in the dark mode, `#0184bc` else

  </template>

  Color of auxiliary information on the page. Components with `type="info"` use this color.

  </RStyle>

  <RStyle name="success-color">

  <template #default-value>

  `#98c379` in the dark mode, `#50a14f` else

  </template>

  Color of success message. Components with `type="success"` use this color.

  </RStyle>

  <RStyle name="warning-color">

  <template #default-value>

  `#e5c07b` in the dark mode, `#c18401` else

  </template>

  Color of warning message. Components with `type="warning"` use this color.

  </RStyle>

  <RStyle name="error-color">

  <template #default-value>

  `#be5046` in the dark mode, `#ca1243` else

  </template>

  Color of error message. Components with `type="error"` use this color.

  </RStyle>

  <RStyle name="comment-color">

  <template #default-value>

  `#abb2bf80` in the dark mode, `#383a4280` else

  </template>

  Color of comment message. Components with `type="comment"` use this color.

  </RStyle>

</RStylesTable>

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

## Conflicts

Roughness uses [CSS layering](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), which means you can manage style priority with `@layer` rules before importing styles.

```css
@layer my-low-level-layer, roughness, my-high-level-layer;
```
