<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

defineOptions({
  name: 'RSpace',
})

const {
  align: userAlign,
  justify = 'start',
  overflow = false,
  vertical = false,
  wrap = true,
} = defineProps<{
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly',
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  overflow?: boolean,
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
    'flex-direction': vertical ? 'column' : undefined,
    'flex-wrap': wrap ? 'wrap' : undefined,
    overflow: overflow ? 'overlay' : undefined,
  }
})
</script>

<template>
  <div class="r-space" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.r-space {
  --r-space-gap-size: 12px;
  display: flex;
  gap: var(--r-space-gap-size);
}
</style>
