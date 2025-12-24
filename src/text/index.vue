<script lang="ts" setup>
import '../common/style.scss'
import type { LegacyColorProps, SizeProps } from '../common/utils'

defineOptions({
  name: 'RText',
})

const {
  block = false,
  tag = 'span',
  type,
  size,
} = defineProps<{
  /** Whether the text is displayed as block */
  block?: boolean,
  /**
   * HTML tag for rendering the text
   * @default 'span'
   */
  tag?: string,
} & LegacyColorProps & SizeProps>()

defineSlots<{
  /** Content of the text. */
  default?: (props: {}) => any,
}>()
</script>

<template>
  <component :is="tag" :class="['r-text', type, size, { 'is-block': block }]">
    <slot></slot>
  </component>
</template>

<style lang="scss">
@property --R-text-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

.r-text {
  // Color of text.
  --R-text-color: var(--r-text-color, var(--r-element-color));
  color: var(--R-text-color);
  &.is-block {
    display: block;
  }
  &.primary {
    --r-element-color: var(--r-common-primary-color);
  }
  &.info {
    --r-element-color: var(--r-common-info-color);
  }
  &.success {
    --r-element-color: var(--r-common-success-color);
  }
  &.warning {
    --r-element-color: var(--r-common-warning-color);
  }
  &.error {
    --r-element-color: var(--r-common-error-color);
  }
  &.comment {
    --r-element-color: var(--r-common-comment-color);
  }
  &.small {
    --r-element-font-size: var(--r-common-small-font-size);
  }
  &.large {
    --r-element-font-size: var(--r-common-large-font-size);
  }
}
</style>
