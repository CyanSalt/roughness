<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import { inject, provide, ref } from 'vue'
import { optionsInjection } from './utils'

defineOptions({
  name: 'RGraphicsConfig',
})

const {
  options,
} = defineProps<{
  /**
   * Options for Rough.js
   * {@link https://github.com/rough-stuff/rough/wiki#options}
   */
  options?: Options,
}>()

defineSlots<{
  default?: (props: {}) => any,
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
