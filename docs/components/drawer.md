<script lang="ts" setup>
import { RButton, RDetails, RDrawer, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function show() {
  open.value = true
}

let bottomOpen = ref(false)

function showBottom() {
  bottomOpen.value = true
}
</script>

# Drawer

There is a time machine hidden in the drawer.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RDrawer } from 'roughness'
import { ref } from 'vue'

let open = ref(false)

function show() {
  open.value = true
}
</script>

<template>
  <RButton @click="show">Show Lyrics</RButton>
  <RDrawer v-model:open="open">
    <template #title>Doraemon no uta</template>
      This sort of thing is good<br>
      I wish I could do it<br>
      This sort of dream<br>
      This sort of dream, I have many of them but<br>
      All of them, all of them, all of them<br>
      He grants my dreams<br>
      He grants my dreams with a mysterious pocket<br>
      I want to fly freely in the sky<br>
      (Here! Bamboo-copter!)<br>
      Ah ah ah, I love you so much, Doraemon
    <template #footer>
      <RButton>Close</RButton>
    </template>
  </RDrawer>
</template>
```

</RDetails>

<RButton @click="show">Show Lyrics</RButton>
<RDrawer v-model:open="open">
  <template #title>Doraemon no uta</template>
    This sort of thing is good<br>
    I wish I could do it<br>
    This sort of dream<br>
    This sort of dream, I have many of them but<br>
    All of them, all of them, all of them<br>
    He grants my dreams<br>
    He grants my dreams with a mysterious pocket<br>
    I want to fly freely in the sky<br>
    (Here! Bamboo-copter!)<br>
    Ah ah ah, I love you so much, Doraemon
  <template #footer>
    <RButton>Close</RButton>
  </template>
</RDrawer>

### Side

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RDrawer } from 'roughness'
import { ref } from 'vue'

let bottomOpen = ref(false)

function showBottom() {
  bottomOpen.value = true
}
</script>

<template>
  <RButton @click="showBottom">Cookie Jar</RButton>
  <RDrawer v-model:open="bottomOpen" side="bottom">
    <template #title>This site eats cookies.</template>
      We eat cookies to fill our bellies. By using our site you agree to our cookie policy.
    <template #footer>
      <RButton type="primary">Accept</RButton>
    </template>
  </RDrawer>
</template>
```

</RDetails>

<RButton @click="showBottom">Cookie Jar</RButton>
<RDrawer v-model:open="bottomOpen" side="bottom">
  <template #title>This site eats cookies.</template>
    We eat cookies to fill our bellies. By using our site you agree to our cookie policy.
  <template #footer>
    <RButton type="primary">Accept</RButton>
  </template>
</RDrawer>

## Usage

### Props

<RPropsTable>

  <RProp name="side">

  <template #type>

  `'left' | 'right' | 'top' | 'bottom'`

  </template>

  <template #default-value>

  `'right'`

  </template>

  Which side of the page the drawer will show on.

  </RProp>

  <RProp name="...">

  See [Dialog Props](/components/dialog#props).

  </RProp>

</RPropsTable>

### Slots

<RSlotsTable>

  <RSlot name="...">

  See [Dialog Slots](/components/dialog#slots).

  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-drawer-{{ value }}</template>

  <RStyle name="...">

  <template #name>...</template>

  See [Dialog Styles](/components/dialog#styles).

  </RStyle>

</RStylesTable>
