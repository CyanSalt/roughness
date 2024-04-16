<script lang="ts" setup>
import { RDetails, RLink, RSpace, RTable } from 'roughness'
</script>

# Link

The blood moon rises once again. Please be careful, Link...

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RLink>This way, sir.</RLink>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RLink>This way, sir.</RLink>
</RSpace>

### Color and Size

See [Text](/components/text).

### With `href` attribute

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RLink href="https://en.wikipedia.org/wiki/Telephone">Start</RLink>
    <RLink type="error" href="https://en.wikipedia.org/wiki/Nuclear_weapon">End</RLink>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RLink href="https://en.wikipedia.org/wiki/Telephone">Start</RLink>
  <RLink type="error" href="https://en.wikipedia.org/wiki/Nuclear_weapon">End</RLink>
</RSpace>

### As Button

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RLink, RSpace } from 'roughness'
</script>

<template>
  <RSpace>
    <RLink tag="button" type="primary">Confirm cancelling</RLink>
    <RLink tag="button" type="error">Cancel confirming</RLink>
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RLink tag="button" type="primary">Confirm cancelling</RLink>
  <RLink tag="button" type="error">Cancel confirming</RLink>
</RSpace>

See also [Button](/components/button#tag).

## Usage

<RUsage file="src/link/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Text Props](/components/text#props).

  </RProp>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Text Styles](/components/text#styles).

  </RStyle>

  </template>

</RUsage>
