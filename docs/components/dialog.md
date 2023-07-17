<script lang="ts" setup>
import { RButton, RDetails, RDialog, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function show() {
  open.value = true
}
</script>

# Dialog

Uno stile tutto cose e tutto pensiero, scevro di ogni pretensione e di ogni maniera, in quella forma diretta e propria in che è l'ultima perfezione della prosa.

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
      <RButton>Remember</RButton>
      <RButton>Respect</RButton>
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
    <RButton>Remember</RButton>
    <RButton>Respect</RButton>
  </template>
</RDialog>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['closable', 'open', 'state', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:closable:type>

  `boolean`

  </template>
  <template #body:closable:default>

  `true`

  </template>
  <template #body:closable:description>
    Whether to display the close button.
  </template>

  <template #body:open:type>

  `boolean`

  </template>
  <template #body:open:default>

  `true`

  </template>
  <template #body:open:description>
    Whether to display the dialog modal.
  </template>

  <template #body:state:type>

  `'auto' | 'manual'`

  </template>
  <template #body:state:default>

  `'auto'`

  </template>
  <template #body:state:description>

  When specified as `auto`, the dialog can be closed by clicking the backdrop.

  </template>

  <template #body:...:description>

  See [Card Props](/components/card#props).

  Unlike Card, the default value of Dialog's `footer` is `true`.

  </template>
</RTable>
</RSpace>

### Events

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:open']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:open:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:open:description>
    Callback function triggered when visibility of the dialog is changed.
  </template>
</RTable>
</RSpace>

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:...:description>

  See [Card Slots](/components/card#slots).

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['...']"
>
  <template #body:*:name="{ row }">--r-dialog-{{ row }}</template>

  <template #body:....name>...</template>
  <template #body:...:description>

  See [Card Styles](/components/card#styles).

  </template>
</RTable>
</RSpace>
