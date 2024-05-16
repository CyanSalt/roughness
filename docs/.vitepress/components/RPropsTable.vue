<script lang="ts" setup>
import { RTable, RTableColumn, useList } from '../../../src'
import type { PropData } from './context'
import { propsInjection } from './context'

defineOptions({
  name: 'RPropsTable',
})

defineSlots<{
  name?: (props: {}) => any,
  type?: (props: {}) => any,
  'default-value'?: (props: {}) => any,
  description?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const props = useList(propsInjection)
</script>

<template>
  <div class="r-props-table">
    <RTable :rows="props">
      <RTableColumn v-slot="{ row }" name="name">
        <component
          :is="(row as PropData).slots.name"
          v-if="(row as PropData).slots.name"
        ></component>
        <slot v-else name="name" :value="(row as PropData).name">{{ (row as PropData).name }}</slot>
      </RTableColumn>
      <RTableColumn v-slot="{ row }" name="type">
        <component
          :is="(row as PropData).slots.type"
          v-if="(row as PropData).slots.type"
        ></component>
        <slot v-else name="type"></slot>
      </RTableColumn>
      <RTableColumn v-slot="{ row }" name="default-value">
        <component
          :is="(row as PropData).slots['default-value']"
          v-if="(row as PropData).slots['default-value']"
        ></component>
        <slot v-else name="default-value"></slot>
      </RTableColumn>
      <RTableColumn v-slot="{ row }" name="description">
        <component
          :is="(row as PropData).slots.default"
          v-if="(row as PropData).slots.default"
        ></component>
        <slot v-else name="description"></slot>
      </RTableColumn>
      <slot></slot>
    </RTable>
  </div>
</template>

<style lang="scss" scoped>
.r-props-table {
  overflow: auto;
  .r-table {
    min-width: 100%;
  }
}
</style>
