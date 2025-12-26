<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import { useGraphicsConfig } from './utils'

defineOptions({
  name: 'RGraphicsConfig',
})

const {
  include,
  options,
} = defineProps<{
  /**
   * Selectors or patterns to apply graphics configuration.
   */
  include?: string | RegExp | (string | RegExp)[],
  /**
   * [Options for Rough.js]{@link https://github.com/rough-stuff/rough/wiki#options}.
   * @type {import('roughjs/bin/core').Options}
   */
  options: Options,
}>()

defineSlots<{
  /** Context scope of the config */
  default?: (props: {}) => any,
}>()


useGraphicsConfig(() => ({
  include,
  options,
}))
</script>

<template>
  <slot></slot>
</template>
