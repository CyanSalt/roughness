<script lang="ts" setup>
import '../common/style.scss'
import { useMouseInElement, useMousePressed } from '@vueuse/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { watchEffect } from 'vue'
import { getLengthProperty } from '../common/property'
import { useReactionState } from '../common/reaction'
import { effectRef } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsEmits, GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RRate',
})

const {
  disabled = false,
  modelValue = 0,
  reactions = (() => ['hover-at', 'focus-within', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  disabled?: boolean,
  /** Value of the rate */
  modelValue?: number,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
} & GraphicsEmits>()

let internalModelValue = $(effectRef({
  get: () => modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
}))

const getReactionState = useReactionState()

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  emit('will-draw')
  const {
    'hover-at': hoveredAt,
    'focus-within': focusedWithin,
    active,
  } = getReactionState(reactions)
  const { height } = getSVGSize(svg)
  const controlSize = height
  const gapSize = getLengthProperty(svg, '--r-rate-gap-size') ?? 0
  const shapePoints = [
    [24, 0],
    [30, 17],
    [48, 17],
    [34, 28],
    [39, 45],
    [24, 35],
    [9, 45],
    [14, 28],
    [0, 17],
    [18, 17],
  ]
  const shapeStartX = Math.min(...shapePoints.map(point => point[0]))
  const shapeStartY = Math.min(...shapePoints.map(point => point[1]))
  const shapeEndX = Math.max(...shapePoints.map(point => point[0]))
  const shapeEndY = Math.max(...shapePoints.map(point => point[1]))
  const shapeWidth = shapeEndX - shapeStartX
  const shapeHeight = shapeEndY - shapeStartY
  const shapeOffsetX = shapeWidth > shapeHeight ? 0 : (shapeHeight - shapeWidth) / 2
  const shapeOffsetY = shapeWidth > shapeHeight ? (shapeWidth - shapeHeight) / 2 : 0
  const padding = 2
  const cursorX = hoveredAt?.[0] ?? -Infinity
  const activeIndex = hoveredAt ? Math.ceil(cursorX / (controlSize + gapSize)) : internalModelValue
  const scale = (controlSize - padding * 2) / Math.max(shapeWidth, shapeHeight)
  for (let i = 0; i < 5; i += 1) {
    const startX = (controlSize + gapSize) * i + padding
    const polygon = rc.polygon(shapePoints.map(([x, y]) => [
      startX + (x + shapeOffsetX - shapeStartX) * scale,
      padding + (y + shapeOffsetY - shapeStartY) * scale,
    ]), {
      stroke: hoveredAt || focusedWithin || active || activeIndex > i ? 'var(--r-rate-color)' : 'var(--r-rate-border-color)',
      fill: activeIndex > i ? 'var(--r-rate-color)' : undefined,
    })
    svg.appendChild(polygon)
  }
}

let root = $ref<HTMLLabelElement>()
let input = $ref<HTMLInputElement>()

const { pressed } = $(useMousePressed({ target: $$(root) }))
const { elementX } = $(useMouseInElement($$(root)))

watchEffect(() => {
  if (!root || !pressed) return
  const controlSize = root.clientHeight
  const gapSize = getLengthProperty(root, '--r-rate-gap-size') ?? 0
  internalModelValue = Math.ceil(elementX / (controlSize + gapSize))
  if (input) {
    input.focus()
  }
})
</script>

<template>
  <label ref="root" class="r-rate">
    <input
      ref="input"
      v-model.number="internalModelValue"
      :disabled="disabled"
      type="range"
      min="1"
      max="5"
      class="r-rate__input"
    >
    <RGraphics :options="graphicsOptions" @draw="draw" />
  </label>
</template>

<style lang="scss">
@use '../common/_reset';

.r-rate {
  --r-rate-color: var(--r-common-primary-color);
  --r-rate-border-color: var(--r-common-text-color);
  --r-rate-control-size: var(--r-common-line-height);
  --r-rate-gap-size: 4px;
  display: inline-flex;
  block-size: var(--r-rate-control-size);
  inline-size: calc(var(--r-rate-control-size) * 5 + var(--r-rate-gap-size) * 4);
  cursor: pointer;
  &:has(> .r-rate__input:disabled) {
    cursor: not-allowed;
  }
}
@layer base {
  .r-rate__input {
    @include reset.input-range;
  }
}
.r-rate__input {
  position: absolute;
  block-size: 0;
  inline-size: 0;
  opacity: 0;
}
</style>
