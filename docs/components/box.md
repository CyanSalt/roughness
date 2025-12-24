<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'
</script>

# Box

Beat the box up, like Mike in '97, I bite.

## Example

### Colors

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RBox :style="{ padding: '0.5em 1em' }">Schrödinger's cat</RBox>
    <RBox color="primary" :style="{ padding: '0.5em 1em' }">Roughness</RBox>
    <RBox color="info" :style="{ padding: '0.5em 1em' }">Entropy</RBox>
    <RBox color="success" :style="{ padding: '0.5em 1em' }">Fallout Shelter</RBox>
    <RBox color="warning" :style="{ padding: '0.5em 1em' }">Black box</RBox>
    <RBox color="error" :style="{ padding: '0.5em 1em' }">Marxism</RBox>
    <RBox color="comment" :style="{ padding: '0.5em 1em' }">It's empty</RBox>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RBox :style="{ padding: '0.5em 1em' }">Schrödinger's cat</RBox>
  <RBox color="primary" :style="{ padding: '0.5em 1em' }">Roughness</RBox>
  <RBox color="info" :style="{ padding: '0.5em 1em' }">Entropy</RBox>
  <RBox color="success" :style="{ padding: '0.5em 1em' }">Fallout Shelter</RBox>
  <RBox color="warning" :style="{ padding: '0.5em 1em' }">Black box</RBox>
  <RBox color="error" :style="{ padding: '0.5em 1em' }">Marxism</RBox>
  <RBox color="comment" :style="{ padding: '0.5em 1em' }">It's empty</RBox>
</RSpace>

### Size

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RBox size="small" :style="{ padding: '0.5em 1em' }">Tall</RBox>
    <RBox :style="{ padding: '0.5em 1em' }">Grande</RBox>
    <RBox size="large" :style="{ padding: '0.5em 1em' }">Venti</RBox>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RBox size="small" :style="{ padding: '0.5em 1em' }">Tall</RBox>
  <RBox :style="{ padding: '0.5em 1em' }">Grande</RBox>
  <RBox size="large" :style="{ padding: '0.5em 1em' }">Venti</RBox>
</RSpace>

### Variants

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RBox :style="{ padding: '0.5em 1em' }">Tiananmen Square</RBox>
    <RBox round :style="{ padding: '0.5em 1em' }">Shenzhen</RBox>
    <RBox filled size="large" :style="{ padding: '0.5em 1em' }">Epstein's</RBox>
    <RBox filled color="warning" size="large" :style="{ padding: '0.5em 1em' }">?</RBox>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RBox :style="{ padding: '0.5em 1em' }">Tiananmen</RBox>
  <RBox round :style="{ padding: '0.5em 1em' }">Shenzhen</RBox>
  <RBox filled size="large" :style="{ padding: '0.5em 1em' }">Epstein's</RBox>
  <RBox filled color="warning" size="large" :style="{ padding: '0.5em 1em' }">?</RBox>
</RSpace>

### Styles

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RBox :style="{ padding: '0.5em 1em' }">Paper/RBox>
    <RBox :style="{ padding: '0.5em 1em', '--r-box-border-width': '2px' }">Cardboard</RBox>
    <RBox :style="{ padding: '0.5em 1em', '--r-box-border-dash': '2' }">Crystal</RBox>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RBox :style="{ padding: '0.5em 1em' }">Paper</RBox>
  <RBox :style="{ padding: '0.5em 1em', '--r-box-border-width': '2px' }">Cardboard</RBox>
  <RBox :style="{ padding: '0.5em 1em', '--r-box-border-dash': '8px' }">Crystal</RBox>
</RSpace>

## Usage

<RUsage file="src/box/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
