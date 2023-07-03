<script lang="ts" setup>
import type { Options } from 'roughjs/bin/core'
import { provide, toRef } from 'vue'
import { optionsInjection } from './utils'

defineOptions({
  name: 'RGraphicsConfig',
})

defineSlots<{
  default?: (props: {}) => any,
}>()

const {
  options,
} = defineProps<{
  options?: Options,
}>()

provide(optionsInjection, toRef(() => options))
</script>

<template>
  <slot></slot>
</template>
