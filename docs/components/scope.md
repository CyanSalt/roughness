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

<RSlotsTable>

  <RSlot name="default">

  <template #parameters>
    Attributes of the scope.
  </template>

  Content that needs to be render.

  </RSlot>

</RSlotsTable>
