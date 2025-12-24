<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

# Button

My first name is Belly.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton>Find Luigi</RButton>
    <RButton color="success" round>Enter the Pipe</RButton>
    <RButton color="error" filled>Eat the Mushroom</RButton>
  </RSpace>
</template>
```

:::

<RSpace>
  <RButton>Find Luigi</RButton>
  <RButton color="success" round>Enter the Pipe</RButton>
  <RButton color="error" filled>Eat the Mushroom</RButton>
</RSpace>

See also [Box](/components/box#example).

### State

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton disabled>Train AlphaGo</RButton>
    <RButton color="primary" filled disabled>Let there be light</RButton>
    <RButton color="warning" loading>Give up domination</RButton>
  </RSpace>
</template>
```

:::

<RSpace>
  <RButton disabled>Train AlphaGo</RButton>
  <RButton color="primary" filled disabled>Let there be light</RButton>
  <RButton color="warning" loading>Give up domination</RButton>
</RSpace>

### Block

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RButton block>Switch Account</RButton>
    <RButton color="error" block>Log out of Chaos</RButton>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RButton block>Switch Account</RButton>
  <RButton color="error" block>Log out of Chaos</RButton>
</RSpace>

### Tag

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton as="a" color="primary" filled>Remote Bomb</RButton>
    <RButton as="a" color="error">Magnesis</RButton>
  </RSpace>
</template>
```

:::

<RSpace>
  <RButton as="a" color="primary" filled>Remote Bomb</RButton>
  <RButton as="a" color="error">Magnesis</RButton>
</RSpace>

## Usage

<RUsage file="src/button/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Box Props](/components/box#props).

  </RProp>

  </template>

</RUsage>
