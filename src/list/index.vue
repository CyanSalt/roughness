<script lang="ts" setup generic="T extends (string | number | RValue)[] | number">
import '../common/style.scss'
import { startCase } from 'lodash-es'
import { provide } from 'vue'
import type { RValue } from '../common/key'
import { keyOf } from '../common/key'
import type { GraphicsProps } from '../graphics/utils'
import RSpace from '../space/index.vue'
import RListItem from './list-item.vue'
import type { ListStyle } from './utils'
import { listStyleInjection } from './utils'

type Item = T extends (infer U)[] ? U : number

defineOptions({
  name: 'RList',
})

const {
  items = (() => []) as never,
  listStyle = 'disc',
  graphicsOptions,
  reactions = (() => []) as never,
} = defineProps<{
  /**
   * Item keys or data.
   * {@link https://roughness.vercel.app/guide/specs#list-rendering}
   */
  items?: T,
  /**
   * Marker style of the list.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type}
   * When specified as `auto`, the list will be ordered and the markers will be drawn by the user agent
   * @default 'disc'
   */
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
        v-for="item in (items as Item[])"
        :key="keyOf(item)"
        :reactions="reactions"
        :graphics-options="graphicsOptions"
      >
        <slot :name="`${keyOf(item)}`">
          <slot name="*" :item="item">{{ startCase(keyOf(item)) }}</slot>
        </slot>
      </RListItem>
    </slot>
  </RSpace>
</template>

<style lang="scss">
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
