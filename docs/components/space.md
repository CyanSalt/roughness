<script lang="ts" setup>
import { RButton, RDetails, RSpace, RTable, RText } from 'roughness'
</script>

# Space

We need to keep our distance.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace :style="{ 'max-width': '600px' }">
    <RButton>Rocket to the moon</RButton>
    <RButton>Bring newton back to life</RButton>
    <RButton type="warning">Single loop of Never Gonna Give You Up</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace :style="{ 'max-width': '600px' }">
  <RButton>Rocket to the moon</RButton>
  <RButton>Bring newton back to life</RButton>
  <RButton type="warning">Single loop of Never Gonna Give You Up</RButton>
</RSpace>

### Direction

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RSpace reverse>
      <RButton>Moon</RButton>
      <RButton>Earth</RButton>
    </RSpace>
    <RButton>Mars</RButton>
    <RButton>Jupiter</RButton>
    <RButton>Saturn</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RSpace reverse>
    <RButton>Moon</RButton>
    <RButton>Earth</RButton>
  </RSpace>
  <RButton>Mars</RButton>
  <RButton>Jupiter</RButton>
  <RButton>Saturn</RButton>
</RSpace>

### From Center

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace justify="center">
    <RButton>Squidward</RButton>
    <RButton type="warning">SpongeBob</RButton>
    <RButton>Patrick</RButton>
  </RSpace>
</template>
```

</RDetails>

<RSpace justify="center">
  <RButton>Squidward</RButton>
  <RButton type="warning">SpongeBob</RButton>
  <RButton>Patrick</RButton>
</RSpace>

### Size

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RSpace size="small">
      <RText>You</RText>
      <RText>Your primary school classmates</RText>
    </RSpace>
    <RSpace>
      <RText>You</RText>
      <RText>Your middle school classmates</RText>
    </RSpace>
    <RSpace size="large">
      <RText>You</RText>
      <RText>Your college classmates</RText>
    </RSpace>
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RSpace size="small">
    <RText>You</RText>
    <RText>Your primary school classmates</RText>
  </RSpace>
  <RSpace>
    <RText>You</RText>
    <RText>Your middle school classmates</RText>
  </RSpace>
  <RSpace size="large">
    <RText>You</RText>
    <RText>Your college classmates</RText>
  </RSpace>
</RSpace>

## Usage

### Props

<RPropsTable>

  <RProp name="align">

  <template #type>

  `'start' | 'end' | 'center' | 'baseline' | 'stretch'`

  </template>

  <template #default-value>

  `stretch` if `vertical`, `'start'` else

  </template>

  [Item axis arrangement](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).

  </RProp>

  <RProp name="justify">

  <template #type>

  `'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'`

  </template>

  <template #default-value>

  `'start'`

  </template>

  [Item arrangement](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).

  </RProp>

  <RProp name="inline">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether the space is displayed as an inline box.

  </RProp>

  <RProp name="reverse">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether to reverse the layout.

  </RProp>

  <RProp name="size">

  <template #type>

  `string`, but usually `'small' | 'large'`

  </template>

  Space size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  </RProp>

  <RProp name="tag">

  <template #type>

  `string`

  </template>

  <template #default-value>

  `'div'`

  </template>

  HTML tag for rendering the space.

  </RProp>

  <RProp name="vertical">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether to layout vertically.

  </RProp>

  <RProp name="wrap">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to exceed the line break.

  </RProp>

</RPropsTable>

### Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the space.
  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-space-{{ value }}</template>

  <RStyle name="gap-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `calc(1em - 4px)`

  </template>

  Size of the space gap.

  </RStyle>

</RStylesTable>
