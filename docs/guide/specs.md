<script lang="ts" setup>
import { RDetails, RKey, RList } from 'roughness'

const data = [{ [RKey]: 'darwin', name: 'macOS' }, { [RKey]: 'win32', name: 'Windows' }]
</script>

# Specs

Most components of Roughness follow similar specifications. Understanding these specifications will help you get started development quickly.

## List Rendering

For list rendering components (including `RList`, `RTable` and `RTabs`), the list prop used to control the rendered items can be in any of the following three forms:

- `number`, which represents the number of items to render.
     - In this case, slots will accept the ordinal numbers starting from `1`. See [`v-for` with a Range](https://vuejs.org/guide/essentials/list.html#v-for-with-a-range).

    <RDetails>
      <template #summary>Show Code</template>

    ```vue
    <script lang="ts" setup>
    import { RList } from 'roughness'
    </script>

    <template>
      <RList :items="2">
        <template #*="{ item }">{{ item * 2 }}</template>
      </RList>
    </template>
    ```

    </RDetails>

    <RList :items="2">
      <template #*="{ item }">{{ item * 2 }}</template>
    </RList>

- `(string | number)[]`, where each item is the key of the rendered item. This means that keeping keys consistent can lead to better performance in list sorting, deletion, etc.
     - In this case, slots will accept the keys of type `string | number`.
     - Recommended to use all lowercase letters and hyphens and underscores as keys.

    <RDetails>
      <template #summary>Show Code</template>

    ```vue
    <script lang="ts" setup>
    import { RList } from 'roughness'
    </script>

    <template>
      <RList :items="['alice', 'bob']">
        <template #*="{ item }">{{ item.toUpperCase() }}</template>
      </RList>
    </template>
    ```

    </RDetails>

    <RList :items="['alice', 'bob']">
      <template #*="{ item }">{{ item.toUpperCase() }}</template>
    </RList>

- `RValue[]`. `RValue` refers to objects that implement `{ [import('roughness').RKey]: string | number }`, where the property value of `RKey` is the key of the rendered item. This allows you to map data directly to a list and pass it to the component.
     - In this case, slots will accept the values of type `RValue`.

    <RDetails>
      <template #summary>Show Code</template>

    ```vue
    <script lang="ts" setup>
    import { RKey, RList } from 'roughness'

    const data = [{ [RKey]: 'darwin', name: 'macOS' }, { [RKey]: 'win32', name: 'Windows' }]
    </script>

    <template>
      <RList :items="data">
        <template #*="{ item }">{{ item.name }}</template>
      </RList>
    </template>
    ```

    </RDetails>

    <RList :items="data">
      <template #*="{ item }">{{ item.name }}</template>
    </RList>

## Slot Matching

For list rendering components (including `RList`, `RTable` and `RTabs`), slots can either be defined individually using keys (from list items, ordinal numbers, or the `RKey` properties), or using the wildcard `*`.

Taking `RList` as an example, the following codes are equivalent:

```vue
<template>
  <RList :items="['elephant', 'hippo']">
    <template #elephant>Tina</template>
    <template #hippo>Tony</template>
  </RList>
</template>
```

```vue
<template>
  <RList :items="['elephant', 'hippo']">
    <template #*="{ item }">
      <template v-if="item === 'elephant'">Tina</template>
      <template v-else-if="item === 'hippo'">Tony</template>
    </template>
  </RList>
</template>
```

For complex components like `RTable`, where there may be multiple matches, slots are always **back-to-forward** matched, meaning slots will be preceded by `body:alice:nickname` over ` body:*:nickname` over `body:alice:*` over `body:*:*`.

In different situations, the two methods may have their own advantages and disadvantages, and you can choose according to your own needs. More often, you can use them in combination to achieve the effect of custom + default rendering method.

## Controlled and Uncontrolled Components

In Roughness, all components that support `v-model` also support not binding the properties and events, which means:

- You can completely not bind the property and event, and the value will be controlled internally. At this time, the component can still maintain the value correctly, for example, when it is used in form submission;
- You can bind the property only (which could be static), then the value will be used as the **default value** of the one inside the component. The property inside the component will be updated when the bound value is updated;
- You can bind the event only. It will be triggered normally when the property inside the component is updated;
- You can bind both the property and the event through `v-model` at the same time, and the property inside the component will be synchronized with the bound value.

## Renderable

In addition to creating components through render functions and templates, some components also support the Composition API, such as `useConfirm` and `useToast`. They both return a function and take two parameters:

```ts
import type { ComponentProps, ComponentRenderable } from 'roughness'

export declare function useConfirm(): (
  renderable: ComponentRenderable<typeof RConfirm>,
  props?: ComponentProps<typeof RConfirm>,
) => Promise<boolean>

export declare function useToast(): (
  renderable: ComponentRenderable<typeof RToast>,
  props?: ComponentProps<typeof RToast>,
) => void
```

The `props` will be passed as props of the component, and `renderable` is used to control the slots. The `renderable` can be any of the following types:

- `undefined | null`: means the slot will be left empty;

  ```ts
  import { useToast } from 'roughness'

  const toast = useToast()

  toast()
  ```

- `string | number | boolean`: will be rendered directly;

  ```ts
  import { useToast } from 'roughness'

  const toast = useToast()

  toast('Done')
  ```

- A function that returns the above values or `VNode`: will be called when rendering, and its return value will be rendered with the same logic;

  ```tsx
  import { RLink, useToast } from 'roughness'

  const toast = useToast()

  toast(() => <RLink>Expand</RLink>)
  ```

- An object, each of whose properties is the above value or function: the keys will be used as the slot names to match the slots.

  ```tsx
  import { RRate, useConfirm } from 'roughness'

  const confirm = useConfirm()

  confirm({
    header: 'Enjoying Roughness?',
    default: () => <RRate />
  })
  ```
