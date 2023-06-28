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
    Column keys.
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
    Row keys.
  </template>
</RTable>
