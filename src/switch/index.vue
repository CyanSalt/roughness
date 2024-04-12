<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { effectRef } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RSwitch',
})

const {
  disabled = false,
  modelValue,
  graphicsOptions,
} = defineProps<{
  disabled?: boolean,
  /** State of the switch */
  modelValue?: boolean,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

let internalModelValue = $(effectRef({
  get: () => modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
}))

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-switch-border-width') ?? 0
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke: 'var(--r-switch-border-color)',
    strokeWidth,
    fill: internalModelValue ? 'var(--r-switch-track-color)' : undefined,
    ...getFilledSizeOptions(strokeWidth),
  })
  svg.appendChild(rectangle)
  const handleOptions: Options = {
    stroke: 'var(--r-switch-border-color)',
    fill: 'var(--r-switch-handle-color)',
    fillStyle: 'solid',
  }
  const handleSize = (height - 2 * padding) * 3 / 4
  const handleMargin = (height - handleSize) / 2
  if (internalModelValue) {
    const handleRectangle = rc.rectangle(
      width - handleMargin - handleSize,
      handleMargin,
      handleSize,
      handleSize,
      handleOptions,
    )
    svg.appendChild(handleRectangle)
  } else {
    const handleRectangle = rc.rectangle(
      handleMargin,
      handleMargin,
      handleSize,
      handleSize,
      handleOptions,
    )
    svg.appendChild(handleRectangle)
  }
}
</script>

<template>
  <RSpace
    tag="label"
    inline
    :wrap="false"
    class="r-switch"
    @transitionrun="listener"
  >
    <input
      v-model="internalModelValue"
      :disabled="disabled"
      type="checkbox"
      class="r-switch__input"
    >
    <span class="r-switch__control">
      <RGraphics :options="graphicsOptions" @draw="draw" />
    </span>
    <slot></slot>
  </RSpace>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

.r-switch {
  --r-switch-border-color: var(--r-common-color);
  --r-switch-border-width: 1px;
  --r-switch-control-size: var(--r-common-line-height);
  --r-switch-track-color: var(--r-common-primary-color);
  --r-switch-handle-color: var(--r-common-background-color);
  position: relative;
  cursor: pointer;
  &::before {
    @include partials.ghost();
    border-top: var(--r-switch-border-width) solid;
    transition: border-top 1ms !important;
  }
  &:focus-within,
  &:not(:has(> .r-checkbox__input:disabled)):active {
    --r-switch-border-width: 2px;
  }
  &:has(> .r-checkbox__input:disabled) {
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
}
@layer base {
  .r-switch__input {
    @include reset.input-checkbox;
  }
}
.r-switch__input {
  position: absolute;
}
.r-switch__control {
  flex: none;
  block-size: var(--r-switch-control-size);
  inline-size: calc(var(--r-switch-control-size) * 2);
  .r-switch__input:disabled + & {
    opacity: 0.8;
  }
}
</style>
