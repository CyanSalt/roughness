<script lang="ts" setup>
import '../common/style.scss'
import { useMouseInElement, useMousePressed } from '@vueuse/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { watchEffect } from 'vue'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { effectRef } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RSlider',
})

const {
  disabled = false,
  max = 100,
  min = 0,
  modelValue = 0,
  step = 1,
  graphicsOptions,
} = defineProps<{
  disabled?: boolean,
  /**
   * Upper numeric bound of the range
   * @default 100
   */
  max?: number,
  /**
   * Lower numeric bound of the range
   * @default 0
   */
  min?: number,
  /** Value of the slider */
  modelValue?: number,
  /**
   * Minimum unit of the slider
   * @default 1
   */
  step?: number,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

function round(value: number) {
  const rest = value % step
  return rest >= step / 2 ? value - rest + step : value - rest
}

let internalModelValue = $(effectRef({
  get: () => round(modelValue),
  set: value => {
    emit('update:modelValue', value)
  },
}))

const ratio = $computed(() => {
  return (internalModelValue - min) / (max - min) || 0
})

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-slider-border-width') ?? 0
  const trackSize = getLengthProperty(svg, '--r-slider-track-size') ?? 0
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    (height - trackSize) / 2 + padding,
    width - padding * 2,
    trackSize - padding * 2,
    {
      stroke: 'var(--r-slider-border-color)',
      strokeWidth,
    },
  )
  svg.appendChild(rectangle)
  const barRect = rc.rectangle(
    padding,
    (height - trackSize) / 2 + padding,
    height / 2 - padding + (width - height + padding * 2) * ratio,
    trackSize - padding * 2,
    {
      strokeWidth: 0,
      fill: 'var(--r-slider-color)',
      ...getFilledSizeOptions(strokeWidth),
    },
  )
  svg.appendChild(barRect)
  const controlRect = rc.rectangle(
    (width - height) * ratio + padding,
    padding,
    height - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--r-slider-border-color)',
      strokeWidth,
      fill: 'var(--r-common-background-color)',
      fillStyle: 'solid',
    },
  )
  svg.appendChild(controlRect)
}

let root = $ref<HTMLLabelElement>()
let input = $ref<HTMLInputElement>()

const { pressed } = $(useMousePressed({ target: $$(root) }))
const { elementX } = $(useMouseInElement($$(root)))

watchEffect(() => {
  if (!root || !pressed) return
  const width = root.clientWidth
  const height = root.clientHeight
  const currentRatio = Math.min(Math.max(elementX - height / 2, 0), width - height) / (width - height)
  internalModelValue = round(currentRatio * (max - min) + min)
  if (input) {
    input.focus()
  }
})
</script>

<template>
  <label
    ref="root"
    class="r-slider"
    @transitionrun="listener"
  >
    <input
      ref="input"
      v-model.number="internalModelValue"
      :disabled="disabled"
      type="range"
      :min="min"
      :max="max"
      class="r-slider__input"
    >
    <RGraphics :options="graphicsOptions" @draw="draw" />
  </label>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

.r-slider {
  --r-slider-color: var(--r-common-primary-color);
  --r-slider-border-color: var(--r-common-text-color);
  --r-slider-border-width: 1px;
  --r-slider-control-size: var(--r-common-line-height);
  --r-slider-track-size: var(--r-common-font-size);
  display: inline-flex;
  block-size: var(--r-slider-control-size);
  inline-size: 210px;
  cursor: pointer;
  &::before {
    @include partials.ghost();
    border-top: var(--r-slider-border-width) solid;
    border-right: var(--r-slider-track-size) solid;
    transition: border-top 1ms, border-right 1ms !important;
  }
  &:has(> .r-slider__input:focus), &:active {
    --r-slider-border-width: 2px;
  }
  &:has(> .r-slider__input:disabled) {
    cursor: not-allowed;
  }
}
@layer base {
  .r-slider__input {
    @include reset.input-range;
  }
}
.r-slider__input {
  position: absolute;
  block-size: 0;
  inline-size: 0;
  opacity: 0;
}
</style>
