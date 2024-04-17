<script lang="ts" setup>
import { RDivider, RText } from 'roughness'
</script>

# Divider

The LORD caused the sea to go back by a strong east wind all the night, and made the sea dry land, and the waters were divided.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RDivider } from 'roughness'
</script>

<template>
  <RDivider />
</template>
```

:::

<RDivider />

### Vertical

::: details Show Code

```vue
<script lang="ts" setup>
import { RDivider, RText } from 'roughness'
</script>

<template>
  <RText>Hello<RDivider vertical />World</RText>
</template>
```

:::

<RText>Cowherd<RDivider vertical />Weaver Girl</RText>

## Usage

<RUsage file="src/divider/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
