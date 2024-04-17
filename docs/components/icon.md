<script lang="ts" setup>
import { kebabCase } from 'lodash-es'
import { CaseSensitive, icons, Regex, Tv, WholeWord } from 'lucide'
import { RIcon, RInput, RSpace } from 'roughness'
import { ref } from 'vue'

let name = ref('Pencil')
</script>

# Icon

No Picture, No Truth.

::: tip

Roughness recommends using (and redraws) [Lucide Icons](https://lucide.dev/).

:::

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { CaseSensitive, Regex, WholeWord } from 'lucide'
import { RIcon, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RSpace>
      <RIcon :icon="CaseSensitive" />
      <RIcon :icon="WholeWord" />
      <RIcon :icon="Regex" />
    </RSpace>
    <RSpace>
      <RIcon :icon="Tv" filled />
    </RSpace>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RSpace>
    <RIcon :icon="CaseSensitive" />
    <RIcon :icon="WholeWord" />
    <RIcon :icon="Regex" />
  </RSpace>
  <RSpace>
    <RIcon :icon="Tv" filled />
  </RSpace>
</RSpace>

### Color and Size

See [Text](/components/text).

## Usage

<RSpace align="center">
  <RInput v-model="name" />
  <RIcon :icon="icons[name]" />
</RSpace>

View all available icons [here](https://lucide.dev/icons/).

<RUsage file="src/icon/index.vue">

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
