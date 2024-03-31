<script lang="ts" setup>
import { RTable, RTableColumn, useList } from '../../../src'
import type { SlotData } from './context'
import { slotsInjection } from './context'

defineOptions({
  name: 'RSlotsTable',
})

defineSlots<{
  name?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const slots = useList(slotsInjection)
</script>

<template>
  <RTable :rows="slots" class="slots-table">
    <RTableColumn v-slot="{ row }" name="name">
      <component
        :is="(row as SlotData).slots.name"
        v-if="(row as SlotData).slots.name"
      ></component>
      <slot v-else name="name" :value="(row as SlotData).name">{{ (row as SlotData).name }}</slot>
    </RTableColumn>
    <RTableColumn v-slot="{ row }" name="parameters">
      <component
        :is="(row as SlotData).slots.parameters"
        v-if="(row as SlotData).slots.parameters"
      ></component>
    </RTableColumn>
    <RTableColumn v-slot="{ row }" name="description">
      <component
        :is="(row as SlotData).slots.default"
        v-if="(row as SlotData).slots.default"
      ></component>
    </RTableColumn>
    <slot></slot>
  </RTable>
</template>
