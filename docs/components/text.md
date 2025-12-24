<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

# Text

The secret of being boring is to say everything.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace>
    <RText>Normal</RText>
    <RText color="primary">Primary</RText>
    <RText color="info">Info</RText>
    <RText color="success">Success</RText>
    <RText color="warning">Warning</RText>
    <RText color="error">Error</RText>
    <RText color="comment">Comment</RText>
  </RSpace>
</template>
```

:::

<RSpace>
  <RText>Normal</RText>
  <RText color="primary">Primary</RText>
  <RText color="info">Info</RText>
  <RText color="success">Success</RText>
  <RText color="warning">Warning</RText>
  <RText color="error">Error</RText>
  <RText color="comment">Comment</RText>
</RSpace>

### Size

::: details Show Code

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

:::

<RSpace align="center">
  <RText size="small">Small</RText>
  <RText>Medium</RText>
  <RText size="large">Large</RText>
</RSpace>

### Tag

::: details Show Code

```vue
<script lang="ts" setup>
import { RSpace, RText } from 'roughness'
</script>

<template>
  <RSpace>
    <RText tag="h1" color="error">Statement on the second meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)</RText>
    <RText tag="del">Who really cares?</RText>
  </RSpace>
</template>
```

:::

<RSpace>
  <RText tag="h1" color="error">Statement on the second meeting of the International Health Regulations (2005) Emergency Committee regarding the outbreak of novel coronavirus (2019-nCoV)</RText>
  <RText tag="del">Who really cares?</RText>
</RSpace>

## Usage

<RUsage file="src/text/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
