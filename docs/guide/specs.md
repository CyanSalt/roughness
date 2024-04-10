<script lang="ts" setup>
import { keyOf, RCard, RDetails, RKey, RTabItem, RTabs } from 'roughness'

const data = [{ [RKey]: 'darwin', name: 'macOS' }, { [RKey]: 'win32', name: 'Windows' }]
</script>

# Specs

Most components of Roughness follow similar specifications. Understanding these specifications will help you get started development quickly.

## List Rendering

For list item components (including `RCarouselItem`, `RCheckbox`, `RTabItem` and the `rows` of `RTable`), the value of the unique key prop for each rendered item can be in any of the following forms:

- `string | number`, which is the key of the rendered item. This means that keeping keys consistent can lead to better performance in list sorting, deletion, etc.
     - Recommended to use all lowercase letters and hyphens and underscores as keys.

    <RDetails>
      <template #summary>Show Code</template>

    ```vue
    <script lang="ts" setup>
    import { RTabItem, RTabs } from 'roughness'
    </script>

    <template>
      <RTabs :content="false">
        <RTabItem value="alice" />
        <RTabItem value="bob" />
      </RTabs>
    </template>
    ```

    </RDetails>

    <RTabs :content="false">
      <RTabItem value="alice" />
      <RTabItem value="bob" />
    </RTabs>

- `RValue`. which refers to an object that implement `{ [import('roughness').RKey]: string | number }`, where the property value of `RKey` is the unique key of the rendered item. This allows you to map data directly to a list and pass it to the component.
    - You can use the utility function `keyOf` to map an `RValue` to key that can be used for list rendering.

    <RDetails>
      <template #summary>Show Code</template>

    ```vue
    <script lang="ts" setup>
    import { keyOf, RKey, RTabItem, RTabs } from 'roughness'

    const data = [{ [RKey]: 'darwin', name: 'macOS' }, { [RKey]: 'win32', name: 'Windows' }]
    </script>

    <template>
      <RTabs :content="false">
        <RTabItem v-for="item in data" :key="keyOf(item)" :value="item">
          <template #anchor>{{ item.name }}</template>
        </RTabItem>
      </RTabs>
    </template>
    ```

    </RDetails>

    <RTabs :content="false">
      <RTabItem v-for="item in data" :key="keyOf(item)" :value="item">
        <template #anchor>{{ item.name }}</template>
      </RTabItem>
    </RTabs>

<RCard type="warning">

In order to cope with various situations, the order of list rendering is based on the mounting order of list items. Therefore, if you need to display list items according to conditions, it is recommended to use `v-show` instead of `v-if`.

<br>

In addition, `RTableColumn` will be also rendered in a similar way although it only supports `name` in `string`.

</RCard>

You can also use a similar mechanism in custom components using `useList` and `useListItem`.

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
