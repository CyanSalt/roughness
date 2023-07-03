<script lang="ts" setup>
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
  --r-text-color: var(--r-common-text-color);
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
  &.small {
    font-size: var(--r-common-small-font-size);
  }
  &.large {
    font-size: var(--r-common-large-font-size);
  }
}
div.r-text, span.r-text {
  font-size: var(--r-common-font-size);
  line-height: var(--r-common-line-height);
}
</style>
