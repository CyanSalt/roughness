<script lang="ts" setup>
import { RDetails, RKey, RSpace, RTable, RTableColumn, RText } from 'roughness'

const data = [
  { [RKey]: 1, z: 2, element: 'He' },
  { [RKey]: 2, z: 10, element: 'Ne' },
  { [RKey]: 3, z: 18, element: 'Ar' },
]
</script>

# Table

Tic, tac, toe.

## Example

### Basic

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RTable, RTableColumn, RText } from 'roughness'
</script>

<template>
  <RTable :rows="['html', 'js', 'css']">
    <RTableColumn v-slot="{ row }" name="name">{{ row.toUpperCase() }}</RTableColumn>
    <RTableColumn v-slot="{ row }" name="age">
      <template v-if="row === 'html'">
        <RText type="primary">30</RText>
      </template>
      <template v-else-if="row === 'js'">28</template>
      <template v-else-if="row === 'css'">27</template>
    </RTableColumn>
  </RTable>
</template>
```

</RDetails>

<RTable :rows="['html', 'js', 'css']">
  <RTableColumn v-slot="{ row }" name="name">{{ row.toUpperCase() }}</RTableColumn>
  <RTableColumn v-slot="{ row }" name="age">
    <template v-if="row === 'html'">
      <RText type="primary">30</RText>
    </template>
    <template v-else-if="row === 'js'">28</template>
    <template v-else-if="row === 'css'">27</template>
  </RTableColumn>
</RTable>

### Header and Footer

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RTable, RTableColumn } from 'roughness'
</script>

<template>
  <RTable
    :rows="['unified', 'western', 'eastern']"
    :header="false"
    footer
  >
    <RTableColumn name="name">
      <template #default="{ row }">
        <template v-if="row === 'unified'">(unified)</template>
        <template v-else>{{ row.toUpperCase() }}</template>
      </template>
      <template #footer>Total</template>
    </RTableColumn>
    <RTableColumn name="life">
      <template #default="{ row }">
        <template v-if="row === 'unified'">27 BC–AD 395</template>
        <template v-else-if="row === 'western'">AD 395–476/480</template>
        <template v-else-if="row === 'eastern'">AD 395–1453</template>
      </template>
      <template #footer>1480</template>
    </RTableColumn>
  </RTable>
</template>
```

</RDetails>

<RTable
  :rows="['unified', 'western', 'eastern']"
  :header="false"
  footer
>
  <RTableColumn name="name">
    <template #default="{ row }">
      <template v-if="row === 'unified'">(unified)</template>
      <template v-else>{{ row.toUpperCase() }}</template>
    </template>
    <template #footer>Total</template>
  </RTableColumn>
  <RTableColumn name="life">
    <template #default="{ row }">
      <template v-if="row === 'unified'">27 BC–AD 395</template>
      <template v-else-if="row === 'western'">AD 395–476/480</template>
      <template v-else-if="row === 'eastern'">AD 395–1453</template>
    </template>
    <template #footer>1480</template>
  </RTableColumn>
</RTable>

### Filled

See [Responsive Graphics](/components/graphics#responsive).

### Data Driven

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RKey, RTable, RTableColumn, RText } from 'roughness'

const data = [
  { [RKey]: 1, z: 2, element: 'He' },
  { [RKey]: 2, z: 10, element: 'Ne' },
  { [RKey]: 3, z: 18, element: 'Ar' },
]
</script>

<template>
  <RTable :rows="data">
    <RTableColumn name="z" />
    <RTableColumn v-slot="{ row }" name="element">
      <template v-if="row[RKey] === 1">
        <RText type="primary">He</RText>
      </template>
      <template v-else>{{ row.element }}</template>
    </RTableColumn>
  </RTable>
</template>
```

</RDetails>

<RTable :rows="data">
  <RTableColumn name="z" />
  <RTableColumn v-slot="{ row }" name="element">
    <template v-if="row[RKey] === 1">
      <RText type="primary">He</RText>
    </template>
    <template v-else>{{ row.element }}</template>
  </RTableColumn>
</RTable>

## Usage

<RUsage file="src/table/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>

<RUsage file="src/table/table-column.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
