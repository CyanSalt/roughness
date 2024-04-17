<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

# Button

My first name is Belly.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton>Normal</RButton>
    <RButton type="primary">Primary</RButton>
    <RButton type="info">Info</RButton>
    <RButton type="success">Success</RButton>
    <RButton type="warning">Warning</RButton>
    <RButton type="error">Error</RButton>
    <RButton type="comment">Comment</RButton>
  </RSpace>
</template>
```

:::

<RSpace>
  <RButton>Normal</RButton>
  <RButton type="primary">Primary</RButton>
  <RButton type="info">Info</RButton>
  <RButton type="success">Success</RButton>
  <RButton type="warning">Warning</RButton>
  <RButton type="error">Error</RButton>
  <RButton type="comment">Comment</RButton>
</RSpace>

### Size

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RButton size="small">Small</RButton>
    <RButton>Medium</RButton>
    <RButton size="large">Large</RButton>
  </RSpace>
</template>
```

:::

<RSpace align="center">
  <RButton size="small">Small</RButton>
  <RButton>Medium</RButton>
  <RButton size="large">Large</RButton>
</RSpace>

### Filled

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton filled>Normal</RButton>
    <RButton type="primary" filled>Primary</RButton>
    <RButton type="info" filled>Info</RButton>
    <RButton type="success" filled>Success</RButton>
    <RButton type="warning" filled>Warning</RButton>
    <RButton type="error" filled>Error</RButton>
    <RButton type="comment" filled>Comment</RButton>
  </RSpace>
</template>
```

:::

<RSpace>
  <RButton filled>Normal</RButton>
  <RButton type="primary" filled>Primary</RButton>
  <RButton type="info" filled>Info</RButton>
  <RButton type="success" filled>Success</RButton>
  <RButton type="warning" filled>Warning</RButton>
  <RButton type="error" filled>Error</RButton>
  <RButton type="comment" filled>Comment</RButton>
</RSpace>

See also [GraphicsConfig](/components/graphics#configuration).

### Round

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton round>Enter the Pipe</RButton>
    <RButton type="error" filled round>Eat the Mushroom</RButton>
  </RSpace>
</template>
```

:::

<RSpace>
  <RButton round>Enter the Pipe</RButton>
  <RButton type="error" filled round>Eat the Mushroom</RButton>
</RSpace>

### State

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton disabled>Train AlphaGo</RButton>
    <RButton type="primary" filled disabled>Let there be light</RButton>
    <RButton type="warning" loading>Give up domination</RButton>
  </RSpace>
</template>
```

:::

<RSpace>
  <RButton disabled>Train AlphaGo</RButton>
  <RButton type="primary" filled disabled>Let there be light</RButton>
  <RButton type="warning" loading>Give up domination</RButton>
</RSpace>

### Block

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RButton block>Switch Account</RButton>
    <RButton type="error" block>Log out of Chaos</RButton>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RButton block>Switch Account</RButton>
  <RButton type="error" block>Log out of Chaos</RButton>
</RSpace>

### Tag

::: details Show Code

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton tag="a" type="primary" filled>Remote Bomb</RButton>
    <RButton tag="a" type="error">Magnesis</RButton>
  </RSpace>
</template>
```

:::

<RSpace>
  <RButton tag="a" type="primary" filled>Remote Bomb</RButton>
  <RButton tag="a" type="error">Magnesis</RButton>
</RSpace>

## Usage

<RUsage file="src/button/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
