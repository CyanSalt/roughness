<script lang="ts" setup>
import { RButton, RToast, useToast } from 'roughness'
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

::: details Show Code

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

:::

<RButton @click="toggle">Toggle</RButton>
<RToast v-model:open="open">Clunk!</RToast>

### Composition

::: details Show Code

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

:::

<RButton @click="add">Add</RButton>

## Usage

<RUsage file="src/toast/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>

<RUsage file="src/toast/toast-provider.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
