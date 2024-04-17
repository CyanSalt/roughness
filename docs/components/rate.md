<script lang="ts" setup>
import { Heart } from 'lucide'
import { RRate } from 'roughness'
import { ref } from 'vue'

let rate = ref(3)
</script>

# Rate

Only God can judge me.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RRate } from 'roughness'
import { ref } from 'vue'

let rate = ref(3)
</script>

<template>
  <RRate v-model="rate" />
</template>
```

:::

<RRate v-model="rate" />

### Shape

::: details Show Code

```vue
<script lang="ts" setup>
import { Heart } from 'lucide'
import { RRate } from 'roughness'
</script>

<template>
  <RRate :shape="Heart" />
</template>
```

:::

<RRate :shape="Heart" />

## Usage

<RUsage file="src/rate/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
