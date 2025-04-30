<script lang="ts" setup>
import { annotate } from 'rough-notation'
import { RInput, RMark, RSpace } from 'roughness'
import { ref } from 'vue'

const pence = ref(915)
</script>

# Mark

Do you know how much a loaf of bread costs now?

## Example

::: info

You need to install [`rough-notation`](https://www.npmjs.com/package/rough-notation) yourself.

:::

::: details Show Code

```vue
<script lang="ts" setup>
import { annotate } from 'rough-notation'
import { RInput, RMark, RSpace } from 'roughness'
import { ref } from 'vue'

const pence = ref(915)
</script>

<template>
  <RSpace vertical>
    <RInput v-model="pence" />
    <p>The shirt cost, 9... <RMark :annotate="annotate">{{ pence }} pence</RMark>?</p>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RInput v-model="pence" />
  <p>The shirt cost, 9... <RMark :annotate="annotate">{{ pence }} pence</RMark>?</p>
</RSpace>

## Usage

<RUsage file="src/mark/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
