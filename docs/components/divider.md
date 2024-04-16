<script lang="ts" setup>
import { RDetails, RDivider, RSpace, RTable, RText } from 'roughness'
</script>

# Divider

The LORD caused the sea to go back by a strong east wind all the night, and made the sea dry land, and the waters were divided.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RDivider } from 'roughness'
</script>

<template>
  <RDivider />
</template>
```

</RDetails>

<RDivider />

### Vertical

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RDivider, RText } from 'roughness'
</script>

<template>
  <RText>Hello<RDivider vertical />World</RText>
</template>
```

</RDetails>

<RText>Cowherd<RDivider vertical />Weaver Girl</RText>

## Usage

<RUsage file="src/divider/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
