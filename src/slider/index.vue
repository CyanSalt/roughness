<script lang="ts" setup>
import '../common/style.scss'
import { useMouseInElement, useMousePressed } from '@vueuse/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes } from 'vue'
import { computed, useTemplateRef, watchEffect } from 'vue'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { useLocal } from '../common/utils'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
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
} & InputProps>()

const emit = defineEmits<{
  /** Callback function triggered when the value is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const name = useName(() => userName)

function round(value: number) {
  const rest = value % step
  return rest >= step / 2 ? value - rest + step : value - rest
}

const internalModelValue = useLocal({
  get: () => round(modelValue),
  set: value => {
    emit('update:modelValue', value)
  },
})

const ratio = computed(() => {
  return (internalModelValue.value - min) / (max - min) || 0
})

const { timestamp, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp.value
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-slider-border-width') ?? 0
  const trackSize = getLengthProperty(svg, '--R-slider-track-size') ?? 0
  const epsilon = 2
  const rectangle = rc.rectangle(
    epsilon,
    (height - trackSize) / 2 + epsilon,
    width - epsilon * 2,
    trackSize - epsilon * 2,
    {
      stroke: 'var(--R-slider-border-color)',
      strokeWidth,
    },
  )
  svg.appendChild(rectangle)
  const barRect = rc.rectangle(
    epsilon,
    (height - trackSize) / 2 + epsilon,
    height / 2 - epsilon + (width - height + epsilon * 2) * ratio.value,
    trackSize - epsilon * 2,
    {
      strokeWidth: 0,
      fill: 'var(--R-slider-color)',
      ...getFilledSizeOptions(strokeWidth),
    },
  )
  svg.appendChild(barRect)
  const controlRect = rc.rectangle(
    (width - height) * ratio.value + epsilon,
    epsilon,
    height - epsilon * 2,
    height - epsilon * 2,
    {
      stroke: 'var(--R-slider-border-color)',
      strokeWidth,
      fill: 'var(--r-common-background-color)',
      fillStyle: 'solid',
    },
  )
  svg.appendChild(controlRect)
}

const root = useTemplateRef<HTMLLabelElement>('root')
const input = useTemplateRef<HTMLInputElement>('input')

const { pressed } = useMousePressed({ target: root })
const { elementX } = useMouseInElement(root)

watchEffect(() => {
  if (!root.value || !pressed.value) return
  const width = root.value.clientWidth
  const height = root.value.clientHeight
  const currentRatio = Math.min(Math.max(elementX.value - height / 2, 0), width - height) / (width - height)
  internalModelValue.value = round(currentRatio * (max - min) + min)
  if (input.value) {
    input.value.focus()
  }
})
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "slider",
      "description": "Root of the slider."
    }
  ]
}
</defs>

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
    <RGraphics selector="slider" @draw="draw" />
  </label>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-slider-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-slider-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-slider-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-slider-control-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-slider-track-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-slider {
  // Color of the slider track when active.
  --R-slider-color: var(--r-slider-color, var(--r-common-primary-color));
  // Color of the slider control and track border.
  --R-slider-border-color: var(--r-slider-border-color, var(--r-common-color));
  // Width of the slider control and track border.
  --R-slider-border-width: var(--r-slider-border-width, var(--r-common-stroke-width));
  // Size of the slider control.
  --R-slider-control-size: var(--r-slider-control-size, var(--r-common-line-height));
  // Size of the slider track.
  --R-slider-track-size: var(--r-slider-track-size, var(--r-common-font-size));
  display: inline-flex;
  block-size: var(--R-slider-control-size);
  inline-size: 210px;
  cursor: pointer;
  &::before {
    border-top-style: solid;
    border-right-style: solid;
    @include partials.transition-runner((
      --R-slider-border-width: border-top-width,
      --R-slider-track-size: border-right-width,
    ));
  }
  &:has(> .r-slider__input:focus-visible), &:active {
    // @default 2px when focused or active
    --R-slider-border-width: var(--r-slider-border-width, var(--r-common-emphasized-stroke-width));
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
