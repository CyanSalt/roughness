<script lang="ts" setup>
import type { ColorProps, SizeProps } from '../common/utils'

defineOptions({
  name: 'RLink',
})

const {
  type,
  size,
} = defineProps<ColorProps & SizeProps>()

defineSlots<{
  default?: (props: {}) => any,
}>()
</script>

<template>
  <a :class="['r-link', type, size]">
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
@use '../common/_partials';

.r-link {
  --r-link-color: var(--r-common-text-color);
  --r-link-underline-width: 2px;
  color: var(--r-link-color);
  font-size: var(--r-common-font-size);
  line-height: var(--r-common-line-height);
  text-decoration: none;
  cursor: pointer;
  &[href], &:hover {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: var(--r-link-underline-width);
  }
  &:focus, &:active {
    --r-link-underline-width: 3px;
  }
  &.primary {
    --r-link-color: var(--r-common-primary-color);
  }
  &.info {
    --r-link-color: var(--r-common-info-color);
  }
  &.success {
    --r-link-color: var(--r-common-success-color);
  }
  &.warning {
    --r-link-color: var(--r-common-warning-color);
  }
  &.error {
    --r-link-color: var(--r-common-error-color);
  }
  &.small {
    font-size: var(--r-common-small-font-size);
  }
  &.large {
    font-size: var(--r-common-large-font-size);
  }
}
</style>
