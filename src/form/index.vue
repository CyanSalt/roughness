<script lang="ts" setup>
import '../common/style.scss'
import { provide } from 'vue'
import RSpace from '../space/index.vue'
import { labelInlineInjection } from './utils'

defineOptions({
  name: 'RForm',
})

const {
  labelInline = undefined,
} = defineProps<{
  /** Whether the labels of the form items are displayed as inline boxes. */
  labelInline?: boolean,
}>()

defineSlots<{
  /** Content of the form. */
  default?: (props: {}) => any,
}>()

provide(labelInlineInjection, $$(labelInline))
</script>

<template>
  <RSpace tag="form" vertical class="r-form">
    <slot></slot>
  </RSpace>
</template>
