<script lang="ts" setup>
import { RButton, RSpace, RTable } from 'roughness'

function title(text: string) {
  return text.slice(0, 1).toUpperCase() + text.slice(1)
}
</script>

# Button

## Example

### Basic

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton>Normal</RButton>
    <RButton type="primary">Primary</RButton>
    <RButton type="info">Info</RButton>
    <RButton type="success">Success</RButton>
    <RButton type="warning">Warning</RButton>
    <RButton type="error">Error</RButton>
  </RSpace>
</template>
```

<RSpace>
  <RButton>Normal</RButton>
  <RButton type="primary">Primary</RButton>
  <RButton type="info">Info</RButton>
  <RButton type="success">Success</RButton>
  <RButton type="warning">Warning</RButton>
  <RButton type="error">Error</RButton>
</RSpace>

### Filled

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton filled>Normal</RButton>
    <RButton type="primary" filled>Primary</RButton>
    <RButton type="info" filled>Info</RButton>
    <RButton type="success" filled>Success</RButton>
    <RButton type="warning" filled>Warning</RButton>
    <RButton type="error" filled>Error</RButton>
  </RSpace>
</template>
```

<RSpace>
  <RButton filled>Normal</RButton>
  <RButton type="primary" filled>Primary</RButton>
  <RButton type="info" filled>Info</RButton>
  <RButton type="success" filled>Success</RButton>
  <RButton type="warning" filled>Warning</RButton>
  <RButton type="error" filled>Error</RButton>
</RSpace>

### Rounded

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton rounded>Normal</RButton>
    <RButton type="primary" filled rounded>Primary Filled</RButton>
  </RSpace>
</template>
```

<RSpace>
  <RButton rounded>Normal</RButton>
  <RButton type="primary" filled rounded>Primary Filled</RButton>
</RSpace>

### Disabled

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton disabled>Normal</RButton>
    <RButton type="primary" filled disabled>Primary Filled</RButton>
  </RSpace>
</template>
```

<RSpace>
  <RButton disabled>Normal</RButton>
  <RButton type="primary" filled disabled>Primary Filled</RButton>
</RSpace>

### Block

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RButton block>Normal</RButton>
    <RButton type="primary" block>Primary</RButton>
  </RSpace>
</template>
```

<RSpace vertical>
  <RButton block>Normal</RButton>
  <RButton type="primary" filled block>Primary Filled</RButton>
</RSpace>

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['block', 'filled', 'rounded', 'tag', 'type']"
>
  <template #head:*="{ column }">{{ title(column) }}</template>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:block.type>
    <code>boolean</code>
  </template>
  <template #body:block.default>
    <code>false</code>
  </template>
  <template #body:block.description>
    Whether the button is displayed as block.
  </template>

  <template #body:filled.type>
    <code>boolean</code>
  </template>
  <template #body:filled.default>
    <code>false</code>
  </template>
  <template #body:filled.description>
    Whether the button is filled with its color.
  </template>

  <template #body:rounded.type>
    <code>boolean</code>
  </template>
  <template #body:rounded.default>
    <code>false</code>
  </template>
  <template #body:rounded.description>
    Whether the button is round.
  </template>

  <template #body:tag.type>
    <code>string</code>, but usually <code>'button' | 'a'</code>
  </template>
  <template #body:tag.default>
    <code>'button'</code>
  </template>
  <template #body:tag.description>
    HTML tag for rendering the button.
  </template>

  <template #body:type.type>
    <code>string</code>, but usually <code>'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'</code>
  </template>
  <template #body:type.default>
    <code>'default'</code>
  </template>
  <template #body:type.description>
    Button style type.
  </template>
</RTable>
