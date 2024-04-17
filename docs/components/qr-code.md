<script lang="ts" setup>
import qrcode from 'qrcode'
import { RInput, RQRCode, RSpace } from 'roughness'
import { computed, ref } from 'vue'

const text = ref('Disquisitiones Arithmeticae')

const data = computed(() => {
  if (!text.value) return { size: 0, data: new Uint8Array() }
  const { modules } = qrcode.create(text.value)
  return modules
})
</script>

# QR Code

The fundamental theorem must certainly be regarded as one of the most elegant of its type.

## Example

::: info

You need to install [`qrcode`](https://www.npmjs.com/package/qrcode) yourself.

:::

::: details Show Code

```vue
<script lang="ts" setup>
import qrcode from 'qrcode'
import { RInput, RQRCode, RSpace } from 'roughness'
import { computed, ref } from 'vue'

const text = ref('Disquisitiones Arithmeticae')

const data = computed(() => {
  const { modules } = qrcode.create(text.value)
  return modules
})
</script>

<template>
  <RSpace vertical>
    <RQRCode :data="data" />
    <RInput v-model="text" />
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RQRCode :data="data" />
  <RInput v-model="text" />
</RSpace>

## Usage

<RUsage file="src/qr-code/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
