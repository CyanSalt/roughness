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

<RPropsTable>

  <RProp name="tag">

  <template #type>

  `string`, but usually `'a' | 'button'`

  </template>

  <template #default-value>

  `'a'`

  </template>

  HTML tag for rendering the link.

  </RProp>

  <RProp name="...">

  See [Text Props](/components/text#props).

  Unlike Text, the default value of Link's `type` is `primary`.

  </RProp>

</RPropsTable>

### Slots

<RSlotsTable>

  <RSlot name="default">
    Content of the link.
  </RSlot>

</RSlotsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-link-{{ value }}</template>

  <RStyle name="underline-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `3px` when focused or active, `2px` else

  </template>

  Width of the link underline. Only visible when hovered, or with the `href` attribute.

  </RStyle>

  <RStyle name="...">

  <template #name>...</template>

  See [Text Styles](/components/text#styles).

  </RStyle>

</RStylesTable>
