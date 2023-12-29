<script lang="ts" setup>
import { RDetails, RKey, RSpace, RTable, RText } from 'roughness'

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
import { RTable, RText } from 'roughness'
</script>

<template>
  <RTable
    :columns="['name', 'age']"
    :rows="['html', 'js', 'css']"
  >
    <template #body:*:name="{ row }">{{ row.toUpperCase() }}</template>
    <template #body:html:age>
      <RText type="primary">30</RText>
    </template>
    <template #body:js:age>28</template>
    <template #body:css:age>27</template>
  </RTable>
</template>
```

</RDetails>

<RTable
  :columns="['name', 'age']"
  :rows="['html', 'js', 'css']"
>
  <template #body:*:name="{ row }">{{ row.toUpperCase() }}</template>
  <template #body:html:age>
    <RText type="primary">30</RText>
  </template>
  <template #body:js:age>28</template>
  <template #body:css:age>27</template>
</RTable>

### Header and Footer

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RTable } from 'roughness'
</script>

<template>
  <RTable
    :columns="['name', 'life']"
    :rows="['unified', 'western', 'eastern']"
    :header="false"
    footer
  >
    <template #body:*:name="{ row }">{{ row.toUpperCase() }}</template>
    <template #body:unified:name="{ row }">(unified)</template>
    <template #body:unified:life>27 BC–AD 395</template>
    <template #body:western:life>AD 395–476/480</template>
    <template #body:eastern:life>AD 395–1453</template>
    <template #footer:name>Total</template>
    <template #footer:life>1480</template>
  </RTable>
</template>
```

</RDetails>

<RTable
  :columns="['name', 'life']"
  :rows="['unified', 'western', 'eastern']"
  :header="false"
  footer
>
  <template #body:*:name="{ row }">{{ row.toUpperCase() }}</template>
  <template #body:unified:name="{ row }">(unified)</template>
  <template #body:unified:life>27 BC–AD 395</template>
  <template #body:western:life>AD 395–476/480</template>
  <template #body:eastern:life>AD 395–1453</template>
  <template #footer:name>Total</template>
  <template #footer:life>1480</template>
</RTable>

### Filled

See [Responsive Graphics](/components/graphics#responsive).

### Data Driven

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RKey, RTable, RText } from 'roughness'

const data = [
  { [RKey]: 1, z: 2, element: 'He' },
  { [RKey]: 2, z: 10, element: 'Ne' },
  { [RKey]: 3, z: 18, element: 'Ar' },
]
</script>

<template>
  <RTable :columns="['z', 'element']" :rows="data">
    <template #body:1:element>
      <RText type="primary">He</RText>
    </template>
  </RTable>
</template>
```

</RDetails>

<RTable :columns="['z', 'element']" :rows="data">
  <template #body:1:element>
    <RText type="primary">He</RText>
  </template>
</RTable>

## Usage

### Props

<RSpace overflow>
<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['columns', 'footer', 'graphics-options', 'header', 'reactions', 'rows']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:columns:type>

  `(string | number | RValue)[] | number`

  </template>
  <template #body:columns:default>
    <RText type="error">Required</RText>
  </template>
  <template #body:columns:description>

  Column keys or data.

  See [List Rendering](/guide/specs#list-rendering).

  </template>

  <template #body:footer:type>

  `boolean`

  </template>
  <template #body:footer:default>

  `false`

  </template>
  <template #body:footer:description>
    Whether to display the table footer.
  </template>

  <template #body:graphics-options:type>

  `import('roughjs/bin/core').Options`

  </template>
  <template #body:graphics-options:description>

  [Options for Rough.js](https://github.com/rough-stuff/rough/wiki#options).

  See [Graphics Configuration](/components/graphics#component-prop).

  </template>

  <template #body:header:type>

  `boolean`

  </template>
  <template #body:header:default>

  `true`

  </template>
  <template #body:header:description>
    Whether to display the table header.
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

  <template #body:rows:type>

  `(string | number | RValue)[] | number`

  </template>
  <template #body:rows:default>
    <RText type="error">Required</RText>
  </template>
  <template #body:rows:description>

  Row keys or data.

  See [List Rendering](/guide/specs#list-rendering).

  </template>
</RTable>
</RSpace>

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default', 'header:_column_', 'header:*', 'body:_row_:_column_', 'body:*:_column_', 'body:_row_:*', 'body:*:*', 'footer:_column_', 'footer:*']"
>
  <template #body:*:name="{ row }">{{ row.replace(/_(\w+)_/g, '[$1]') }}</template>

  <template #body:default:description>

  Extra content for the table. For example `<caption>` or `<colgroup>`, etc.

  </template>

  <template #body:header:_column_:description>

  Header cell in the column corresponding to `[column]`. Fallback to `header:*`.

  </template>

  <template #body:header:*:parameters>

  `{ column: string }`

  </template>
  <template #body:header:*:description>

  Header cell in each column. Defaults to `startCase(keyOf(column))`.

  </template>

  <template #body:body:_row_:_column_:description>

  Body cell in the row corresponding to `[row]` and the column corresponding to `[column]`. Fallback to `body:*:[column]`:

  </template>

  <template #body:body:*:_column_:parameters>

  `{ row: string }`

  </template>
  <template #body:body:*:_column_:description>

  Body cell in the column corresponding to `[column]`. Fallback to `body:[row]:*`:

  </template>

  <template #body:body:_row_:*:parameters>

  `{ column: string }`

  </template>
  <template #body:body:_row_:*:description>

  Body cell in the row corresponding to `[row]`. Fallback to `body:*:*`:

  </template>

  <template #body:body:*:*:parameters>

  `{ row: string, column: string }`

  </template>
  <template #body:body:*:*:description>

  Body cell in each row and column. Defaults to `row[keyOf(column)]` if `row` is an object.

  </template>

  <template #body:footer:_column_:description>

  Footer cell in the column corresponding to `[column]`. Fallback to `footer:*`.

  </template>

  <template #body:footer:*:parameters>

  `{ column: string }`

  </template>
  <template #body:footer:*:description>

  Footer cell in each column.

  </template>
</RTable>
</RSpace>

### Styles

<RSpace overflow>
<RTable
  :columns="['name', 'values', 'default', 'description']"
  :rows="['border-color']"
>
  <template #body:*:name="{ row }">--r-table-{{ row }}</template>

  <template #body:border-color:values>

  `<color>`

  </template>
  <template #body:border-color:default>

  `var(--r-common-text-color)`

  </template>
  <template #body:border-color:description>
    Color of the table border.
  </template>
</RTable>
</RSpace>
