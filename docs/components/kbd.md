<script lang="ts" setup>
import { RKbd } from 'roughness'
</script>

# Kbd

Keyboard not found, Press F1 to continue.

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import { RKbd } from 'roughness'
</script>

<template>
  <RKbd>Context</RKbd>, not <RKbd>⌃</RKbd>.
</template>
```

:::

<RKbd>Context</RKbd>, not <RKbd>⌃</RKbd>.

## Usage

<RUsage file="src/kbd/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
