<script lang="ts" setup>
import { RBox, RKey, RSpace, RTable, RTableColumn, RText } from 'roughness'

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

::: details Show Code

```vue
<script lang="ts" setup>
import { RTable, RTableColumn, RText } from 'roughness'
</script>

<template>
  <RTable :rows="['html', 'js', 'css']">
    <RTableColumn v-slot="{ row }" name="name">{{ row.toUpperCase() }}</RTableColumn>
    <RTableColumn v-slot="{ row }" name="age">
      <template v-if="row === 'html'">
        <RText color="primary">30</RText>
      </template>
      <template v-else-if="row === 'js'">28</template>
      <template v-else-if="row === 'css'">27</template>
    </RTableColumn>
  </RTable>
</template>
```

:::

<RTable :rows="['html', 'js', 'css']">
  <RTableColumn v-slot="{ row }" name="name">{{ row.toUpperCase() }}</RTableColumn>
  <RTableColumn v-slot="{ row }" name="age">
    <template v-if="row === 'html'">
      <RText color="primary">30</RText>
    </template>
    <template v-else-if="row === 'js'">28</template>
    <template v-else-if="row === 'css'">27</template>
  </RTableColumn>
</RTable>

### Header and Footer

::: details Show Code

```vue
<script lang="ts" setup>
import { RTable, RTableColumn } from 'roughness'
</script>

<template>
  <RTable
    :rows="['unified', 'western', 'eastern']"
    :header="false"
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

:::

<RTable
  :rows="['unified', 'western', 'eastern']"
  :header="false"
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

::: details Show Code

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
        <RText color="primary">He</RText>
      </template>
      <template v-else>{{ row.element }}</template>
    </RTableColumn>
  </RTable>
</template>
```

:::

<RTable :rows="data">
  <RTableColumn name="z" />
  <RTableColumn v-slot="{ row }" name="element">
    <template v-if="row[RKey] === 1">
      <RText color="primary">He</RText>
    </template>
    <template v-else>{{ row.element }}</template>
  </RTableColumn>
</RTable>

### HTML Content

::: details Show Code

```vue
<script lang="ts" setup>
import { RBox, RTable } from 'roughness'
</script>

<template>
  <RTable>
    <template #header>
      <tr>
        <RBox tag="th" filled :style="{ '--r-box-border-width': '0px' }">Value</RBox>
        <RBox tag="th" filled :style="{ '--r-box-border-width': '0px' }">Percentage</RBox>
      </tr>
    </template>
    <template #body>
      <tr>
        <td>20</td>
        <td>=A1/SUM(A1:A2)</td>
      </tr>
      <tr>
        <td>80</td>
        <td>=A2/SUM(A1:A2)</td>
      </tr>
    </template>
  </RTable>
</template>
```

:::

<RTable>
  <template #header>
    <tr>
      <RBox tag="th" :stroked="false" filled>Value</RBox>
      <RBox tag="th" :stroked="false" filled>Percentage</RBox>
    </tr>
  </template>
  <template #body>
    <tr>
      <td>20</td>
      <td>=A1/SUM(A1:A2)</td>
    </tr>
    <tr>
      <td>80</td>
      <td>=A2/SUM(A1:A2)</td>
    </tr>
  </template>
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
