<script lang="ts" setup>
import { RButton, RLink, RSpace, RTable } from 'roughness'
import { title } from '../utils/helpers'
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
    <RButton rounded>Enter the Pipe</RButton>
    <RButton type="error" filled rounded>Eat the Mushroom</RButton>
  </RSpace>
</template>
```

<RSpace>
  <RButton rounded>Enter the Pipe</RButton>
  <RButton type="error" filled rounded>Eat the Mushroom</RButton>
</RSpace>

### Disabled

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RButton disabled>Train AlphaGo</RButton>
    <RButton type="primary" filled disabled>Let there be light</RButton>
  </RSpace>
</template>
```

<RSpace>
  <RButton disabled>Train AlphaGo</RButton>
  <RButton type="primary" filled disabled>Let there be light</RButton>
</RSpace>

### Block

```vue
<script lang="ts" setup>
import { RButton, RSpace } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RButton block>Switch Account</RButton>
    <RButton type="error" block>Log out of Chaos</RButton>
  </RSpace>
</template>
```

<RSpace vertical>
  <RButton block>Switch Account</RButton>
  <RButton type="error" block>Log out of Chaos</RButton>
</RSpace>

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['block', 'filled', 'html-type', 'rounded', 'tag', 'type']"
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

  <template #body:html-type.type>
    <RLink
      href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement#htmlbuttonelement.type"
      target="_blank"
      rel="noopener noreferrer"
    >
      <code>'submit' | 'reset' | 'button'</code>
    </RLink>
  </template>
  <template #body:html-type.description>
    The <code>type</code> property of <code>HTMLButtonElement</code>.
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
