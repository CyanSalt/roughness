<script lang="ts" setup>
import '../common/style.scss'
import { provide } from 'vue'
import RSpace from '../space/index.vue'
import type { ListStyle } from './utils'
import { listStyleInjection } from './utils'

defineOptions({
  name: 'RList',
})

const {
  listStyle = 'disc',
} = defineProps<{
  /**
   * Marker style of the list.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type}
   * When specified as `auto`, the list will be ordered and the markers will be drawn by the user agent
   * @default 'disc'
   */
  listStyle?: ListStyle,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

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
    <slot></slot>
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
