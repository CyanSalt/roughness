<script lang="ts" setup>
import gsap from 'gsap'
import { RCard, RDetails, RProgress, RSlider, RSpace, RTable, RText } from 'roughness'
import { reactive, ref, watch } from 'vue'

let value = ref(0)
let tweened = reactive({ number: 0 })

watch(value, n => {
  gsap.to(tweened, { duration: 1, number: n / 100 })
})
</script>

# Progress

Deadline tomorrow.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RProgress, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RProgress :value="0.1" />
    <RProgress :value="0.4" type="primary">Primary</RProgress>
    <RProgress :value="0.1" type="info">Info</RProgress>
    <RProgress :value="0.5" type="success">Success</RProgress>
    <RProgress :value="0.9" type="warning">Warning</RProgress>
    <RProgress :value="0.2" type="error">Error</RProgress>
    <RProgress :value="0.6" type="comment">Comment</RProgress>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RProgress :value="0.1" />
  <RProgress :value="0.4" type="primary">Primary</RProgress>
  <RProgress :value="0.1" type="info">Info</RProgress>
  <RProgress :value="0.5" type="success">Success</RProgress>
  <RProgress :value="0.9" type="warning">Warning</RProgress>
  <RProgress :value="0.2" type="error">Error</RProgress>
  <RProgress :value="0.6" type="comment">Comment</RProgress>
</RSpace>

### Animation

<RCard type="comment">

You need to install [`gsap`](https://www.npmjs.com/package/gsap) yourself.

</RCard>

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import gsap from 'gsap'
import { RProgress, RSlider, RSpace } from 'roughness'
import { reactive, ref, watch } from 'vue'

let value = ref(0)
let tweened = reactive({ number: 0 })

watch(value, n => {
  gsap.to(tweened, { duration: 1, number: n / 100 })
})
</script>

<template>
  <RSpace vertical>
    <RProgress :value="tweened.number" />
    <RSlider v-model="value" />
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RProgress :value="tweened.number" />
  <RSlider v-model="value" />
</RSpace>

### Props

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="max">

  <template #type>

  `<number>`

  </template>

  <template #default-value>

  `1`

  </template>

  Upper numeric bound of the range.

  </RProp>

  <RProp name="min">

  <template #type>

  `<number>`

  </template>

  <template #default-value>

  `0`

  </template>

  Lower numeric bound of the range.

  </RProp>

  <RProp name="value">

  <template #type>

  `<number>`

  </template>

  <template #default-value>
    </template>

  Current numeric progress value.

  </RProp>

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `[]`

  </template>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </RProp>

  <RProp name="size">

  <template #type>

  `string`, but usually `'small' | 'large'`

  </template>

  Progress size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  </RProp>

  <RProp name="type">

  <template #type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>

  Progress style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

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

### Styles

<RStylesTable>

  <template #name="{ value }">--r-progress-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-element-color)` for `default` `type`, other theme colors for other `type`

  </template>

  Color of the progress bar and its content.

  </RStyle>

  <RStyle name="block-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Height of the progress bar.

  </RStyle>

  <RStyle name="inline-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-common-line-height) * 10)`

  </template>

  Width of the progress bar.

  </RStyle>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-button-color)`

  </template>

  Color of the progress bar border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `1px`

  </template>

  Width of the progress bar border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `none`

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the progress bar border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </RStyle>

</RStylesTable>
