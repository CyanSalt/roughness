<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import { inject, provide, ref } from 'vue'
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

const configOptions = $(inject(optionsInjection, ref()))

const nestingOptions = $computed<Options>(() => {
  return {
    ...configOptions,
    ...options,
  }
})

provide(optionsInjection, $$(nestingOptions))
</script>

<template>
  <slot></slot>
</template>
