<script lang="ts" setup>
import '../common/style.scss'
import type { HTMLAttributes } from 'vue'

defineOptions({
  name: 'RSpace',
})

const {
  align: userAlign,
  justify = 'start',
  inline = false,
  overflow = false,
  reverse = false,
  tag = 'div',
  vertical = false,
  wrap = true,
} = defineProps<{
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly',
  inline?: boolean,
  overflow?: boolean,
  reverse?: boolean,
  tag?: string,
  vertical?: boolean,
  wrap?: boolean,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const align = $computed(() => {
  return userAlign ?? (vertical ? 'stretch' : 'start')
})

const style = $computed<HTMLAttributes['style']>(() => {
  return {
    'justify-content': ['start', 'end'].includes(justify) ? `flex-${justify}` : justify,
    'align-items': ['start', 'end'].includes(align) ? `flex-${align}` : align,
    'flex-direction': vertical ? (reverse ? 'column-reverse' : 'column') : (reverse ? 'row-reverse' : 'row'),
    'flex-wrap': wrap ? 'wrap' : undefined,
    overflow: overflow ? 'overlay' : undefined,
  }
})
</script>

<template>
  <component
    :is="tag"
    :class="['r-space', { 'is-inline': inline }]"
    :style="style"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.r-space {
  --r-space-gap-size: 12px;
  display: flex;
  gap: var(--r-space-gap-size);
  &.is-inline {
    display: inline-flex;
  }
}
</style>
