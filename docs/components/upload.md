<script lang="ts" setup>
import { RSpace, RText, RUpload } from 'roughness'
import { ref } from 'vue'

let file = ref<File>()
let loading = ref(false)

function select(value: File) {
  loading.value = true
  setTimeout(() => {
    file.value = value
    loading.value = false
  }, 1000)
}
</script>

# Upload

Upload your days, download your life.

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import { RSpace, RText, RUpload } from 'roughness'
import { ref } from 'vue'

let file = ref<File>()
let loading = ref(false)

function select(value: File) {
  loading.value = true
  setTimeout(() => {
    file.value = value
    loading.value = false
  }, 1000)
}
</script>

<template>
  <RSpace vertical align="start">
    <RUpload :loading="loading" @select="select">Drop or Select File</RUpload>
    <RText>It's {{ file ? file.name : 'nothing' }}.</RText>
  </RSpace>
</template>
```

:::

<RSpace vertical align="start">
  <RUpload :loading="loading" @select="select">Drop or Select File</RUpload>
  <RText>It's {{ file ? file.name : 'nothing' }}.</RText>
</RSpace>

## Usage

<RUsage file="src/upload/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
