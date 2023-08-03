<script lang="ts" setup>
import { RDetails, RSpace, RTable, RText } from 'roughness'
</script>

# Text

The secret of being boring is to say everything.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace>
    <RText>Normal</RText>
    <RText type="primary">Primary</RText>
    <RText type="info">Info</RText>
    <RText type="success">Success</RText>
    <RText type="warning">Warning</RText>
    <RText type="error">Error</RText>
    <RText type="comment">Comment</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RText>Normal</RText>
  <RText type="primary">Primary</RText>
  <RText type="info">Info</RText>
  <RText type="success">Success</RText>
  <RText type="warning">Warning</RText>
  <RText type="error">Error</RText>
  <RText type="comment">Comment</RText>
</RSpace>

### Size

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace align="center">
    <RText size="small">Small</RText>
    <RText>Medium</RText>
    <RText size="large">Large</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace align="center">
  <RText size="small">Small</RText>
  <RText>Medium</RText>
  <RText size="large">Large</RText>
</RSpace>

### Tag

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace>
    <RText tag="h1" type="error">Statement on the second meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)</RText>
    <RText tag="small">Who really cares?</RText>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RText tag="h1" type="error">Statement on the second meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)</RText>
  <RText tag="small">Who really cares?</RText>
</RSpace>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['block', 'size', 'tag', 'type']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:block:type>

  `boolean`

  </template>
  <template #body:block:default>

  `false`

  </template>
  <template #body:block:description>
    Whether the text is displayed as block.
  </template>

  <template #body:size:type>

  `string`, but usually `'small' | 'large'`

  </template>
  <template #body:size:description>
    Text size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
  </template>

  <template #body:tag:type>

  `string`

  </template>
  <template #body:tag:default>

  `'span'`

  </template>
  <template #body:tag:description>
    HTML tag for rendering the text.
  </template>

  <template #body:type:type>

  `string`, but usually `'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment'`

  </template>
  <template #body:type:description>

  Text style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.

  See also [Color Styles](/guide/theme#color-styles).

  </template>
</RTable>
</RSpace>

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:description>
    Content of the text.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['color']"
>
  <template #body:*:name="{ row }">--r-text-{{ row }}</template>

  <template #body:color:values>

  `<color>`

  </template>
  <template #body:color:default>

  `var(--r-element-color)` for `default` `type`, other theme colors for other `type`.

  When `type` is `default`, it will also be inherited from ancestors.

  </template>
  <template #body:color:description>
    Color of text.
  </template>
</RTable>
</RSpace>
