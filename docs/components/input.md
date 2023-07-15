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
  <RSpace overflow>
    <RInput v-model.number="number" :style="{ 'margin-inline-start': `${number}em` }" />
  </RSpace>
</template>
```

</RDetails>

<RSpace overflow>
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

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['graphics-options', 'lines', 'model-value', 'reactions']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:lines:type>

  `number`

  </template>
  <template #body:lines:default>

  `1`

  </template>
  <template #body:lines:description>
    Line count of the input.
  </template>

  <template #body:model-value:type>

  `string`

  </template>
  <template #body:model-value:description>
    Value of the input text.
  </template>

  <template #body:reactions:type>

  `string[]`

  </template>
  <template #body:reactions:default>

  `[]`

  </template>
  <template #body:reactions:description>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </template>
</RTable>
</RSpace>

### Event

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['update:model-value']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:update:model-value:parameters>

  `(value: boolean)`

  </template>
  <template #body:update:model-value:description>
    Callback function triggered when the value is changed.
  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['border-color', 'border-width', 'border-dash', 'line-height']"
>
  <template #body:*:name="{ row }">--r-input-{{ row }}</template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color:description>
    Color of the input border.
  </template>

  <template #body:border-width:values>

  `<length>`

  </template>
  <template #body:border-width:default>

  `2px` when focused or active, `1px` else

  </template>
  <template #body:border-width:description>
    Width of the input border.
  </template>

  <template #body:border-dash:values>

  `<length> +` or `none`

  </template>
  <template #body:border-dash:default>

  `8px` when hovered, `none` else

  </template>
  <template #body:border-dash:description>

  List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the input border.

  An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.

  See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).

  </template>

  <template #body:line-height:values>

  `<length>`

  </template>
  <template #body:line-height:default>

  `calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height))`

  </template>
  <template #body:line-height:description>
    Line height of the input.
  </template>
</RTable>
</RSpace>
