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

<RPropsTable>

  <RProp name="closable">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to display the close button.

  </RProp>

  <RProp name="open">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to display the dialog modal.

  </RProp>

  <RProp name="state">

  <template #type>

  `'auto' | 'manual'`

  </template>

  <template #default-value>

  `'auto'`

  </template>

  When specified as `auto`, the dialog can be closed by clicking the backdrop.

  </RProp>

  <RProp name="...">

  See [Card Props](/components/card#props).

  Unlike Card, the default value of Dialog's `footer` is `true`.

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="update:open">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when visibility of the dialog is changed.

  </REvent>

</REventsTable>

### Slots

<RSlotsTable>

  <RSlot name="...">

  See [Card Slots](/components/card#slots).

  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-dialog-{{ value }}</template>

  <RStyle name="...">

  <template #name>...</template>

  See [Card Styles](/components/card#styles).

  </RStyle>

</RStylesTable>
