<script lang="ts" setup>
import { RButton, RConfirm, RToast, useConfirm, useToast } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function show() {
  open.value = true
}

const confirm = useConfirm()
const toast = useToast()

async function ask() {
  const result = await confirm({
    title: () => 'Hey Guys',
    default: () => 'Let\'s go for a walk outside!',
  })
  toast(result ? 'Hooray!' : 'OK...', {
    type: result ? 'success' : 'comment',
  })
}
</script>

# Confirm

The nuke will be launched after 10s. Are you sure?

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RToast } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function show() {
  open.value = true
}
</script>

<template>
  <RButton @click="show">Show</RButton>
  <RConfirm v-model:open="open">Are you sure you want to cancel?</RConfirm>
</template>
```

:::

<RButton @click="show">Show</RButton>
<RConfirm v-model:open="open">Are you sure you want to cancel?</RConfirm>

### Composition

::: details Show Code

```vue
<script lang="ts" setup>
import { RConfirmProvider } from 'roughness'
</script>

<template>
  <RConfirmProvider>
    <App />
  </RConfirmProvider>
</template>
```

```vue
<script lang="ts" setup>
import { useConfirm, useToast } from 'roughness'

const confirm = useConfirm()
const toast = useToast()

async function ask() {
  const result = await confirm({
    title: () => 'Hey Guys',
    default: () => 'Let\'s go for a walk outside!',
  })
  toast(result ? 'Hooray!' : 'OK...', {
    type: result ? 'success' : 'comment',
  })
}
</script>

<template>
  <RButton @click="ask">Ask</RButton>
</template>
```

:::

<RButton @click="ask">Ask</RButton>

## Usage

<RUsage file="src/confirm/index.vue" props>

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Dialog Props](/components/dialog#props).

  </RProp>

  </template>

  <template #events>

  <REvent name="...">

  See [Dialog Events](/components/dialog#events).

  </REvent>

  </template>

</RUsage>

<RUsage file="src/confirm/confirm-provider.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>

### Compositions

```ts
import type { ComponentProps, ComponentRenderable } from 'roughness'

export declare function useConfirm(): (
  renderable: ComponentRenderable<typeof RConfirm>,
  props?: ComponentProps<typeof RConfirm>,
) => Promise<boolean>
```
