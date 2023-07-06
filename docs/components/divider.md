<script lang="ts" setup>
import { RDetails, RDivider, RTable, RText } from 'roughness'
</script>

# Divider

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RDivider } from 'roughness'
</script>

<template>
  <RDivider />
</template>
```

</RDetails>

<RDivider />

### Vertical

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RDivider, RText } from 'roughness'
</script>

<template>
  <RText>Hello<RDivider vertical />World</RText>
</template>
```

</RDetails>

<RText>Cowherd<RDivider vertical />Weaver Girl</RText>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['vertical']"
>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:vertical.type>

  `boolean`

  </template>
  <template #body:vertical.default>

  `false`

  </template>
  <template #body:vertical.description>
    Whether to display vertical divider.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color', 'gap-size']"
>
  <template #body:*.name="{ row }">--r-divider-{{ row }}</template>

  <template #body:color.values>

  `<color>`

  </template>
  <template #body:color.default>

  `var(--r-common-primary-color)`

  </template>
  <template #body:color.description>
    Color of the divider.
  </template>

  <template #body:gap-size.values>

  `<length>`

  </template>
  <template #body:gap-size.default>

  `12px`

  </template>
  <template #body:gap-size.description>
    Size of the divider gap.
  </template>
</RTable>
</RSpace>
