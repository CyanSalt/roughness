<script lang="ts" setup>
import { RTable, RTableColumn, useList } from '../../../src'
import type { StyleData } from './context'
import { stylesInjection } from './context'

defineOptions({
  name: 'RStylesTable',
})

defineSlots<{
  name?: (props: {}) => any,
  values?: (props: {}) => any,
  'default-value'?: (props: {}) => any,
  description?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const styles = useList(stylesInjection)
</script>

<template>
  <RTable :rows="styles" class="styles-table">
    <RTableColumn v-slot="{ row }" name="name">
      <component
        :is="(row as StyleData).slots.name"
        v-if="(row as StyleData).slots.name"
      ></component>
      <slot v-else name="name" :value="(row as StyleData).name">{{ (row as StyleData).name }}</slot>
    </RTableColumn>
    <RTableColumn v-slot="{ row }" name="values">
      <component
        :is="(row as StyleData).slots.values"
        v-if="(row as StyleData).slots.values"
      ></component>
      <slot v-else name="values"></slot>
    </RTableColumn>
    <RTableColumn v-slot="{ row }" name="default-value">
      <component
        :is="(row as StyleData).slots['default-value']"
        v-if="(row as StyleData).slots['default-value']"
      ></component>
      <slot v-else name="default-value"></slot>
    </RTableColumn>
    <RTableColumn v-slot="{ row }" name="description">
      <component
        :is="(row as StyleData).slots.default"
        v-if="(row as StyleData).slots.default"
      ></component>
      <slot v-else name="description"></slot>
    </RTableColumn>
    <slot></slot>
  </RTable>
</template>
