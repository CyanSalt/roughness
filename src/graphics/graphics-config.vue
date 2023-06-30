<script lang="ts" setup>
import type { Options } from 'roughjs/bin/core'
import { provide, toRef } from 'vue'
import { configInjection } from './utils'

defineOptions({
  name: 'RGraphicsConfig',
})

const {
  options,
} = defineProps<{
  options?: Options,
}>()

provide(configInjection, toRef(() => options))
</script>

<template>
  <slot></slot>
</template>
