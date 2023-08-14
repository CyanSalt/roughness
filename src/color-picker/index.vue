<script lang="ts" setup>
import '../common/style.scss'
import { colord } from 'colord'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, getLengthPropertyAsArray, getProperty } from '../common/property'
import { useReactionState } from '../common/reaction'
import type { ColorProps, SizeProps } from '../common/utils'
import { effectRef } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
import RLoading from '../loading/index.vue'

defineOptions({
  name: 'RColorPicker',
})

const {
  disabled: userDisabled,
  loading = false,
  modelValue,
  reactions = (() => ['hover', 'focus', 'active', 'dark']) as never,
  graphicsOptions,
} = defineProps<{
  disabled?: boolean,
  loading?: boolean,
  modelValue?: string,
} & ColorProps & SizeProps & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

let internalModelValue = $(effectRef({
  get: () => modelValue || '#000000',
  set: value => {
    emit('update:modelValue', value)
  },
}))

const disabled = $computed(() => {
  return Boolean(userDisabled || loading)
})

const getReactionState = useReactionState(() => reactions)

let root = $ref<HTMLElement>()

let color = $computed(() => {
  getReactionState()
  if (!root) return undefined
  let defaultColor = colord(getProperty(root, '--r-common-text-color'))
  const currentColor = colord(internalModelValue)
  return currentColor
    .lighten((defaultColor.toHsl().l - currentColor.toHsl().l) / 100)
    .toHex()
})

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-color-picker-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--r-color-picker-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--r-color-picker-color)',
      strokeWidth,
      strokeLineDash,
      fill: 'var(--r-color-picker-current-color)',
    },
  )
  svg.appendChild(rectangle)
}

const style = $computed(() => {
  return {
    '--r-color-picker-current-color': internalModelValue,
    '--r-color-picker-color': color,
  }
})
</script>

<template>
  <label
    ref="root"
    :class="['r-color-picker', { 'is-loading': loading }]"
    :style="style"
  >
    <input
      v-model="internalModelValue"
      :disabled="disabled"
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
  --r-color-picker-current-color: var(--r-element-color);
  --r-color-picker-color: var(--r-common-text-color);
  --r-color-picker-border-width: 1px;
  --r-color-picker-border-dash: none;
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--r-color-picker-color);
  &:hover:not(.is-loading) {
    --r-button-border-dash: 8px;
  }
  &:focus, &:active {
    --r-button-border-width: 2px;
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
