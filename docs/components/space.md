<script lang="ts" setup>
import { RButton, RDetails, RSpace, RTable } from 'roughness'
</script>

# Space

We need to keep our distance.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

<RSpace :style="{ 'max-width': '600px' }">
  <RButton>Rocket to the moon</RButton>
  <RButton>Bring newton back to life</RButton>
  <RButton type="warning">Single loop of Never Gonna Give You Up</RButton>
</RSpace>

### Vertical

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

<RSpace vertical>
  <RButton>Mars</RButton>
  <RButton>Jupiter</RButton>
  <RButton>Saturn</RButton>
</RSpace>

### From Center

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

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
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:align.type>

  `'start' | 'end' | 'center' | 'baseline' | 'stretch'`

  </template>
  <template #body:align.default>

  `stretch` if `vertical`, `'start'` else

  </template>
  <template #body:align.description>
    Vertical arrangement.
  </template>

  <template #body:justify.type>

  `'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'`

  </template>
  <template #body:justify.default>

  `'start'`

  </template>
  <template #body:justify.description>
    Horizontal arrangement.
  </template>

  <template #body:vertical.type>

  `boolean`

  </template>
  <template #body:vertical.default>

  `false`

  </template>
  <template #body:vertical.description>
    Whether to layout vertically.
  </template>

  <template #body:wrap.type>

  `boolean`

  </template>
  <template #body:wrap.default>

  `true`

  </template>
  <template #body:wrap.description>
    Whether to exceed the line break.
  </template>
</RTable>

### Styles

<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['size']"
>
  <template #body:*.name="{ row }">--r-space-{{ row }}</template>

  <template #body:size.values>

  `<length>`

  </template>
  <template #body:size.default>

  `12px`

  </template>
  <template #body:size.description>
    Size of the gap.
  </template>
</RTable>
