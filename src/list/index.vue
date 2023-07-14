<script lang="ts" setup generic="T extends string[] | number">
import { provide } from 'vue'
import type { GraphicsProps } from '../graphics/utils'
import RSpace from '../space/index.vue'
import RListItem from './list-item.vue'
import type { ListStyle } from './utils'
import { listStyleInjection } from './utils'

type Item = T extends string[] ? string : number

defineOptions({
  name: 'RList',
})

const {
  items = (() => []) as never,
  listStyle = 'disc',
  graphicsOptions,
  reactions = (() => []) as never,
} = defineProps<{
  items?: T,
  listStyle?: ListStyle,
} & GraphicsProps>()

defineSlots<{
  '*'?: (props: { item: Item }) => any,
  default?: (props: {}) => any,
} & Record<string, (props: {}) => any>>()

const tag = $computed(() => {
  return listStyle === 'auto' ? 'ol' : 'ul'
})

provide(listStyleInjection, $$(listStyle))
</script>

<template>
  <RSpace
    :tag="tag"
    vertical
    class="r-list"
  >
    <slot>
      <RListItem
        v-for="item in items"
        :key="item"
        :reactions="reactions"
        :graphics-options="graphicsOptions"
      >
        <slot :name="`${item as Item}`">
          <slot name="*" :item="item"></slot>
        </slot>
      </RListItem>
    </slot>
  </RSpace>
</template>

<style lang="scss" scoped>
.r-list {
  --r-list-marker-color: var(--r-common-text-color);
  --r-list-marker-block-size: var(--r-common-line-height);
  --r-list-marker-inline-size: 1.5em;
  padding-inline-start: var(--r-list-marker-inline-size);
}
ul.r-list {
  list-style-type: none;
}
</style>
