<script lang="ts" setup>
import '../common/style.scss'
import { useMouseInElement, useMousePressed } from '@vueuse/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes } from 'vue'
import { watchEffect } from 'vue'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { useModel } from '../common/utils'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RSlider',
})

interface InputProps {
  /** @ignore */
  disabled?: InputHTMLAttributes['disabled'],
  /** @ignore */
  form?: InputHTMLAttributes['form'],
  /** @ignore */
  name?: InputHTMLAttributes['name'],
}

const {
  max = 100,
  min = 0,
  modelValue = 0,
  name: userName,
  step = 1,
  graphicsOptions,
  ...props
} = defineProps<{
  /**
   * Upper numeric bound of the range.
   * @default 100
   */
  max?: number,
  /**
   * Lower numeric bound of the range.
   * @default 0
   */
  min?: number,
  /** Value of the slider. */
  modelValue?: number,
  /**
   * Minimum unit of the slider.
   * @default 1
   */
  step?: number,
} & InputProps & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when the value is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const name = $(useName($$(userName)))

function round(value: number) {
  const rest = value % step
  return rest >= step / 2 ? value - rest + step : value - rest
}

let internalModelValue = $(useModel({
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
  const strokeWidth = getLengthProperty(svg, '--R-slider-border-width') ?? 0
  const trackSize = getLengthProperty(svg, '--R-slider-track-size') ?? 0
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    (height - trackSize) / 2 + padding,
    width - padding * 2,
    trackSize - padding * 2,
    {
      stroke: 'var(--R-slider-border-color)',
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
      fill: 'var(--R-slider-color)',
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
      stroke: 'var(--R-slider-border-color)',
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
      :min="min"
      :max="max"
      :name="name"
      v-bind="props"
      type="range"
      class="r-slider__input"
    >
    <RGraphics :options="graphicsOptions" @draw="draw" />
  </label>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

.r-slider {
  // Color of the slider track when active.
  --R-slider-color: var(--r-slider-color, var(--r-common-primary-color));
  // Color of the slider control and track border.
  --R-slider-border-color: var(--r-slider-border-color, var(--r-common-color));
  // Width of the slider control and track border.
  // @type {<length>}
  --R-slider-border-width: var(--r-slider-border-width, 1px);
  // Size of the slider control.
  // @type {<length>}
  --R-slider-control-size: var(--r-slider-control-size, var(--r-common-line-height));
  // Size of the slider track.
  // @type {<length>}
  --R-slider-track-size: var(--r-slider-track-size, var(--r-common-font-size));
  display: inline-flex;
  block-size: var(--R-slider-control-size);
  inline-size: 210px;
  cursor: pointer;
  &::before {
    @include partials.ghost();
    border-top: var(--R-slider-border-width) solid;
    border-right: var(--R-slider-track-size) solid;
    transition: border-top 1ms, border-right 1ms !important;
  }
  &:has(> .r-slider__input:focus), &:active {
    // @default 2px when focused or active
    --R-slider-border-width: var(--r-slider-border-width, 2px);
  }
  &:has(> .r-slider__input:disabled) {
    cursor: not-allowed;
  }
}
@layer roughness__base {
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
