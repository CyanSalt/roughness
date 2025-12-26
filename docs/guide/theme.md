<script lang="ts" setup>
import { RButton, RSpace, RSwitch, useDark } from 'roughness'
import { ref } from 'vue'

const dark = useDark()
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
    <RButton color="primary" filled>Primary</RButton>
    <RButton color="info" filled>Info</RButton>
    <RButton color="success" filled>Success</RButton>
    <RButton color="warning" filled>Warning</RButton>
    <RButton color="error" filled>Error</RButton>
    <RButton color="comment" filled>Comment</RButton>
  </RSpace>
</RSpace>

## Fonts

You can load one or more fonts of your choice by any means and specify the font name(s) with the custom property.

```css
:root {
  --r-common-font-family: cursive;
  --r-common-mono-font-family: monospace;
}
```

It is recommended to use [Annotation Mono](https://qwerasd205.github.io/AnnotationMono/) as a monospaced font.

You can use [小赖字体 / 小賴字體 / シャオライ / Xiaolai Font](https://github.com/lxgw/kose-font) for CJK (Chinese, Japanese and Korean) characters.

For important elements such as titles, you can use [Cabin Sketch](https://fonts.google.com/specimen/Cabin+Sketch).

::: warning

Due to the character set, CJK fonts are usually very large. Please learn about [中文网字计划](https://chinese-font.netlify.app/zh-cn/).

:::

```html
<link rel="stylesheet" href="https://chinese-fonts-cdn.deno.dev/packages/xiaolai/dist/Xiaolai/result.css" />

<style>
:root {
  --r-common-font-family: 'Xiaolai SC', cursive;
}
</style>
```

::: tip

Always add `cursive` or `monospace` or other fallback font at the end of the list, which could be useful for non-Latin (such as CJK) environments, for example browser translation.

:::

## Customizing Theme

Most components support specific CSS custom properties. You can find them in the documentation related to components, such as [Button Styles](/components/button#styles).

Generally, components use CSS properties with names in the format `--R-*` internally, but you should avoid modifying these properties; instead, these properties can be controlled through properties with the same name in lowercase:

```css
/* Render thicker borders for all buttons */
:root {
  --r-button-border-width: 2px;
}
```

### Styles

All elements with `r-*` classes support the following style variables:

<RStylesTable>

  <RStyle name="--r-element-font-family">

  <template #type>

  `<family-name>+`

  </template>

  <template #default-value>

  `var(--r-common-font-family)`

  </template>

  Font family of the element.

  </RStyle>

  <RStyle name="--r-element-font-size">

  <template #type>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-font-size)`

  </template>

  Font size of the element.

  </RStyle>

  <RStyle name="--r-element-line-height">

  <template #type>

  `<number> | <length> | <percentage> | normal`

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

The following properties (of colors) are effective for the **text content**:

<RStylesTable>

  <RStyle name="--r-element-color">

  <template #type>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-color)`

  </template>

  Color of the element. Usually it will be changed by the `type` property of components.

  See also [Color Styles](#color-styles).

  </RStyle>

</RStylesTable>

Common style properties are declared under the root node. Changing them will affect all components.

<RStylesTable>

  <RStyle name="--r-common-font-family">

  <template #type>

  `<family-name>+`

  </template>

  <template #default-value>

  `cursive`

  </template>

  Font family of components.

  </RStyle>

  <RStyle name="--r-common-font-size">

  <template #type>

  `<length>`

  </template>

  <template #default-value>

  `16px`

  </template>

  Font size of components.

  </RStyle>

  <RStyle name="--r-common-small-font-size">

  <template #type>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-common-font-size) - 4px)`

  </template>

  Font size of components with `size="small"`.

  Some browsers (such as Chrome on PC devices) have a minimum font size (`12px`) by default. In these environments, the font size cannot be lowered below that value.

  </RStyle>

  <RStyle name="--r-common-large-font-size">

  <template #type>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-common-font-size) + 4px)`

  </template>

  Font size of components with `size="large"`.

  </RStyle>

  <RStyle name="--r-common-line-height">

  <template #type>

  `<number> | <length> | <percentage> | normal`

  </template>

  <template #default-value>

  `calc(1em + 8px)`

  </template>

  Line height of components.

  </RStyle>

  <RStyle name="--r-common-stroke-width">

  <template #type>

  `<length>`

  </template>

  <template #default-value>

  `1px`

  </template>

  Line width of stroked components.

  </RStyle>

  <RStyle name="--r-common-emphasized-stroke-width">

  <template #type>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-common-stroke-width) + 1px)`

  </template>

  Line width of stroked components when active.

  </RStyle>

  <RStyle name="--r-common-text-stroke-width">

  <template #type>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-common-stroke-width) + 1px)`

  </template>

  Line width of stroked components when displayed as text.

  </RStyle>

  <RStyle name="--r-common-box-padding-block">

  <template #type>

  `<length-percentage>`

  </template>

  <template #default-value>

  `0.5em`

  </template>

  Vertical padding of components with rectangular boxes. Such as Button, or cells of Table.

  </RStyle>

  <RStyle name="--r-common-box-padding-inline">

  <template #type>

  `<length-percentage>`

  </template>

  <template #default-value>

  `calc(1em + 4px)`

  </template>

  Horizontal padding of components with rectangular boxes. Such as Button, or cells of Table.

  </RStyle>

  <RStyle name="--r-common-overlay-z-index">

  <template #type>

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

  <template #type>

  `<color>`

  </template>

  <RStyle name="--r-common-color">

  <template #default-value>

  `#abb2bf` in the dark mode, `#383a42` else

  </template>

  Color of foreground content such as text and borders. This is only valid for Roughness components. If you want it to take effect for the entire page, you can define the following styles:

  ```css
  body {
    color: var(--r-common-color);
  }
  ```

  </RStyle>

  <RStyle name="--r-common-background-color">

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

  <RStyle name="--r-common-placeholder-color">

  <template #default-value>

  `#abb2bf60` in the dark mode, `#383a4240` else

  </template>

  Color of the placeholder of form components, such as `RInput` or `RSelect`.

  </RStyle>

  <RStyle name="--r-common-primary-color">

  <template #default-value>

  `#61aff0` in the dark mode, `#4078f2` else

  </template>

  Color of the key content on the page. Components with `color="primary"` use this color.

  </RStyle>

  <RStyle name="--r-common-info-color">

  <template #default-value>

  `#56b6c2` in the dark mode, `#0184bc` else

  </template>

  Color of auxiliary information on the page. Components with `color="info"` use this color.

  </RStyle>

  <RStyle name="--r-common-success-color">

  <template #default-value>

  `#98c379` in the dark mode, `#50a14f` else

  </template>

  Color of success message. Components with `color="success"` use this color.

  </RStyle>

  <RStyle name="--r-common-warning-color">

  <template #default-value>

  `#e5c07b` in the dark mode, `#c18401` else

  </template>

  Color of warning message. Components with `color="warning"` use this color.

  </RStyle>

  <RStyle name="--r-common-error-color">

  <template #default-value>

  `#be5046` in the dark mode, `#ca1243` else

  </template>

  Color of error message. Components with `color="error"` use this color.

  </RStyle>

  <RStyle name="--r-common-comment-color">

  <template #default-value>

  `#abb2bf80` in the dark mode, `#383a4280` else

  </template>

  Color of comment message. Components with `color="comment"` use this color.

  </RStyle>

  <RStyle name="--r-common-stroke-text-shadow">

  <template #default-value>

  `var(--r-common-background-color)` with size of `3px` in every direction

  </template>

  Stroke style of text when the backdrop is in fill mode.

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
