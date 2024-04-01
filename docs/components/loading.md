<script lang="ts" setup>
import { RDetails, RLoading, RSpace, RTable, RText } from 'roughness'
</script>

# Loading

Just a moment...

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RLoading, RText } from 'roughness'
</script>

<template>
  <RText>
    <RLoading />
    Don't turn off your computer
  </RText>
</template>
```

</RDetails>

<RText>
  <RLoading />
  Don't turn off your computer
</RText>

## Usage

### Props

<RPropsTable>

  <RProp name="...">

  See [Space Props](/components/space#props).

  </RProp>

</RPropsTable>
