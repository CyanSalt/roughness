<script lang="ts" setup>
import { RKeyboard } from 'roughness'
</script>

# Keyboard

Keyboard not found, Press F1 to continue.

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import { RKeyboard } from 'roughness'
</script>

<template>
  <RKeyboard>Context</RKeyboard>, not <RKeyboard>⌃</RKeyboard>.
</template>
```

:::

<RKeyboard>Context</RKeyboard>, not <RKeyboard>⌃</RKeyboard>.

## Usage

<RUsage file="src/keyboard/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
