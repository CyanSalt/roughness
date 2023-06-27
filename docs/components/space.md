<script lang="ts" setup>
import { RButton, RSpace, RTable } from 'roughness'
import { title } from '../utils/helpers'
</script>

# Space

## Example

### Basic

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

<RSpace :style="{ 'max-width': '600px' }">
  <RButton>Rocket to the moon</RButton>
  <RButton>Bring newton back to life</RButton>
  <RButton type="warning">Single loop of Never Gonna Give You Up</RButton>
</RSpace>

### Vertical

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RButton>Mars</RButton>
    <RButton>Jupiter</RButton>
    <RButton>Saturn</RButton>
  </RSpace>
</template>
```

<RSpace vertical>
  <RButton>Mars</RButton>
  <RButton>Jupiter</RButton>
  <RButton>Saturn</RButton>
</RSpace>

### From Center

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

<RSpace justify="center">
  <RButton>Squidward</RButton>
  <RButton type="warning">SpongeBob</RButton>
  <RButton>Patrick</RButton>
</RSpace>

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['align', 'justify', 'vertical', 'wrap']"
>
  <template #head:*="{ column }">{{ title(column) }}</template>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:align.type>
    <code>'start' | 'end' | 'center' | 'baseline' | 'stretch'</code>
  </template>
  <template #body:align.default>
    <code>'start'</code>
  </template>
  <template #body:align.description>
    Vertical arrangement.
  </template>

  <template #body:justify.type>
    <code>'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'</code>
  </template>
  <template #body:justify.default>
    <code>'start'</code>
  </template>
  <template #body:justify.description>
    Horizontal arrangement.
  </template>

  <template #body:vertical.type>
    <code>boolean</code>
  </template>
  <template #body:vertical.default>
    <code>false</code>
  </template>
  <template #body:vertical.description>
    Whether to layout vertically.
  </template>

  <template #body:wrap.type>
    <code>boolean</code>
  </template>
  <template #body:wrap.default>
    <code>true</code>
  </template>
  <template #body:wrap.description>
    Whether to exceed the line break.
  </template>
</RTable>
