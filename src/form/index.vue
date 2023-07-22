<script lang="ts" setup>
import { provide } from 'vue'
import RSpace from '../space/index.vue'
import { labelInlineInjection } from './utils'

defineOptions({
  name: 'RForm',
})

const {
  labelInline = undefined,
} = defineProps<{
  labelInline?: boolean,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

provide(labelInlineInjection, $$(labelInline))
</script>

<template>
  <RSpace tag="form" vertical class="r-form">
    <slot></slot>
  </RSpace>
</template>
