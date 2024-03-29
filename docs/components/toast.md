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

<RSpace>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['duration', 'graphics-options', 'open', 'reactions', 'size', 'type']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:duration:type>

  `number`

  </template>
  <template #body:duration:default>

  `3000`

  </template>
  <template #body:duration:description>
    Duration of each toast display.
  </template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:open:type>

  `boolean`

  </template>
  <template #body:open:default>

  `true`

  </template>
  <template #body:open:description>
    Whether to display the toast.
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
    Toast size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>

  <template #body:type:type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>
  <template #body:type:description>

  Toast style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  See also [Color Styles](/guide/theme#color-styles).

  </template>
</RTable>
</RSpace>

### Toast Events

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:open']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:open:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:open:description>
    Callback function triggered when visibility of the toast is changed.
  </template>
</RTable>
</RSpace>

### Toast Slots

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:description>
    Content of the toast.
  </template>
</RTable>
</RSpace>

### Toast Styles

<RSpace>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color']"
>
  <template #body:*:name="{ row }">--r-toast-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-element-color)` for `default` `type`, other theme colors for other `type`

  </template>
  <template #body:color:description>
    Color of the toast text and border.
  </template>
</RTable>
</RSpace>

### ToastProvider Styles

<RSpace>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['base-size', 'gap-size']"
>
  <template #body:*:name="{ row }">--r-toast-provider-{{ row }}</template>

  <template #body:base-size.values>

  `<length>`

  </template>
  <template #body:base-size.default>

  `calc(var(--r-common-line-height) + var(--r-common-box-padding-block) * 2)`

  </template>
  <template #body:base-size:description>
    Value to treat the size of a toast as when calculating the offset.
  </template>

  <template #body:gap-size.values>

  `<length>`

  </template>
  <template #body:gap-size.default>

  `12px`

  </template>
  <template #body:gap-size:description>
    Size of the gap between toasts as when calculating the offset.
  </template>
</RTable>
</RSpace>

### Compositions

```ts
import type { ComponentProps, ComponentRenderable } from 'roughness'

export declare function useToast(): (
  renderable: ComponentRenderable<typeof RToast>,
  props?: ComponentProps<typeof RToast>,
) => void
```
