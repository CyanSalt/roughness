<script lang="ts" setup>
import { RDetails, RInput, RSpace, RTable } from 'roughness'
import { ref } from 'vue'

let number = ref(5);
let poem = ref('Because I could not stop for Death,\nHe kindly stopped for me;\nThe carriage held but just ourselves\nAnd Immortality. ')
</script>

# Input

It was never the leader of Russia.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RInput } from 'roughness'
</script>

<template>
  <RInput placeholder="Where is the quick fox?" />
</template>
```

</RDetails>

<RInput placeholder="Where is the quick fox?" />

### Multiline

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RInput } from 'roughness'
import { ref } from 'vue'

let poem = ref('Because I could not stop for Death,\nHe kindly stopped for me;\nThe carriage held but just ourselves\nAnd Immortality. ')
</script>

<template>
  <RInput v-model="poem" :lines="5" />
</template>
```

</RDetails>

<RInput v-model="poem" :lines="5" />

### Number

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RInput } from 'roughness'
import { ref } from 'vue'

let number = ref(5);
</script>

<template>
  <RSpace>
    <RInput v-model.number="number" :style="{ 'margin-inline-start': `${number}em` }" />
  </RSpace>
</template>
```

</RDetails>

<RSpace>
  <RInput v-model.number="number" :style="{ 'margin-inline-start': `${number}em` }" />
</RSpace>

### Disabled

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RInput, RSpace } from 'roughness'

</script>

<template>
  <RSpace vertical>
    <RInput model-value="If you remix, transform, or build upon the material, you may not distribute the modified material." readonly />
    <RInput model-value="You may not remove or alter the substance of any license notices contained within the Source Code Form of the Covered Software" disabled />
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RInput model-value="If you remix, transform, or build upon the material, you may not distribute the modified material." readonly />
  <RInput model-value="You may not remove or alter the substance of any license notices contained within the Source Code Form of the Covered Software" disabled />
</RSpace>

### Types

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RInput, RSpace } from 'roughness'

</script>

<template>
  <RSpace vertical>
    <RInput type="date" />
  </RSpace>
</template>
```

</RDetails>

<RSpace vertical>
  <RInput type="date" />
</RSpace>

## Usage

### Props

<RPropsTable>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="lines">

  <template #type>

  `number`

  </template>

  <template #default-value>

  `1`

  </template>

  Line count of the input.

  </RProp>

  <RProp name="model-value">

  <template #type>

  `string`

  </template>

  Value of the input text.

  </RProp>

</RPropsTable>

### Events

<REventsTable>

  <REvent name="update:model-value">

  <template #parameters>

  `(value: boolean)`

  </template>

  Callback function triggered when the value is changed.

  </REvent>

</REventsTable>

### Styles

<RStylesTable>

  <template #name="{ value }">--r-input-{{ value }}</template>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-color)`

  </template>

  Color of the input border.

  </RStyle>

  <RStyle name="border-width">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `2px` when focused or active, `1px` else

  </template>

  Width of the input border.

  </RStyle>

  <RStyle name="border-dash">

  <template #values>

  `<length> +` or `none`

  </template>

  <template #default-value>

  `8px` when hovered, `none` else

  </template>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the input border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </RStyle>

  <RStyle name="inline-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `210px`

  </template>

  Size of the input.

  </RStyle>

</RStylesTable>
