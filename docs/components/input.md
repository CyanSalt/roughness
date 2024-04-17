<script lang="ts" setup>
import { RInput, RSpace } from 'roughness'
import { ref } from 'vue'

let number = ref(5);
let poem = ref('Because I could not stop for Death,\nHe kindly stopped for me;\nThe carriage held but just ourselves\nAnd Immortality. ')
let email = ref('java.lang.NullPointerException')
</script>

# Input

It was never the leader of Russia.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RInput } from 'roughness'
</script>

<template>
  <RInput placeholder="Where is the quick fox?" />
</template>
```

:::

<RInput placeholder="Where is the quick fox?" />

### Multiline

::: details Show Code

```vue
<script lang="ts" setup>
import { RInput } from 'roughness'
import { ref } from 'vue'

let poem = ref('Because I could not stop for Death,\nHe kindly stopped for me;\nThe carriage held but just ourselves\nAnd Immortality. ')
</script>

<template>
  <RInput v-model="poem" :lines="5" />
</template>
```

:::

<RInput v-model="poem" :lines="5" />

### Number

::: details Show Code

```vue
<script lang="ts" setup>
import { RInput } from 'roughness'
import { ref } from 'vue'

let number = ref(5);
</script>

<template>
  <RSpace>
    <RInput v-model.number="number" :style="{ 'margin-inline-start': `${number}em` }" />
  </RSpace>
</template>
```

:::

<RSpace>
  <RInput v-model.number="number" :style="{ 'margin-inline-start': `${number}em` }" />
</RSpace>

### Disabled

::: details Show Code

```vue
<script lang="ts" setup>
import { RInput, RSpace } from 'roughness'

</script>

<template>
  <RSpace vertical>
    <RInput model-value="If you remix, transform, or build upon the material, you may not distribute the modified material." readonly />
    <RInput model-value="You may not remove or alter the substance of any license notices contained within the Source Code Form of the Covered Software" disabled />
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RInput model-value="If you remix, transform, or build upon the material, you may not distribute the modified material." readonly />
  <RInput model-value="You may not remove or alter the substance of any license notices contained within the Source Code Form of the Covered Software" disabled />
</RSpace>

### Types

::: details Show Code

```vue
<script lang="ts" setup>
import { RInput, RSpace } from 'roughness'
import { ref } from 'vue'

let email = ref('java.lang.NullPointerException')
</script>

<template>
  <RSpace vertical>
    <RInput type="date" />
    <RInput v-model="email" type="email" />
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RInput type="date" />
  <RInput v-model="email" type="email" />
</RSpace>

## Usage

<RUsage file="src/input/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
