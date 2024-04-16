<script lang="ts" setup>
import { kebabCase } from 'lodash-es'
import { CaseSensitive, icons, Regex, Tv, WholeWord } from 'lucide'
import { RCard, RDetails, RIcon, RInput, RSpace, RTable, RText } from 'roughness'
import { ref } from 'vue'

let name = ref('Pencil')
</script>

# Icon

No Picture, No Truth.

<RCard type="info">

Roughness recommends using (and redraws) [Lucide Icons](https://lucide.dev/).

</RCard>

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

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

</RDetails>

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
