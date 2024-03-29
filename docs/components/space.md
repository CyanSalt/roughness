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

<RSpace>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['align', 'justify', 'inline', 'reverse', 'size', 'tag', 'vertical', 'wrap']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:align:type>

  `'start' | 'end' | 'center' | 'baseline' | 'stretch'`

  </template>
  <template #body:align:default>

  `stretch` if `vertical`, `'start'` else

  </template>
  <template #body:align:description>

  [Item axis arrangement](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).

  </template>

  <template #body:justify:type>

  `'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'`

  </template>
  <template #body:justify:default>

  `'start'`

  </template>
  <template #body:justify:description>

  [Item arrangement](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).

  </template>

  <template #body:inline:type>

  `boolean`

  </template>
  <template #body:inline:default>

  `false`

  </template>
  <template #body:inline:description>
    Whether the space is displayed as an inline box.
  </template>

  <template #body:reverse:type>

  `boolean`

  </template>
  <template #body:reverse:default>

  `false`

  </template>
  <template #body:reverse:description>
    Whether to reverse the layout.
  </template>

  <template #body:size:type>

  `string`, but usually `'small' | 'large'`

  </template>
  <template #body:size:description>
    Space size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>

  <template #body:tag:type>

  `string`

  </template>
  <template #body:tag:default>

  `'div'`

  </template>
  <template #body:tag:description>
    HTML tag for rendering the space.
  </template>

  <template #body:vertical:type>

  `boolean`

  </template>
  <template #body:vertical:default>

  `false`

  </template>
  <template #body:vertical:description>
    Whether to layout vertically.
  </template>

  <template #body:wrap:type>

  `boolean`

  </template>
  <template #body:wrap:default>

  `true`

  </template>
  <template #body:wrap:description>
    Whether to exceed the line break.
  </template>
</RTable>
</RSpace>

### Slots

<RSpace>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:description>
    Content of the space.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['gap-size']"
>
  <template #body:*:name="{ row }">--r-space-{{ row }}</template>

  <template #body:gap-size:values>

  `<length>`

  </template>
  <template #body:gap-size:default>

  `calc(1em - 4px)`

  </template>
  <template #body:gap-size:description>
    Size of the space gap.
  </template>
</RTable>
</RSpace>
