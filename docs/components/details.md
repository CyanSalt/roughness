<script lang="ts" setup>
import { RButton, RDetails, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

let open = ref(true)

function toggle() {
  open.value = !open.value
}
</script>

# Details

The devil is in the details.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RDetails, RSpace } from 'roughness'
import { ref } from 'vue'

let open = ref(true)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <RSpace vertical>
    <RDetails v-model:open="open">
      <template #summary>Hanger</template>
      Clown suits
    </RDetails>
    <RButton :filled="!open" @click="toggle">Closet Door</RButton>
    <RText>Look! The door is {{ open ? 'open' : 'closed' }}.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RDetails v-model:open="open">
    <template #summary>Hanger</template>
    Clown suits
  </RDetails>
  <RButton :filled="!open" @click="toggle">Closet Door</RButton>
  <RText>Look! The door is {{ open ? 'open' : 'closed' }}.</RText>
</RSpace>

## Usage

<RUsage file="src/details/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
