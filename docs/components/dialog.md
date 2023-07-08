<script lang="ts" setup>
import { RButton, RDetails, RDialog, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function show() {
  open.value = true
}
</script>

# Dialog

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RDialog } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function show() {
  open.value = true
}
</script>

<template>
  <RButton @click="show">I Have a Dream</RButton>
  <RDialog v-model:open="open">
    <template #title>I Have a Dream</template>
    Five score years ago, a great American, in whose symbolic shadow we stand today, signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. It came as a joyous daybreak to end the long night of their captivity.
    <template #footer>
      <RButton formmethod="dialog">Remember</RButton>
      <RButton formmethod="dialog">Respect</RButton>
    </template>
  </RDialog>
</template>
```

</RDetails>

<RButton @click="show">I Have a Dream</RButton>
<RDialog v-model:open="open">
  <template #title>I Have a Dream</template>
  Five score years ago, a great American, in whose symbolic shadow we stand today, signed the Emancipation Proclamation. This momentous decree came as a great beacon light of hope to millions of Negro slaves who had been seared in the flames of withering injustice. It came as a joyous daybreak to end the long night of their captivity.
  <template #footer>
    <RButton formmethod="dialog">Remember</RButton>
    <RButton formmethod="dialog">Respect</RButton>
  </template>
</RDialog>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['closable', 'open', '...']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:closable.type>

  `boolean`

  </template>
  <template #body:closable.default>

  `true`

  </template>
  <template #body:closable.description>
    Whether to display the close button.
  </template>

  <template #body:open.type>

  `boolean`

  </template>
  <template #body:open.default>

  `false`

  </template>
  <template #body:open.description>
    Whether to display the dialog modal.
  </template>

  <template #body:....description>

  See [Card Props](/components/card#props).

  Unlike Card, the default value of Dialog's `footer` is `true`.

  </template>
</RTable>
</RSpace>
