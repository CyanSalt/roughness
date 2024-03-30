<script lang="ts" setup>
import '../common/style.scss'
import { isObjectLike } from 'lodash-es'
import type { RValueOrKey } from '../common/key'

defineOptions({
  name: 'RTableCell',
})

const {
  row,
  name,
} = defineProps<{
  /**
   * Row key or data.
   * {@link https://roughness.vercel.app/guide/specs#list-rendering}
   * @private
   */
  row: RValueOrKey,
  /**
   * Table column name
   * @private
   */
  name: string,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const content = $computed(() => {
  return isObjectLike(row) ? row[name] : undefined
})
</script>

<template>
  <td class="r-table-cell">
    <slot>{{ content }}</slot>
  </td>
</template>

<style lang="scss">
.r-table-cell {
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
}
</style>
