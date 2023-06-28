<script lang="ts" setup>
import { RTable, RText } from 'roughness'
</script>

# Table

Tic, tac, toe.

## Example

### Basic

```vue
<script lang="ts" setup>
import { RTable, RText } from 'roughness'
</script>

<template>
  <RTable
    :columns="['name', 'age']"
    :rows="['html', 'js', 'css']"
  >
    <template #head:*="{ column, helpers }">{{ helpers.startCase(column) }}</template>
    <template #body:*.name="{ row }">{{ row.toUpperCase() }}</template>
    <template #body:html.age>
      <RText type="primary">30</RText>
    </template>
    <template #body:js.age>28</template>
    <template #body:css.age>27</template>
  </RTable>
</template>
```

<RTable
  :columns="['name', 'age']"
  :rows="['html', 'js', 'css']"
>
  <template #head:*="{ column, helpers }">{{ helpers.startCase(column) }}</template>
  <template #body:*.name="{ row }">{{ row.toUpperCase() }}</template>
  <template #body:html.age>
    <RText type="primary">30</RText>
  </template>
  <template #body:js.age>28</template>
  <template #body:css.age>27</template>
</RTable>

### Without Header

```vue
<script lang="ts" setup>
import { RTable, RText } from 'roughness'
</script>

<template>
  <RTable
    :columns="['name', 'life']"
    :rows="['unified', 'western', 'eastern']"
    :header="false"
  >
    <template #body:*.name="{ row }">{{ row.toUpperCase() }}</template>
    <template #body:unified.name="{ row }">(unified)</template>
    <template #body:unified.life>27 BC–AD 395</template>
    <template #body:western.life>AD 395–476/480</template>
    <template #body:eastern.life>AD 395–1453</template>
  </RTable>
</template>
```

<RTable
  :columns="['name', 'life']"
  :rows="['unified', 'western', 'eastern']"
  :header="false"
>
  <template #body:*.name="{ row }">{{ row.toUpperCase() }}</template>
  <template #body:unified.name="{ row }">(unified)</template>
  <template #body:unified.life>27 BC–AD 395</template>
  <template #body:western.life>AD 395–476/480</template>
  <template #body:eastern.life>AD 395–1453</template>
</RTable>

## Usage

### Props

<RTable
  :columns="['name', 'type', 'default', 'description']"
  :rows="['columns', 'header', 'rows']"
>
  <template #head:*="{ column, helpers }">{{ helpers.startCase(column) }}</template>
  <template #body:*.name="{ row }">{{ row }}</template>

  <template #body:columns.type>
    <code>string[]</code>
  </template>
  <template #body:columns.default>
    <RText type="error">Required</RText>
  </template>
  <template #body:columns.description>
    Column keys. Recommended to use all lowercase letters and hyphens and underscores.
  </template>

  <template #body:header.type>
    <code>boolean</code>
  </template>
  <template #body:header.default>
    <code>true</code>
  </template>
  <template #body:header.description>
    Whether to display the table header.
  </template>

  <template #body:rows.type>
    <code>string[]</code>
  </template>
  <template #body:rows.default>
    <RText type="error">Required</RText>
  </template>
  <template #body:rows.description>
    Row keys. Recommended to use all lowercase letters and hyphens and underscores.
  </template>
</RTable>

### Slots

<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['head:_column_', 'head:*', 'body:_row_._column_', 'body:*._column_', 'body:_row_.*', 'body:*.*']"
>
  <template #head:*="{ column, helpers }">{{ helpers.startCase(column) }}</template>
  <template #body:*.name="{ row }">{{ row.replace(/_(\w+)_/g, '[$1]') }}</template>

  <template #body:head:_column_.description>
    Header cell in the column corresponding to <code>[column]</code>. Fallback to <code>head:*</code>.
  </template>

  <template #body:head:*.parameters>
    <code>{ column: string }</code>
  </template>
  <template #body:head:*.description>
    Header cell in each column.
  </template>

  <template #body:body:_row_._column_.description>
    Body cell in the row corresponding to <code>[row]</code> and the column corresponding to <code>[column]</code>. Fallback to <code>body:*.[column]</code>.
  </template>

  <template #body:body:*._column_.parameters>
    <code>{ row: string }</code>
  </template>
  <template #body:body:*._column_.description>
    Body cell in the column corresponding to <code>[column]</code>. Fallback to <code>body:[row].*</code>.
  </template>

  <template #body:body:_row_.*.parameters>
    <code>{ column: string }</code>
  </template>
  <template #body:body:_row_.*.description>
    Body cell in the row corresponding to <code>[row]</code>. Fallback to <code>body:*.*</code>.
  </template>

  <template #body:body:*.*.parameters>
    <code>{ row: string, column: string }</code>
  </template>
  <template #body:body:*.*.description>
    Body cell in each row and column.
  </template>
</RTable>
