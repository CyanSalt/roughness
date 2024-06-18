<script lang="ts" setup>
import { RTabItem, RTabs } from 'roughness'
</script>

# Tabs

My brain has too many tabs open.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RTabItem, RTabs } from 'roughness'
</script>

<template>
  <RTabs>
    <RTabItem value="amazon">The Amazon River in South America is the largest river by discharge volume of water in the world.</RTabItem>
    <RTabItem value="apple">An apple is a round, edible fruit produced by an apple tree.</RTabItem>
    <RTabItem value="meta">Meta is a prefix meaning "more comprehensive" or "transcending".</RTabItem>
  </RTabs>
</template>
```

:::

<RTabs>
  <RTabItem value="amazon">The Amazon River in South America is the largest river by discharge volume of water in the world.</RTabItem>
  <RTabItem value="apple">An apple is a round, edible fruit produced by an apple tree.</RTabItem>
  <RTabItem value="meta">Meta is a prefix meaning "more comprehensive" or "transcending".</RTabItem>
</RTabs>

### Anchor Side

::: details Show Code

```vue
<script lang="ts" setup>
import { RTabItem, RTabs } from 'roughness'
</script>

<template>
  <RTabs anchor-side="left">
    <RTabItem value="installation" />
    <RTabItem value="usage" />
    <RTabItem value="theme" />
    <RTabItem value="chart" />
  </RTabs>
</template>
```

:::

<RTabs anchor-side="left">
  <RTabItem value="installation" />
  <RTabItem value="usage" />
  <RTabItem value="theme" />
  <RTabItem value="chart" />
</RTabs>

## Usage

<RUsage file="src/tabs/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Space Props](/components/space#props).

  </RProp>

  </template>

</RUsage>

<RUsage file="src/tabs/tab-item.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>

<RUsage file="src/tabs/tab-anchor.vue" :props="false" :events="false" :slots="false">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
