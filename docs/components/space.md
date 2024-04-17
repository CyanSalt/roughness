<script lang="ts" setup>
import { RButton, RSpace, RText } from 'roughness'
</script>

# Space

We need to keep our distance.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace :style="{ 'max-width': '600px' }">
    <RButton>Rocket to the moon</RButton>
    <RButton>Bring newton back to life</RButton>
    <RButton type="warning">Single loop of Never Gonna Give You Up</RButton>
  </RSpace>
</template>
```

:::

<RSpace :style="{ 'max-width': '600px' }">
  <RButton>Rocket to the moon</RButton>
  <RButton>Bring newton back to life</RButton>
  <RButton type="warning">Single loop of Never Gonna Give You Up</RButton>
</RSpace>

### Direction

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RSpace reverse>
      <RButton>Moon</RButton>
      <RButton>Earth</RButton>
    </RSpace>
    <RButton>Mars</RButton>
    <RButton>Jupiter</RButton>
    <RButton>Saturn</RButton>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RSpace reverse>
    <RButton>Moon</RButton>
    <RButton>Earth</RButton>
  </RSpace>
  <RButton>Mars</RButton>
  <RButton>Jupiter</RButton>
  <RButton>Saturn</RButton>
</RSpace>

### From Center

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace justify="center">
    <RButton>Squidward</RButton>
    <RButton type="warning">SpongeBob</RButton>
    <RButton>Patrick</RButton>
  </RSpace>
</template>
```

:::

<RSpace justify="center">
  <RButton>Squidward</RButton>
  <RButton type="warning">SpongeBob</RButton>
  <RButton>Patrick</RButton>
</RSpace>

### Size

::: details Show Code

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RSpace size="small">
      <RText>You</RText>
      <RText>Your primary school classmates</RText>
    </RSpace>
    <RSpace>
      <RText>You</RText>
      <RText>Your middle school classmates</RText>
    </RSpace>
    <RSpace size="large">
      <RText>You</RText>
      <RText>Your college classmates</RText>
    </RSpace>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RSpace size="small">
    <RText>You</RText>
    <RText>Your primary school classmates</RText>
  </RSpace>
  <RSpace>
    <RText>You</RText>
    <RText>Your middle school classmates</RText>
  </RSpace>
  <RSpace size="large">
    <RText>You</RText>
    <RText>Your college classmates</RText>
  </RSpace>
</RSpace>

## Usage

<RUsage file="src/space/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
