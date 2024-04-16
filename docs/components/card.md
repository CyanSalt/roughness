<script lang="ts" setup>
import { RButton, RCard, RDetails, RSpace, RTable, RText } from 'roughness'
</script>

# Card

Sawatdee Card!

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCard } from 'roughness'
</script>

<template>
  <RCard>
    <template #title>A Tranquil Night</template>
    Abed, I see a silver light,<br>
    I wonder if It’s frost around.<br>
    Looking up, I find the moon bright;<br>
    Bowing, in homesickness I’m drowned.
  </RCard>
</template>
```

</RDetails>

<RCard>
  <template #title>A Tranquil Night</template>
  Abed, I see a silver light,<br>
  I wonder if It’s frost around.<br>
  Looking up, I find the moon bright;<br>
  Bowing, in homesickness I’m drowned.
</RCard>

### Alert

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RCard, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RCard type="info">For every minute in Africa, 60 seconds pass.</RCard>
    <RCard type="success">You successfully failed.</RCard>
    <RCard type="warning" size="small">No programmer can see warnings.</RCard>
    <RCard type="error" size="large">You threw tantrums on me!</RCard>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RCard type="info">For every minute in Africa, 60 seconds pass.</RCard>
  <RCard type="success">You successfully failed.</RCard>
  <RCard type="warning" size="small">No programmer can see warnings.</RCard>
  <RCard type="error" size="large">You threw tantrums on me!</RCard>
</RSpace>

## Usage

<RUsage file="src/card/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Space Props](/components/space#props).

  Unlike Space, the default value of Card's `tag` is `article`.

  </RProp>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Space Styles](/components/space#styles).

  </RStyle>

  </template>

</RUsage>
