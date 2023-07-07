<script lang="ts" setup>
import { RAlert, RDetails, RIcon, RSpace, RTable, RText } from 'roughness'
</script>

# RIcon

No Picture, No Truth.

<RAlert type="info">

INFO<br>Roughness uses [Feather Icons](https://feathericons.com/).

</RAlert>

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RIcon, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RIcon name="minus" />
    <RIcon name="maximize-2" />
    <RIcon name="x" />
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RIcon name="minus" />
  <RIcon name="maximize-2" />
  <RIcon name="x" />
</RSpace>

### Color and Size

See [Text](/components/text).

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['name', 'reactions', '...']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:name.type>

  `string`

  </template>
  <template #body:name.default>
    <RText type="error">Required</RText>
  </template>
  <template #body:name.description>

  Name of the icon in [Feather Icons](https://feathericons.com/).

  </template>

  <template #body:reactions.type>

  `string[]`

  </template>
  <template #body:reactions.default>

  `[]`

  </template>
  <template #body:reactions.description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>

  <template #body:....description>

  See [Text Props](/components/text#props).

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', '...']"
>
  <template #body:*.name="{ row }">--r-icon-{{ row }}</template>

  <template #body:color.values>

  `<color>`

  </template>
  <template #body:color.default>

  `var(--r-common-text-color)` for `default` `type`, other theme colors for other `type`

  </template>
  <template #body:color.description>
    Color of the icon.
  </template>

  <template #body:....name>...</template>
  <template #body:....description>

  See [Text Styles](/components/text#styles).

  </template>
</RTable>
</RSpace>
