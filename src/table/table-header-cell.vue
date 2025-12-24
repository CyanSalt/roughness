<script lang="ts" setup>
import '../common/style.scss'
import { startCase } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'RTableHeaderCell',
})

const {
  type,
  name,
} = defineProps<{
  /**
   * Header cell type
   */
  type: 'header' | 'footer',
  /**
   * Table column name
   * @private
   */
  name: string,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const content = computed(() => {
  return type === 'header' ? startCase(String(name)) : undefined
})
</script>

<template>
  <th class="r-table-header-cell">
    <slot>{{ content }}</slot>
  </th>
</template>

<style lang="scss">
.r-table-header-cell {
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
}
</style>
