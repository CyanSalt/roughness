<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { HTMLAttributes } from 'vue'
import { toRef, watch, watchEffect } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize, measureSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RPopover',
})

const {
  align = 'start',
  open,
  side = 'top',
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  align?: 'start' | 'end' | 'center' | 'stretch',
  open?: boolean,
  side?: 'top' | 'bottom' | 'left' | 'right',
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  anchor?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

let internalOpen = $ref(open)

watchEffect(() => {
  internalOpen = open
})

watch($$(internalOpen), currentValue => {
  emit('update:open', currentValue)
})

function toggle() {
  internalOpen = !internalOpen
}

function close() {
  internalOpen = false
}

const contentStyle = $computed(() => {
  let style: HTMLAttributes['style'] = {}
  let translateX = '0'
  let translateY = '0'
  switch (side) {
    case 'top':
      style.top = '0'
      translateY = '-100%'
      break
    case 'bottom':
      style.bottom = '0'
      translateY = '100%'
      break
    case 'left':
      style.left = '0'
      translateX = '-100%'
      break
    case 'right':
      style.right = '0'
      translateX = '100%'
      break
  }
  switch (side) {
    case 'top':
    case 'bottom':
      switch (align) {
        case 'start':
          style.left = '0'
          break
        case 'end':
          style.right = '0'
          break
        case 'center':
          style.left = '50%'
          translateX = '-50%'
          break
        case 'stretch':
          style.left = '0'
          style.right = '0'
          break
      }
      break
    case 'left':
    case 'right':
      switch (align) {
        case 'start':
          style.top = '0'
          break
        case 'end':
          style.bottom = '0'
          break
        case 'center':
          style.top = '50%'
          translateX = '-50%'
          break
        case 'stretch':
          style.top = '0'
          style.bottom = '0'
          break
      }
      break
  }
  style.transform = `translate(${translateX}, ${translateY})`
  return style
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-popover-border-width') ?? 0
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke: 'var(--r-popover-border-color)',
    strokeWidth,
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
  })
  svg.appendChild(rectangle)
}
</script>

<template>
  <span v-on-click-outside.bubble="close" class="r-popover">
    <button class="r-popover__anchor" @click="toggle" @keydown.escape="close">
      <slot name="anchor"></slot>
    </button>
    <div
      v-if="internalOpen"
      class="r-popover__content"
      :style="contentStyle"
      role="tooltip"
    >
      <RGraphics :options="graphicsOptions" @draw="draw" />
      <slot></slot>
    </div>
  </span>
</template>

<style lang="scss" scoped>
.r-popover {
  --r-popover-border-color: var(--r-common-text-color);
  --r-popover-border-width: 1px;
  position: relative;
}
.r-popover__anchor {
  appearance: none;
  display: block;
  padding: 0;
  border: none;
}
.r-popover__content {
  position: absolute;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
}
</style>
