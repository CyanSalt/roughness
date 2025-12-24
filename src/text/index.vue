<script lang="ts" setup>
import '../common/style.scss'
import type { ColorProps, SizeProps } from '../common/utils'

defineOptions({
  name: 'RText',
})

const {
  block = false,
  tag = 'span',
  color,
  size,
} = defineProps<{
  /** Whether the text is displayed as block */
  block?: boolean,
  /**
   * HTML tag for rendering the text
   * @default 'span'
   */
  tag?: string,
} & ColorProps & SizeProps>()

defineSlots<{
  /** Content of the text. */
  default?: (props: {}) => any,
}>()
</script>

<template>
  <component :is="tag" :class="['r-text', color, size, { 'is-block': block }]">
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-text-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

.r-text {
  // Color of text.
  --R-text-color: var(--r-text-color, var(--r-element-color));
  color: var(--R-text-color);
  @include partials.colored-element();
  @include partials.sized-element();
  &.is-block {
    display: block;
  }
}
</style>
