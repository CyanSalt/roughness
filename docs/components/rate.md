<script lang="ts" setup>
import { Heart } from 'lucide'
import { RDetails, RRate, RSpace, RTable } from 'roughness'
import { ref } from 'vue'

let rate = ref(3)
</script>

# Rate

Only God can judge me.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RRate } from 'roughness'
import { ref } from 'vue'

let rate = ref(3)
</script>

<template>
  <RRate v-model="rate" />
</template>
```

</RDetails>

<RRate v-model="rate" />

### Shape

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { Heart } from 'lucide'
import { RRate } from 'roughness'
</script>

<template>
  <RRate :shape="Heart" />
</template>
```

</RDetails>

<RRate :shape="Heart" />

## Usage

### Props

<RPropsTable>

  <RProp name="model-value">

  <template #type>

  `number`

  </template>

  Value of the rate.

  </RProp>

  <RProp name="shape">

  <template #type>

  `IconNode`

  </template>

  <template #default-value>

  `import('lucide').Star`

  </template>

  Shape icon of the rate.

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

  <template #name="{ value }">--r-rate-{{ value }}</template>

  <RStyle name="color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-primary-color)`

  </template>

  Color of the rate control when active.

  </RStyle>

  <RStyle name="control-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `var(--r-common-line-height)`

  </template>

  Size of the rate control.

  </RStyle>

  <RStyle name="gap-size">

  <template #values>

  `<length>`

  </template>

  <template #default-value>

  `4px`

  </template>

  Gap size of the rate control.

  </RStyle>

</RStylesTable>
