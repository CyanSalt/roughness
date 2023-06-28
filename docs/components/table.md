<script lang="ts" setup>
import { RTable, RText } from 'roughness'
import { title } from '../utils/helpers'
</script>

# Table

## Example

```vue
<script lang="ts" setup>
import { RTable, RText } from 'roughness'

function title(text: string) {
  return text.slice(0, 1).toUpperCase() + text.slice(1)
}
</script>

<template>
  <RTable
    :columns="['name', 'age']"
    :rows="['html', 'js', 'css']"
  >
    <template #head:*="{ column }">{{ title(column) }}</template>
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
  <template #head:*="{ column }">{{ title(column) }}</template>
  <template #body:*.name="{ row }">{{ row.toUpperCase() }}</template>
  <template #body:html.age>
    <RText type="error">30</RText>
  </template>
  <template #body:js.age>28</template>
  <template #body:css.age>27</template>
</RTable>
