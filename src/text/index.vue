<script lang="ts" setup>
import '../common/style.scss'
import type { ColorProps, SizeProps } from '../common/utils'

defineOptions({
  name: 'RText',
})

const {
  tag = 'span',
  type,
  size,
} = defineProps<{
  tag?: string,
} & ColorProps & SizeProps>()

defineSlots<{
  default?: (props: {}) => any,
}>()
</script>

<template>
  <component :is="tag" :class="['r-text', type, size]">
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.r-text {
  --r-text-color: var(--r-element-color);
  color: var(--r-text-color);
  &.primary {
    --r-text-color: var(--r-common-primary-color);
  }
  &.info {
    --r-text-color: var(--r-common-info-color);
  }
  &.success {
    --r-text-color: var(--r-common-success-color);
  }
  &.warning {
    --r-text-color: var(--r-common-warning-color);
  }
  &.error {
    --r-text-color: var(--r-common-error-color);
  }
  &.comment {
    --r-text-color: var(--r-common-comment-color);
  }
  &.small {
    --r-element-font-size: var(--r-common-small-font-size);
  }
  &.large {
    --r-element-font-size: var(--r-common-large-font-size);
  }
}
</style>
