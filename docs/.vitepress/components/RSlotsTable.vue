<script lang="ts" setup>
import { useSlots } from 'vue'
import { RListRenderer, RTable, RTableColumn, useList } from '../../../src'
import type { SlotData } from './context'
import { slotsInjection } from './context'

defineOptions({
  name: 'RSlotsTable',
})

defineSlots<{
  name?: (props: {}) => any,
  type?: (props: {}) => any,
  description?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const tableSlots = useSlots()

const slots = useList(slotsInjection)
</script>

<template>
  <div class="r-slots-table">
    <RTable :rows="slots">
      <RTableColumn v-slot="{ row }" name="name">
        <component
          :is="(row as SlotData).slots.name"
          v-if="(row as SlotData).slots.name"
        ></component>
        <slot v-else name="name" :value="(row as SlotData).name">{{ (row as SlotData).name }}</slot>
      </RTableColumn>
      <RTableColumn v-slot="{ row }" name="type">
        <component
          :is="(row as SlotData).slots.type"
          v-if="(row as SlotData).slots.type"
        ></component>
        <slot v-else name="type"></slot>
      </RTableColumn>
      <RTableColumn v-slot="{ row }" name="description">
        <component
          :is="(row as SlotData).slots.default"
          v-if="(row as SlotData).slots.default"
        ></component>
        <slot v-else name="description"></slot>
      </RTableColumn>
      <RListRenderer include="RSlot" :render="tableSlots.default" />
    </RTable>
  </div>
</template>

<style lang="scss" scoped>
.r-slots-table {
  overflow: auto;
  .r-table {
    min-width: 100%;
  }
}
</style>
