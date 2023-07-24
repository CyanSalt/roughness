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

### Overflow

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RButton, RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace overflow>
    <RText tag="pre">A spectre is haunting Europe -- the spectre of Communism. All the Powers of old Europe have entered into a holy alliance to exorcise this spectre: Pope and Czar, Metternich and Guizot, French Radicals and German police-spies.</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace overflow>
  <RText tag="pre">A spectre is haunting Europe -- the spectre of Communism. All the Powers of old Europe have entered into a holy alliance to exorcise this spectre: Pope and Czar, Metternich and Guizot, French Radicals and German police-spies.</RText>
</RSpace>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['align', 'justify', 'inline', 'overflow', 'reverse', 'tag', 'vertical', 'wrap']"
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

  <template #body:overflow:type>

  `boolean`

  </template>
  <template #body:overflow:default>

  `false`

  </template>
  <template #body:overflow:description>
    Whether to show the scrollbar when the content overflows.
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

### Styles

<RSpace overflow>
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
