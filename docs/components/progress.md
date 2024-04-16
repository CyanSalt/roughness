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

## Usage

<RUsage file="src/progress/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
