<script lang="ts" setup>
import { RDetails, RLink, RScope, RSpace, RTable } from 'roughness'

function performTimeConsumingOperation() {
  return 1
}
</script>

# Scope

"-scope" is used to make terms denoting an instrument used for viewing or examination.

## Example

<RDetails>
  <template #summary>Show Code</template>

```vue
<script lang="ts" setup>
import { RLink, RScope } from 'roughness'

function performTimeConsumingOperation() {
  // ...
  return 1
}
</script>

<template>
  <RScope v-slot="{ result }" :result="performTimeConsumingOperation()">
    Result is: <RLink :href="`#result-${result}`">{{ result }}</RLink>
  </RScope>
</template>
```

</RDetails>

<RScope v-slot="{ result }" :result="performTimeConsumingOperation()">
  Result is: <RLink :href="`#result-${result}`">{{ result }}</RLink>
</RScope>

## Usage

### Slots

<RSpace overflow>
<RTable
  :columns="['name', 'parameters', 'description']"
  :rows="['default']"
>
  <template #body:*:name="{ row }">{{ row }}</template>

  <template #body:default:parameters>
    Attributes of the scope.
  </template>
  <template #body:default:description>
    Content that needs to be render.
  </template>
</RTable>
</RSpace>
