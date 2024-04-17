<script lang="ts" setup>
import { RSwitch } from 'roughness'
</script>

# Switch

Everybody 1-2-Switch!

## Example

::: details Show Code

```vue
<script lang="ts" setup>
import { RSwitch } from 'roughness'
</script>

<template>
  <RSwitch>Airplane Mode</RSwitch>
</template>
```

:::

<RSwitch>Airplane Mode</RSwitch>

## Usage

<RUsage file="src/switch/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Space Props](/components/space#props).

  Unlike Space, the default value of Switch's `tag` is `label`.

  </RProp>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Space Styles](/components/space#styles).

  </RStyle>

  </template>

</RUsage>
