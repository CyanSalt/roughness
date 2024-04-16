<script lang="ts" setup>
import { RDetails, RList, RListItem, RSpace, RTable, RText } from 'roughness'
</script>

# List

I always make a list before I go to the grocery store. Sometimes, I even remember to bring it with me.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RList, RListItem } from 'roughness'
</script>

<template>
  <RList>
    <RListItem>Dog Food</RListItem>
    <RListItem>Cat Food</RListItem>
    <RListItem>
      <RText type="warning">Human Food</RText>
    </RListItem>
  </RList>
</template>
```

</RDetails>

<RList>
  <RListItem>Dog Food</RListItem>
  <RListItem>Cat Food</RListItem>
  <RListItem>
    <RText type="warning">Human Food</RText>
  </RListItem>
</RList>

### List Style

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RList, RListItem } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RList list-style="square">
      <RListItem>How are you?</RListItem>
      <RListItem>Fine, thank you.<br>And you?</RListItem>
    </RList>
    <RList list-style="auto">
      <RListItem>4142135623730951</RListItem>
      <RListItem>23606797749979</RListItem>
    </RList>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RList list-style="square">
    <RListItem>How are you?</RListItem>
    <RListItem>Fine, thank you.<br>And you?</RListItem>
  </RList>
  <RList list-style="auto">
    <RListItem>4142135623730951</RListItem>
    <RListItem>23606797749979</RListItem>
  </RList>
</RSpace>

## Usage

<RUsage file="src/list/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Space Props](/components/space#props).

  Unlike Space, the default value of List's `tag` is `ul` or `ol`.

  </RProp>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Space Styles](/components/space#styles).

  </RStyle>

  </template>

</RUsage>

<RUsage file="src/list/list-item.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
