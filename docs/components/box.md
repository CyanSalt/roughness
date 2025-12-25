<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'

const boxStyle = { padding: 'var(--r-common-box-padding-block) var(--r-common-box-padding-inline)' }
</script>

# Box

Beat the box up, like Mike in '97, I bite.

## Example

### Colors

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'

const boxStyle = { padding: 'var(--r-common-box-padding-block) var(--r-common-box-padding-inline)' }
</script>

<template>
  <RSpace align="center">
    <RBox :style="boxStyle">Schrödinger's cat</RBox>
    <RBox color="primary" :style="boxStyle">Roughness</RBox>
    <RBox color="info" :style="boxStyle">Entropy</RBox>
    <RBox color="success" :style="boxStyle">Fallout Shelter</RBox>
    <RBox color="warning" :style="boxStyle">Black box</RBox>
    <RBox color="error" :style="boxStyle">Marxism</RBox>
    <RBox color="comment" :style="boxStyle">It's empty</RBox>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RBox :style="boxStyle">Schrödinger's cat</RBox>
  <RBox color="primary" :style="boxStyle">Roughness</RBox>
  <RBox color="info" :style="boxStyle">Entropy</RBox>
  <RBox color="success" :style="boxStyle">Fallout Shelter</RBox>
  <RBox color="warning" :style="boxStyle">Black box</RBox>
  <RBox color="error" :style="boxStyle">Marxism</RBox>
  <RBox color="comment" :style="boxStyle">It's empty</RBox>
</RSpace>

### Size

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'

const boxStyle = { padding: 'var(--r-common-box-padding-block) var(--r-common-box-padding-inline)' }
</script>

<template>
  <RSpace align="center">
    <RBox size="small" :style="boxStyle">Tall</RBox>
    <RBox :style="boxStyle">Grande</RBox>
    <RBox size="large" :style="boxStyle">Venti</RBox>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RBox size="small" :style="boxStyle">Tall</RBox>
  <RBox :style="boxStyle">Grande</RBox>
  <RBox size="large" :style="boxStyle">Venti</RBox>
</RSpace>

### Variants

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'

const boxStyle = { padding: 'var(--r-common-box-padding-block) var(--r-common-box-padding-inline)' }
</script>

<template>
  <RSpace align="center">
    <RBox :style="boxStyle">Tiananmen Square</RBox>
    <RBox round :style="boxStyle">Shenzhen</RBox>
    <RBox filled size="large" :style="boxStyle">Epstein's</RBox>
    <RBox filled round color="warning" size="small" :style="boxStyle">$</RBox>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RBox :style="boxStyle">Tiananmen</RBox>
  <RBox round :style="boxStyle">Shenzhen</RBox>
  <RBox filled size="large" :style="boxStyle">Epstein's</RBox>
  <RBox filled round color="warning" size="small" :style="boxStyle">$</RBox>
</RSpace>

### Styles

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RSpace } from 'roughness'

const boxStyle = { padding: 'var(--r-common-box-padding-block) var(--r-common-box-padding-inline)' }
</script>

<template>
  <RSpace align="center">
    <RBox :style="boxStyle">Paper/RBox>
    <RBox :style="{ ...boxStyle, '--r-box-border-width': '2px' }">Cardboard</RBox>
    <RBox :style="{ ...boxStyle, '--r-box-border-dash': '2' }">Crystal</RBox>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RBox :style="boxStyle">Paper</RBox>
  <RBox :style="{ ...boxStyle, '--r-box-border-width': '2px' }">Cardboard</RBox>
  <RBox :style="{ ...boxStyle, '--r-box-border-dash': '8px' }">Crystal</RBox>
</RSpace>

## Usage

<RUsage file="src/box/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
