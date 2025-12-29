<script lang="ts" setup>
import { RKeyboard } from 'roughness'
</script>

# Keyboard

Keyboard not found, Press F1 to continue.

## Example

### Basic

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

### Tag

::: details Show Code

```vue
<script lang="ts" setup>
import { RKeyboard } from 'roughness'
</script>

<template>
  <RKeyboard tag="button" color="error" size="medium">I want a Coke!</RKeyboard>
</template>
```

:::

<RKeyboard tag="button" color="error" size="medium">I want a Coke!</RKeyboard>

## Usage

<RUsage file="src/keyboard/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
