<script lang="ts" setup>
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef, watch, watchEffect } from 'vue'
import type { ReactionProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RRate',
})

const {
  disabled = false,
  modelValue = 0,
  reactions = (() => ['hover-at', 'focus-within', 'active']) as never,
} = defineProps<{
  disabled?: boolean,
  modelValue?: number,
} & ReactionProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

let internalModelValue = $ref(modelValue)

watchEffect(() => {
  internalModelValue = modelValue
})

watch($$(internalModelValue), currentValue => {
  emit('update:modelValue', currentValue)
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const {
    'hover-at': hoveredAt,
    'focus-within': focusedWithin,
    active,
  } = getReactionState()
  const { width, height } = getSVGSize(svg)
  const baseWidth = 48
  const baseHeight = 45
  const basePoints = [
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
  const padding = 2
  const shapeSizeByWidth = (width - padding * 2) / 7
  const shapeSizeByHeight = height - padding * 2 * baseWidth / baseHeight
  const shapeSize = Math.min(shapeSizeByWidth, shapeSizeByHeight)
  const cursorX = hoveredAt?.[0] ?? -Infinity
  const activeIndex = hoveredAt ? Math.ceil((cursorX - padding) / (shapeSize * 1.5)) : internalModelValue
  for (let i = 0; i < 5; i += 1) {
    const startX = padding + shapeSize * i * 1.5
    const polygon = rc.polygon(basePoints.map(([x, y]) => [
      startX + x * shapeSize / baseWidth,
      padding + y * shapeSize / baseWidth,
    ]), {
      stroke: hoveredAt || focusedWithin || active || activeIndex > i ? 'var(--r-rate-color)' : 'var(--r-rate-border-color)',
      fill: activeIndex > i ? 'var(--r-rate-color)' : undefined,
    })
    svg.appendChild(polygon)
  }
}

let input = $ref<HTMLInputElement>()

function click(event: MouseEvent) {
  const target = event.target as HTMLLabelElement
  const width = target.clientWidth
  const height = target.clientHeight
  const cursorX = event.offsetX

  const baseWidth = 48
  const baseHeight = 45
  const padding = 2
  const shapeSizeByWidth = (width - padding * 2) / 7
  const shapeSizeByHeight = height - padding * 2 * baseWidth / baseHeight
  const shapeSize = Math.min(shapeSizeByWidth, shapeSizeByHeight)
  internalModelValue = Math.ceil((cursorX - padding) / (shapeSize * 1.5))
  if (input) {
    input.focus()
  }
}
</script>

<template>
  <label class="r-rate" @click.self="click">
    <input
      ref="input"
      v-model.number="internalModelValue"
      :disabled="disabled"
      type="range"
      min="1"
      max="5"
      class="r-rate__input"
    >
    <RGraphics @draw="draw" />
  </label>
</template>

<style lang="scss" scoped>
.r-rate {
  --r-rate-color: var(--r-common-primary-color);
  --r-rate-border-color: var(--r-common-text-color);
  --r-rate-control-size: var(--r-common-line-height);
  display: inline-flex;
  &:has(> .r-rate__input:disabled) {
    cursor: not-allowed;
  }
}
.r-rate__input {
  appearance: none;
  width: calc((var(--r-rate-control-size) - 4) * 7 * 48 / 45 + 4);
  height: var(--r-rate-control-size);
  margin: 0;
  opacity: 0;
  cursor: pointer;
  pointer-events: none;
}
</style>