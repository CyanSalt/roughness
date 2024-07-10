<script lang="ts" setup>
import '../common/style.scss'
import { colord } from 'colord'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray, getProperty, useTransitionListener } from '../common/property'
import { useLocal } from '../common/utils'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
import RLoading from '../loading/index.vue'

defineOptions({
  name: 'RColorPicker',
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
  disabled: userDisabled,
  loading = false,
  modelValue,
  name: userName,
  graphicsOptions,
  ...props
} = defineProps<{
  /**
   * Whether the color picker is loading.
   * It will be non-interactive in loading state.
   */
  loading?: boolean,
  /** Value of the color picker. */
  modelValue?: string,
} & InputProps & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when the color is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const name = $(useName($$(userName)))

let internalModelValue = $(useLocal({
  get: () => modelValue || '#000000',
  set: value => {
    emit('update:modelValue', value)
  },
}))

const disabled = $computed(() => {
  return Boolean(userDisabled || loading)
})

let root = $ref<HTMLElement>()

const { timestamp, listener } = $(useTransitionListener('::before'))

let color = $computed(() => {
  if (!root) return undefined
  void timestamp
  let defaultColor = colord(getProperty(root, '--r-common-color'))
  const currentColor = colord(internalModelValue)
  return currentColor
    .lighten((defaultColor.toHsl().l - currentColor.toHsl().l) / 100)
    .toHex()
})

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-color-picker-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-color-picker-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--R-color-picker-color)',
      strokeWidth,
      strokeLineDash,
      fill: 'var(--R-color-picker-current-color)',
    },
  )
  svg.appendChild(rectangle)
}

const style = $computed(() => {
  return {
    '--R-color-picker-current-color': internalModelValue,
    '--R-color-picker-color': `var(--r-color-picker-color, ${color})`,
  }
})
</script>

<template>
  <label
    ref="root"
    :class="['r-color-picker', { 'is-loading': loading }]"
    :style="style"
    @transitionrun="listener"
  >
    <input
      v-model="internalModelValue"
      :disabled="disabled"
      :name="name"
      v-bind="props"
      type="color"
      class="r-color-picker__input"
    >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <slot>{{ internalModelValue }}</slot>
    <RLoading v-if="loading" class="r-button__loading" />
  </label>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

.r-color-picker {
  // Color of the color picker text and border.
  // @default var(--r-common-color) in adjusting hue and saturation to be the same as the value if set
  --R-color-picker-color: var(--r-color-picker-color, var(--r-common-color));
  // Width of the color picker border.
  // @type {<length>}
  --R-color-picker-border-width: var(--r-color-picker-border-width, 1px);
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  // @type {<length>+ | none}
  --R-color-picker-border-dash: var(--r-color-picker-border-dash, none);
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-color-picker-color);
  &::before {
    @include partials.ghost();
    border-spacing: var(--R-color-picker-border-dash);
    border-top: var(--R-color-picker-border-width) solid;
    background-color: var(--r-common-color);
    transition: border-spacing 1ms, border-top 1ms, background-color 1ms !important;
  }
  &:hover:not(.is-loading) {
    // @default 8px when hovered
    --R-color-picker-border-dash: var(--r-color-picker-border-dash, 8px);
  }
  &:focus-visible, &:active {
    // @default 2px when focused or active
    --R-color-picker-border-width: var(--r-color-picker-border-width, 2px);
  }
  &:not(.is-loading) {
    cursor: pointer;
  }
  &:disabled:not(.is-loading) {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &:not(:disabled) {
    @include partials.stroke(var(--r-common-background-color), 3px);
  }
}
.r-color-picker__input {
  position: absolute;
  block-size: 0;
  inline-size: 0;
  opacity: 0;
}
</style>
