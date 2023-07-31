<script lang="ts" setup>
import gsap from 'gsap'
import { RAlert, RDetails, RProgress, RSlider, RSpace, RTable, RText } from 'roughness'
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

<RAlert type="comment">

\* You need to install `gsap` yourself.

</RAlert>

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

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'min', 'max', 'value', 'reactions', 'size', 'type']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:max:type>

  `<number>`

  </template>
  <template #body:max:default>

  `1`

  </template>
  <template #body:max:description>
    The upper numeric bound of the range.
  </template>

  <template #body:min:type>

  `<number>`

  </template>
  <template #body:min:default>

  `0`

  </template>
  <template #body:min:description>
    The lower numeric bound of the range.
  </template>

  <template #body:value:type>

  `<number>`

  </template>
  <template #body:value:default>
    <RText type="error">Required</RText>
  </template>
  <template #body:value:description>
    The current numeric progress value.
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
    Progress size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>

  <template #body:type:type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>
  <template #body:type:description>

  Progress style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  See also [Color Styles](/guide/theme#color-styles).

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'block-size', 'inline-size', 'border-color', 'border-width', 'border-dash']"
>
  <template #body:*:name="{ row }">--r-progress-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-element-color)` for `default` `type`, other theme colors for other `type`

  </template>
  <template #body:color:description>
    Color of the progress bar and its content.
  </template>

  <template #body:block-size:values>

  `<length>`

  </template>
  <template #body:block-size:default>

  `var(--r-common-line-height)`

  </template>
  <template #body:block-size:description>
    Height of the progress bar.
  </template>

  <template #body:inline-size:values>

  `<length>`

  </template>
  <template #body:inline-size:default>

  `calc(var(--r-common-line-height) * 10)`

  </template>
  <template #body:inline-size:description>
    Width of the progress bar.
  </template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-button-color)`

  </template>
  <template #body:border-color:description>
    Color of the progress bar border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `1px`

  </template>
  <template #body:border-width:description>
    Width of the progress bar border.
  </template>

  <template #body:border-dash:values>

  `<length> +` or `none`

  </template>
  <template #body:border-dash:default>

  `none`

  </template>
  <template #body:border-dash:description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the progress bar border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </template>
</RTable>
</RSpace>
