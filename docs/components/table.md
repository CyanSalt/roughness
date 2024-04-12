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

### Table Props

<RPropsTable>

  <RProp name="footer">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `false`

  </template>

  Whether to display the table footer.

  </RProp>

  <RProp name="graphics-options">

  <template #type>

  `import('roughjs/bin/core').Options`

  </template>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </RProp>

  <RProp name="header">

  <template #type>

  `boolean`

  </template>

  <template #default-value>

  `true`

  </template>

  Whether to display the table header.

  </RProp>

  <RProp name="rows">

  <template #type>

  `RValueOrKey[]`

  </template>

  <template #default-value>
    <RText type="error">Required</RText>
  </template>

  Row keys or data.

  See [List Rendering](/guide/specs#list-rendering).

  </RProp>

</RPropsTable>

### Table Slots


<RSlotsTable>

  <RSlot name="default">

  Content for the table. You can also add `<caption>` or `<colgroup>` in addition to one or more TableColumn.

  </RSlot>

</RSlotsTable>

### Table Styles

<RStylesTable>

  <template #name="{ value }">--r-table-{{ value }}</template>

  <RStyle name="border-color">

  <template #values>

  `<color>`

  </template>

  <template #default-value>

  `var(--r-common-text-color)`

  </template>

  Color of the table border.

  </RStyle>

</RStylesTable>

### TableColumn Props

<RPropsTable>

  <RProp name="name">

  <template #type>

  `string`

  </template>

  <template #default-value>
    <RText type="error">Required</RText>
  </template>

  Column name.

  </RProp>

</RPropsTable>

### TableColumn Slots

<RSlotsTable>

  <RSlot name="header">

  Header cell in the column. Defaults to `startCase(keyOf(column))`.

  </RSlot>

  <RSlot name="default">

  <template #parameters>

  `{ row: RValueOrKey }`

  </template>

  Body cell in each row of the column. Defaults to `row[name]` if `row` is an object.

  </RSlot>

  <RSlot name="footer">

  Footer cell in the column.

  </RSlot>

</RSlotsTable>
