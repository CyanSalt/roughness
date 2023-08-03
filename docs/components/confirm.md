<script lang="ts" setup>
import { RButton, RConfirm, RDetails, RSpace, RTable, RText, RToast, useConfirm, useToast } from 'roughness'
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

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

<RButton @click="show">Show</RButton>
<RConfirm v-model:open="open">Are you sure you want to cancel?</RConfirm>

### Composition

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

<RButton @click="ask">Ask</RButton>

## Usage

### Confirm Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:...:description>

  See [Dialog Props](/components/dialog#props).

  </template>
</RTable>
</RSpace>

### Confirm Events

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['confirm', 'cancel', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:confirm:description>
    Callback function triggered when the confirm button is clicked.
  </template>

  <template #body:cancel:description>
    Callback function triggered when the confirm is closed for reasons other than the confirm button.
  </template>

  <template #body:...:description>

  See [Dialog Events](/components/dialog#events).

  </template>
</RTable>
</RSpace>

### Confirm Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:description>
    Content of the confirm.
  </template>
</RTable>
</RSpace>

### Compositions

```ts
import type { ComponentProps, ComponentRenderable } from 'roughness'

export declare function useConfirm(): (
  renderable: ComponentRenderable<typeof RConfirm>,
  props?: ComponentProps<typeof RConfirm>,
) => Promise<boolean>;
```
