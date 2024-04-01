<script lang="ts" setup>
import '../common/style.scss'
import type { HTMLAttributes } from 'vue'
import type { SizeProps } from '../common/utils'

defineOptions({
  name: 'RSpace',
})

const {
  align = 'stretch',
  justify = 'start',
  inline = false,
  reverse = false,
  tag = 'div',
  vertical = false,
  wrap = true,
  size,
} = defineProps<{
  /**
   * Item axis arrangement.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-items}
   */
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * Item arrangement.
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content}
   */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly',
  /** Whether the space is displayed as an inline box */
  inline?: boolean,
  /** Whether to reverse the layout */
  reverse?: boolean,
  /**
   * HTML tag for rendering the space
   * @default 'div'
   */
  tag?: string,
  /** Whether to layout vertically */
  vertical?: boolean,
  /**
   * Whether to exceed the line break
   * @default true
   */
  wrap?: boolean,
} & SizeProps>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const style = $computed<HTMLAttributes['style']>(() => {
  return {
    'justify-content': ['start', 'end'].includes(justify) ? `flex-${justify}` : justify,
    'align-items': ['start', 'end'].includes(align) ? `flex-${align}` : align,
    'flex-direction': vertical ? (reverse ? 'column-reverse' : 'column') : (reverse ? 'row-reverse' : 'row'),
    'flex-wrap': wrap ? 'wrap' : undefined,
  }
})
</script>

<template>
  <component
    :is="tag"
    :class="['r-space', size, { 'is-inline': inline }]"
    :style="style"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss">
.r-space {
  --r-space-gap-size: calc(1em - 4px);
  display: flex;
  gap: var(--r-space-gap-size);
  &.is-inline {
    display: inline-flex;
  }
  &.small {
    --r-element-font-size: var(--r-common-small-font-size);
  }
  &.large {
    --r-element-font-size: var(--r-common-large-font-size);
  }
}
</style>
