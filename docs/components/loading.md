<script lang="ts" setup>
import { RLoading, RText } from 'roughness'
</script>

# Loading

Just a moment...

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import { RLoading, RText } from 'roughness'
</script>

<template>
  <RText>
    <RLoading />
    Don't turn off your computer
  </RText>
</template>
```

:::

<RText>
  <RLoading />
  Don't turn off your computer
</RText>

## Usage

<RUsage file="src/loading/index.vue" props>

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Space Props](/components/space#props).

  </RProp>

  </template>

</RUsage>
