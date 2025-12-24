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

# Progress

Deadline tomorrow.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RProgress, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RProgress :value="0.1" />
    <RProgress :value="0.4" color="primary">Primary</RProgress>
    <RProgress :value="0.1" color="info">Info</RProgress>
    <RProgress :value="0.5" color="success">Success</RProgress>
    <RProgress :value="0.9" color="warning">Warning</RProgress>
    <RProgress :value="0.2" color="error">Error</RProgress>
    <RProgress :value="0.6" color="comment">Comment</RProgress>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RProgress :value="0.1" />
  <RProgress :value="0.4" color="primary">Primary</RProgress>
  <RProgress :value="0.1" color="info">Info</RProgress>
  <RProgress :value="0.5" color="success">Success</RProgress>
  <RProgress :value="0.9" color="warning">Warning</RProgress>
  <RProgress :value="0.2" color="error">Error</RProgress>
  <RProgress :value="0.6" color="comment">Comment</RProgress>
</RSpace>

### Animation

::: info

You need to install [`gsap`](https://www.npmjs.com/package/gsap) yourself.

:::

::: details Show Code

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

:::

<RSpace vertical>
  <RProgress :value="tweened.number" />
  <RSlider v-model="value" />
</RSpace>

## Usage

<RUsage file="src/progress/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
