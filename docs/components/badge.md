<script lang="ts" setup>
import { RBadge, RDetails, RLink, RSpace, RTable, RText } from 'roughness'
</script>

# Badge

Brezhnev was dressed for burial in his Marshal's uniform along with his medals.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RBadge, RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RBadge>
      <template #marker>3</template>
      <RLink>News</RLink>
    </RBadge>
    <RBadge>
      <RLink>Letters</RLink>
    </RBadge>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RBadge>
    <template #marker>3</template>
    <RLink>News</RLink>
  </RBadge>
  <RBadge>
    <RLink>Letters</RLink>
  </RBadge>
</RSpace>

## Usage

<RUsage file="src/badge/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
