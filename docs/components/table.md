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

<RTable :rows="['html', 'js', 'css']" data-example>
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
  data-example
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

<RTable :rows="data" data-example>
  <RTableColumn name="z" />
  <RTableColumn v-slot="{ row }" name="element">
    <template v-if="row[RKey] === 1">
      <RText type="primary">He</RText>
    </template>
    <template v-else>{{ row.element }}</template>
  </RTableColumn>
</RTable>

## Usage

### Props

<RPropsTable>

  <RProp name="columns">

  <template #type>

  `(string | number | RValue)[] | number`

  </template>

  <template #default-value>
    </template>

  Column keys or data.

  See [List Rendering](/guide/specs#list-rendering).

  </RProp>

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

  <RProp name="reactions">

  <template #type>

  `string[]`

  </template>

  <template #default-value>

  `[]`

  </template>

  States that trigger graphics redrawing.

  See [Reactions](/guide/theme#reactions).

  </RProp>

  <RProp name="rows">

  <template #type>

  `(string | number | RValue)[] | number`

  </template>

  <template #default-value>
    </template>

  Row keys or data.

  See [List Rendering](/guide/specs#list-rendering).

  </RProp>

</RPropsTable>

### Slots

<RSlotsTable>

  <RSlot name="default">

  Extra content for the table. For example `<caption>` or `<colgroup>`, etc.

  </RSlot>

  <RSlot name="header:_column_">

  Header cell in the column corresponding to `[column]`. Fallback to `header:*`.

  </RSlot>

  <RSlot name="header:*">

  <template #parameters>

  `{ column: string }`

  </template>

  Header cell in each column. Defaults to `startCase(keyOf(column))`.

  </RSlot>

  <RSlot name="body:_row_:_column_">

  Body cell in the row corresponding to `[row]` and the column corresponding to `[column]`. Fallback to `body:*:[column]`:

  </RSlot>

  <RSlot name="body:*:_column_">

  <template #parameters>

  `{ row: string }`

  </template>

  Body cell in the column corresponding to `[column]`. Fallback to `body:[row]:*`:

  </RSlot>

  <RSlot name="body:_row_:*">

  <template #parameters>

  `{ column: string }`

  </template>

  Body cell in the row corresponding to `[row]`. Fallback to `body:*:*`:

  </RSlot>

  <RSlot name="body:*:*">

  <template #parameters>

  `{ row: string, column: string }`

  </template>

  Body cell in each row and column. Defaults to `row[keyOf(column)]` if `row` is an object.

  </RSlot>

  <RSlot name="footer:_column_">

  Footer cell in the column corresponding to `[column]`. Fallback to `footer:*`.

  </RSlot>

  <RSlot name="footer:*">

  <template #parameters>

  `{ column: string }`

  </template>

  Footer cell in each column.

  </RSlot>

</RSlotsTable>

### Styles

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
