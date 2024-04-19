<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes } from 'vue'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { useModel } from '../common/utils'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RSwitch',
})

interface InputProps {
  /** @ignore */
  disabled?: InputHTMLAttributes['disabled'],
  /** @ignore */
  form?: InputHTMLAttributes['form'],
  /** @ignore */
  name?: InputHTMLAttributes['name'],
  /** @ignore */
  required?: InputHTMLAttributes['required'],
}

const {
  modelValue,
  name: userName,
  graphicsOptions,
  ...props
} = defineProps<{
  /** State of the switch. */
  modelValue?: boolean,
} & InputProps & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when state is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const name = $(useName($$(userName)))

let internalModelValue = $(useModel({
  get: () => modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
}))

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-switch-border-width') ?? 0
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke: 'var(--R-switch-border-color)',
    strokeWidth,
    fill: internalModelValue ? 'var(--R-switch-track-color)' : undefined,
    ...getFilledSizeOptions(strokeWidth),
  })
  svg.appendChild(rectangle)
  const handleOptions: Options = {
    stroke: 'var(--R-switch-border-color)',
    fill: 'var(--R-switch-handle-color)',
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
      :name="name"
      v-bind="props"
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
  // Color of the switch control border.
  --R-switch-border-color: var(--r-switch-border-color, var(--r-common-color));
  // Width of the switch control border.
  // @type {<length>}
  --R-switch-border-width: var(--r-switch-border-width, 1px);
  // Size of the switch control.
  // @type {<length>}
  --R-switch-control-size: var(--r-switch-control-size, var(--r-common-line-height));
  // Color of the switch track when open.
  --R-switch-track-color: var(--r-switch-track-color, var(--r-common-primary-color));
  // Color of the switch handle.
  --R-switch-handle-color: var(--r-switch-handle-color, var(--r-common-background-color));
  position: relative;
  cursor: pointer;
  &::before {
    @include partials.ghost();
    border-top: var(--R-switch-border-width) solid;
    transition: border-top 1ms !important;
  }
  &:focus-within,
  &:not(:has(> .r-checkbox__input:disabled)):active {
    // @default 2px when focused or active
    --R-switch-border-width: var(--r-switch-border-width, 2px);
  }
  &:has(> .r-checkbox__input:disabled) {
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
}
@layer roughness__base {
  .r-switch__input {
    @include reset.input-checkbox;
  }
}
.r-switch__input {
  position: absolute;
}
.r-switch__control {
  flex: none;
  block-size: var(--R-switch-control-size);
  inline-size: calc(var(--R-switch-control-size) * 2);
  .r-switch__input:disabled + & {
    opacity: 0.8;
  }
}
</style>
