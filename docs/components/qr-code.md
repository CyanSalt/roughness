<script lang="ts" setup>
import qrcode from 'qrcode'
import { RCard, RDetails, RInput, RQRCode, RSpace, RTable, RText } from 'roughness'
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

<RCard type="comment">

You need to install [`qrcode`](https://www.npmjs.com/package/qrcode) yourself.

</RCard>

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

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
