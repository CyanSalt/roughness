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

<RUsage file="src/dialog/index.vue" styles>

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Card Props](/components/card#props).

  Unlike Card, the default value of Dialog's `footer` is `true`.

  </RProp>

  </template>

  <template #slots>

  <RSlot name="...">

  See [Card Slots](/components/card#slots).

  </RSlot>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Card Styles](/components/card#styles).

  </RStyle>

  </template>

</RUsage>
