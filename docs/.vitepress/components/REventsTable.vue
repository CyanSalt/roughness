<script lang="ts" setup>
import { RTable, RTableColumn, useList } from '../../../src'
import type { EventData } from './context'
import { eventsInjection } from './context'

defineOptions({
  name: 'REventsTable',
})

defineSlots<{
  name?: (props: {}) => any,
  type?: (props: {}) => any,
  description?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const events = useList(eventsInjection)
</script>

<template>
  <div class="r-events-table">
    <RTable :rows="events">
      <RTableColumn v-slot="{ row }" name="name">
        <component
          :is="(row as EventData).slots.name"
          v-if="(row as EventData).slots.name"
        ></component>
        <slot v-else name="name" :value="(row as EventData).name">{{ (row as EventData).name }}</slot>
      </RTableColumn>
      <RTableColumn v-slot="{ row }" name="type">
        <component
          :is="(row as EventData).slots.type"
          v-if="(row as EventData).slots.type"
        ></component>
        <slot v-else name="type"></slot>
      </RTableColumn>
      <RTableColumn v-slot="{ row }" name="description">
        <component
          :is="(row as EventData).slots.default"
          v-if="(row as EventData).slots.default"
        ></component>
        <slot v-else name="description"></slot>
      </RTableColumn>
      <slot></slot>
    </RTable>
  </div>
</template>

<style lang="scss" scoped>
.r-events-table {
  overflow: auto;
  .r-table {
    min-width: 100%;
  }
}
</style>
