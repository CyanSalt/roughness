<script lang="ts" setup>
import { RButton, RDetails, RSpace, RTable, RText, RToast, useToast } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function toggle() {
  open.value = !open.value
}

const toast = useToast()

function add() {
  toast('Yummy!', {
    type: ['primary', 'info', 'success', 'warning', 'error', 'comment'][Math.floor(Math.random() * 6)],
  })
}
</script>

# Toast

It is not bread. It is toast.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RToast } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <RButton @click="toggle">Toggle</RButton>
  <RToast v-model:open="open">Clunk!</RToast>
</template>
```

</RDetails>

<RButton @click="toggle">Toggle</RButton>
<RToast v-model:open="open">Clunk!</RToast>

### Composition

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RToastProvider } from 'roughness'
</script>

<template>
  <RToastProvider>
    <App />
  </RToastProvider>
</template>
```

```vue
<script lang="ts" setup>
import { useToast } from 'roughness'

const toast = useToast()

function add() {
  toast('Yummy!', {
    type: ['primary', 'info', 'success', 'warning', 'error', 'comment'][Math.floor(Math.random() * 6)],
  })
}
</script>

<template>
  <RButton @click="add">Add</RButton>
</template>
```

</RDetails>

<RButton @click="add">Add</RButton>

## Usage

### Toast Props

<RPropsTable>

  <RProp name="duration">

  <template #type>

  `number`

  </template>

  <template #default-value>

  `3000`

  </template>

  Duration of each toast display.

  </RProp>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="open">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to display the toast.

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

  Toast size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  </RProp>

  <RProp name="type">

  <template #type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>

  Toast style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  See also [Color Styles](/guide/theme#color-styles).

  </RProp>

</RPropsTable>

### Toast Events

<REventsTable>

  <REvent name="update:open">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when visibility of the toast is changed.

  </REvent>

</REventsTable>

### Toast Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the toast.
  </RSlot>

</RSlotsTable>

### Toast Styles

<RStylesTable>

  <template #name="{ value }">--r-toast-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-element-color)` for `default` `type`, other theme colors for other `type`

  </template>

  Color of the toast text and border.

  </RStyle>

</RStylesTable>

### ToastProvider Styles

<RStylesTable>

  <template #name="{ value }">--r-toast-provider-{{ value }}</template>

  <RStyle name="base-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `calc(var(--r-common-line-height) + var(--r-common-box-padding-block) * 2)`

  </template>

  Value to treat the size of a toast as when calculating the offset.

  </RStyle>

  <RStyle name="gap-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `12px`

  </template>

  Size of the gap between toasts as when calculating the offset.

  </RStyle>

</RStylesTable>

### Compositions

```ts
import type { ComponentProps, ComponentRenderable } from 'roughness'

export declare function useToast(): (
  renderable: ComponentRenderable<typeof RToast>,
  props?: ComponentProps<typeof RToast>,
) => void
```
