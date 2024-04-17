<script lang="ts" setup>
import { RCheckbox, RSelect, RSpace } from 'roughness'
</script>

# Select

We never choose anything at all. Things happen. Or not.

## Example

### Basic

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox, RSelect } from 'roughness'
</script>

<template>
  <RSelect placeholder="Test engineer rank">
    <RCheckbox value="stable" />
    <RCheckbox value="beta" />
    <RCheckbox value="dev" />
    <RCheckbox value="canary" />
  </RSelect>
</template>
```

:::

<RSelect placeholder="Test engineer rank">
  <RCheckbox value="stable" />
  <RCheckbox value="beta" />
  <RCheckbox value="dev" />
  <RCheckbox value="canary" />
</RSelect>

### Multiple

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox, RSelect } from 'roughness'
</script>

<template>
  <RSelect multiple placeholder="Exodia">
    <RCheckbox value="Right Arm" />
    <RCheckbox value="Left Arm" />
    <RCheckbox value="Right Leg" />
    <RCheckbox value="Left Leg" />
  </RSelect>
</template>
```

:::

<RSelect multiple placeholder="Exodia">
  <RCheckbox value="Right Arm" />
  <RCheckbox value="Left Arm" />
  <RCheckbox value="Right Leg" />
  <RCheckbox value="Left Leg" />
</RSelect>

### State

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox, RSpace, RSelect } from 'roughness'
</script>

<template>
  <RSpace>
    <RSelect :model-value="[1]" multiple disabled>
      <RCheckbox :value="1" label="Basic User Info" />
    </RSelect>
    <RSelect loading placeholder="Arsenal" />
  </RSpace>
</template>
```

:::

<RSpace>
  <RSelect :model-value="[1]" multiple disabled>
    <RCheckbox :value="1" label="Basic User Info" />
  </RSelect>
  <RSelect loading placeholder="Arsenal" />
</RSpace>

### Clearable

::: details Show Code

```vue
<script lang="ts" setup>
import { RCheckbox, RSelect } from 'roughness'
</script>

<template>
  <RSelect clearable placeholder="Blue time">
    <RCheckbox value="Spring" />
    <RCheckbox value="Summer" />
    <RCheckbox value="Autumn" />
    <RCheckbox value="Winter" />
  </RSelect>
</template>
```

:::

<RSelect clearable placeholder="Blue time">
  <RCheckbox value="Spring" />
  <RCheckbox value="Summer" />
  <RCheckbox value="Autumn" />
  <RCheckbox value="Winter" />
</RSelect>

### Tree

See [Checkbox Tree](/components/checkbox#tree).

## Usage

<RUsage file="src/select/index.vue">

  <template #title="{ title }">

  ### {{ title }}

  </template>

</RUsage>
