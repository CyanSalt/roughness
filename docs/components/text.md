<script lang="ts" setup>
import { RSpace, RTable, RText } from 'roughness'
</script>

# Text

The secret of being boring is to say everything.

## Example

### Basic

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
  </RSpace>
</template>
```

<RSpace>
  <RText>Normal</RText>
  <RText type="primary">Primary</RText>
  <RText type="info">Info</RText>
  <RText type="success">Success</RText>
  <RText type="warning">Warning</RText>
  <RText type="error">Error</RText>
</RSpace>

### Tag

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RText tag="h1" type="error">Statement on the second meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)</RText>
  <RText tag="small">Who really cares?</RText>
</template>
```

<RSpace>
  <RText tag="h1" type="error">Statement on the second meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)</RText>
  <RText tag="small">Who really cares?</RText>
</RSpace>

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['tag', 'type']"
>
  <template #head:*="{ column, helpers }">{{ helpers.startCase(column) }}</template>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:tag.type>
    <code>string</code>
  </template>
  <template #body:tag.default>
    <code>'span'</code>
  </template>
  <template #body:tag.description>
    HTML tag for rendering the text.
  </template>

  <template #body:type.type>
    <code>string</code>, but usually <code>'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'</code>
  </template>
  <template #body:type.default>
    <code>'default'</code>
  </template>
  <template #body:type.description>
    Text style type.
  </template>
</RTable>
