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

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['tag', '...']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:tag:type>

  `string`, but usually `'a' | 'button'`

  </template>
  <template #body:tag:default>

  `'a'`

  </template>
  <template #body:tag:description>
    HTML tag for rendering the link.
  </template>

  <template #body:...:description>

  See [Text Props](/components/text#props).

  Unlike Text, the default value of Link's `type` is `primary`.

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['underline-width', '...']"
>
  <template #body:*:name="{ row }">--r-link-{{ row }}</template>

  <template #body:underline-width:values>

  `<length>`

  </template>
  <template #body:underline-width:default>

  `3px` when focused or active, `2px` else

  </template>
  <template #body:underline-width:description>

  Width of the link underline. Only visible when hovered, or with the `href` attribute.

  </template>

  <template #body:....name>..:</template>
  <template #body:...:description>

  See [Text Styles](/components/text#styles).

  </template>
</RTable>
</RSpace>
