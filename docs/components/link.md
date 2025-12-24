<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

# Link

The blood moon rises once again. Please be careful, Link...

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RLink>This way, sir.</RLink>
  </RSpace>
</template>
```

:::

<RSpace>
  <RLink>This way, sir.</RLink>
</RSpace>

### Color and Size

See [Text](/components/text).

### With `href` attribute

::: details Show Code

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RLink href="https://en.wikipedia.org/wiki/Telephone">Start</RLink>
    <RLink color="error" href="https://en.wikipedia.org/wiki/Nuclear_weapon">End</RLink>
  </RSpace>
</template>
```

:::

<RSpace>
  <RLink href="https://en.wikipedia.org/wiki/Telephone">Start</RLink>
  <RLink color="error" href="https://en.wikipedia.org/wiki/Nuclear_weapon">End</RLink>
</RSpace>

### As Button

::: details Show Code

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RLink tag="button" color="primary">Confirm cancelling</RLink>
    <RLink tag="button" color="error">Cancel confirming</RLink>
  </RSpace>
</template>
```

:::

<RSpace>
  <RLink tag="button" color="primary">Confirm cancelling</RLink>
  <RLink tag="button" color="error">Cancel confirming</RLink>
</RSpace>

See also [Button](/components/button#tag).

## Usage

<RUsage file="src/link/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Text Props](/components/text#props).

  </RProp>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Text Styles](/components/text#styles).

  </RStyle>

  </template>

</RUsage>
