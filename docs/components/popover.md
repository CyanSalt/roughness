<script lang="ts" setup>
import { RButton, RPopover, RSpace } from 'roughness'
</script>

# Popover

Should this text appear in a popover?

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RPopover, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RPopover>
      <template #anchor>Tom is dreaming...</template>
      About giving Jerry as a gift to the girl he loves
    </RPopover>
    <RPopover trigger="click" side="bottom">
      <template #anchor>Click to wake Tom up</template>
      And let him find out that Jerry stole his cheese
    </RPopover>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RPopover>
    <template #anchor>Tom is dreaming...</template>
    About giving Jerry as a gift to the girl he loves
  </RPopover>
  <RPopover trigger="click" side="bottom">
    <template #anchor>Click to wake Tom up</template>
    And let him find out that Jerry stole his cheese
  </RPopover>
</RSpace>

### Dropdown

::: details Show Code

```vue
<script lang="ts" setup>
import { RPopover, RSpace } from 'roughness'
</script>

<template>
  <RPopover side="bottom">
    <template #anchor>
      <RButton>Hamburger</RButton>
    </template>
    <RSpace vertical>
      <RButton>Nord</RButton>
      <RButton>Mitte</RButton>
      <RButton>Harburg</RButton>
    </RSpace>
  </RPopover>
</template>
```

:::

<RPopover side="bottom">
  <template #anchor>
    <RButton>Hamburger</RButton>
  </template>
  <RSpace vertical>
    <RButton>Nord</RButton>
    <RButton>Mitte</RButton>
    <RButton>Harburg</RButton>
  </RSpace>
</RPopover>

## Usage

<RUsage file="src/popover/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Card Props](/components/card#props).

  </RProp>

  </template>

  <template #slots>

  <RSlot name="...">

  See [Card Slots](/components/card#slots).

  </RSlot>

  </template>

</RUsage>
