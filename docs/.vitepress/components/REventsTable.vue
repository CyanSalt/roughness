<script lang="ts" setup>
import { RTable, RTableColumn, useList } from '../../../src'
import type { EventData } from './context'
import { eventsInjection } from './context'

defineOptions({
  name: 'REventsTable',
})

defineSlots<{
  name?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const events = useList(eventsInjection)
</script>

<template>
  <RTable :rows="events" class="events-table">
    <RTableColumn v-slot="{ row }" name="name">
      <component
        :is="(row as EventData).slots.name"
        v-if="(row as EventData).slots.name"
      ></component>
      <slot v-else name="name" :value="(row as EventData).name">{{ (row as EventData).name }}</slot>
    </RTableColumn>
    <RTableColumn v-slot="{ row }" name="parameters">
      <component
        :is="(row as EventData).slots.parameters"
        v-if="(row as EventData).slots.parameters"
      ></component>
    </RTableColumn>
    <RTableColumn v-slot="{ row }" name="description">
      <component
        :is="(row as EventData).slots.default"
        v-if="(row as EventData).slots.default"
      ></component>
    </RTableColumn>
    <slot></slot>
  </RTable>
</template>
