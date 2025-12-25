<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup, RSpace, RText } from 'roughness'
import { ref } from 'vue'

const checked = ref(true)
const values = ref<string[]>([])
const value = ref<string | undefined>()
</script>

# Checkbox

Check-ch-check-check-check-ch-check it out. What-wha-what-what-what's it all about.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox } from 'roughness'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <RSpace vertical>
    <RCheckbox v-model:checked="checked">Are you OK, Indian MI fans?</RCheckbox>
    <RText>Oh {{ checked ? 'yes!' : 'no...' }}</RText>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RCheckbox v-model:checked="checked">Are you OK, Indian MI fans?</RCheckbox>
  <RText>Oh {{ checked ? 'yes!' : 'no...' }}</RText>
</RSpace>

### Group

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup } from 'roughness'
import { ref } from 'vue'

const values = ref<string[]>([])
</script>

<template>
  <RSpace vertical>
    <RCheckboxGroup v-model="values" vertical>
      <RCheckbox value="Peggy" />
      <RCheckbox value="George" />
      <RCheckbox value="Mummy" />
      <RCheckbox value="Daddy" />
    </RCheckboxGroup>
    <RText>{{ values.length ? values.join(', ') : 'Nobody' }} {{ values.length > 1 ? 'are' : 'is' }} going hiking.</RText>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RCheckboxGroup v-model="values" vertical>
    <RCheckbox value="Peggy" />
    <RCheckbox value="George" />
    <RCheckbox value="Mummy" />
    <RCheckbox value="Daddy" />
  </RCheckboxGroup>
  <RText>{{ values.length ? values.join(', ') : 'Nobody' }} {{ values.length > 1 ? 'are' : 'is' }} going hiking.</RText>
</RSpace>

### Radio

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup } from 'roughness'
import { ref } from 'vue'

const value = ref<string | undefined>()
</script>

<template>
  <RSpace vertical>
    <RCheckboxGroup v-model="value" :multiple="false">
      <RCheckbox value="Peggy" />
      <RCheckbox value="George" />
      <RCheckbox value="Mummy" />
      <RCheckbox value="Daddy" />
    </RCheckboxGroup>
    <RText>{{ value ?? 'Nobody' }} is going hiking.</RText>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RCheckboxGroup v-model="value" :multiple="false">
    <RCheckbox value="Peggy" />
    <RCheckbox value="George" />
    <RCheckbox value="Mummy" />
    <RCheckbox value="Daddy" />
  </RCheckboxGroup>
  <RText>{{ value ?? 'Nobody' }} is going hiking.</RText>
</RSpace>

### State

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox, RSpace } from 'roughness'

</script>

<template>
  <RSpace vertical>
    <RCheckbox disabled>I can't move.</RCheckbox>
    <RCheckbox indeterminate>Maybe I should make a decision sooner.</RCheckbox>
    <RCheckboxGroup vertical disabled>
      <RCheckbox value="1984" />
      <RCheckbox value="Ugly Americans" />
    </RCheckboxGroup>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RCheckbox checked disabled>I can't move.</RCheckbox>
  <RCheckbox indeterminate>Maybe I should make a decision sooner.</RCheckbox>
  <RCheckboxGroup vertical disabled>
    <RCheckbox value="1984" />
    <RCheckbox value="Ugly Americans" />
  </RCheckboxGroup>
</RSpace>

### Tree

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox, RCheckboxGroup } from 'roughness'
</script>

<template>
  <RSpace vertical>
    <RCheckboxGroup vertical :multiple="false">
      <RCheckbox value="Peggy's Family">
        <RSpace vertical>
          <RText>Peggy's Family</RText>
          <RCheckbox value="Peggy" />
          <RCheckbox value="George" />
          <RCheckbox value="Mummy" />
          <RCheckbox value="Daddy" />
        </RSpace>
      </RCheckbox>
      <RCheckbox value="Grandpa's Family">
        <RSpace vertical>
          <RText>Grandpa's Family</RText>
          <RCheckbox value="Grandpa" />
          <RCheckbox value="Granny" />
        </RSpace>
      </RCheckbox>
    </RCheckboxGroup>
  </RSpace>
</template>
```

:::

<RSpace vertical>
  <RCheckboxGroup vertical :multiple="false">
    <RCheckbox value="Peggy's Family">
      <RSpace vertical>
        <RText>Peggy's Family</RText>
        <RCheckbox value="Peggy" />
        <RCheckbox value="George" />
        <RCheckbox value="Mummy" />
        <RCheckbox value="Daddy" />
      </RSpace>
    </RCheckbox>
    <RCheckbox value="Grandpa's Family">
      <RSpace vertical>
        <RText>Grandpa's Family</RText>
        <RCheckbox value="Grandpa" />
        <RCheckbox value="Granny" />
      </RSpace>
    </RCheckbox>
  </RCheckboxGroup>
</RSpace>

## Usage

<RUsage file="src/checkbox/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Space Props](/components/space#props).

  Unlike Space, the default value of Checkbox's `tag` is `label`.

  </RProp>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Space Styles](/components/space#styles).

  </RStyle>

  </template>

</RUsage>

<RUsage file="src/checkbox/checkbox-group.vue" styles>

  <template #title="{ title }">

  ### {{ title }}

  </template>

  <template #props>

  <RProp name="...">

  See [Space Props](/components/space#props).

  </RProp>

  </template>

  <template #styles>

  <RStyle name="...">

  See [Space Styles](/components/space#styles).

  </RStyle>

  </template>

</RUsage>
