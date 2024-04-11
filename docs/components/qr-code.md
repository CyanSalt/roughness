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

### Props

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="data">

  <template #type>

  `BitMatrix`

  </template>

  <template #default-value>
    <RText type="error">Required</RText>
  </template>

  Symbol data of QR Code.

  </RProp>

</RPropsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-qr-code-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-comment-color)`

  </template>

  Color of the QR Code cells.

  </RStyle>

  <RStyle name="size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `8em`

  </template>

  Size of the QR Code.

  </RStyle>

</RStylesTable>
