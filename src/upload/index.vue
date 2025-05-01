<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RLoading from '../loading/index.vue'

defineOptions({
  name: 'RUpload',
})

interface InputProps {
  /** @ignore */
  accept?: InputHTMLAttributes['accept'],
  /** @ignore */
  capture?: InputHTMLAttributes['capture'],
  /** @ignore */
  disabled?: InputHTMLAttributes['disabled'],
  /** @ignore */
  form?: InputHTMLAttributes['form'],
  /** @ignore */
  multiple?: InputHTMLAttributes['multiple'],
  /** @ignore */
  name?: InputHTMLAttributes['name'],
}

const {
  block = false,
  disabled: userDisabled,
  filled = false,
  loading = false,
  multiple = false,
  name: userName,
  graphicsOptions,
  ...props
} = defineProps<{
  /** Whether the upload is displayed as block. */
  block?: boolean,
  /** Whether the upload is filled with its color. */
  filled?: boolean,
  /**
   * Whether the upload is loading.
   * It will be non-interactive in loading state.
   */
  loading?: boolean,
} & InputProps & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when one or more files are selected. */
  (event: 'select', value: File | File[]): void,
}>()

defineSlots<{
  /** Content of the upload. */
  default?: (props: {}) => any,
}>()

const name = $(useName($$(userName)))

const disabled = $computed(() => {
  return Boolean(userDisabled || loading)
})

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-upload-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-upload-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--R-upload-border-color)',
      strokeWidth,
      strokeLineDash,
      fill: filled ? 'var(--R-upload-color)' : undefined,
      ...getFilledSizeOptions(strokeWidth),
    },
  )
  svg.appendChild(rectangle)
}

function change(event: InputEvent) {
  const target = event.target as HTMLInputElement
  const files = target.files!
  if (files.length) {
    emit('select', multiple ? Array.from(files) : files[0])
  }
  target.value = ''
}
</script>

<template>
  <label
    :class="['r-upload', { 'is-block': block }]"
    @transitionrun="listener"
  >
    <input
      :disabled="disabled"
      :multiple="multiple"
      :name="name"
      v-bind="props"
      type="file"
      class="r-upload__input"
      @change="change"
    >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <slot></slot>
    <RLoading v-if="loading" class="r-upload__loading" />
  </label>
</template>

<style lang="scss">
@use '../common/_partials';

.r-upload {
  // Color of the upload text.
  --R-upload-color: var(--r-upload-color, var(--r-common-color));
  // Color of the upload border.
  --R-upload-border-color: var(--r-upload-border-color, var(--R-upload-color));
  // Width of the upload border.
  // @type {<length>}
  --R-upload-border-width: var(--r-upload-border-width, 1px);
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  // @type {<length>+ | none}
  --R-upload-border-dash: var(--r-upload-border-dash, 8px);
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-upload-color);
  text-align: center;
  cursor: pointer;
  &::before {
    @include partials.ghost();
    border-spacing: var(--R-upload-border-dash);
    border-top: var(--R-upload-border-width) solid;
    transition: border-spacing 1ms, border-top 1ms !important;
  }
  &:focus-visible, &:active {
    // @default 2px when focused or active
    --R-upload-border-width: var(--r-upload-border-width, 2px);
  }
  &:disabled:not(.is-loading) {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &.is-filled:not(:disabled) {
    text-shadow: var(--r-common-stroke-text-shadow);
  }
  &.is-block {
    display: block;
  }
}
.r-upload__input {
  position: absolute;
  block-size: 0;
  inline-size: 0;
  opacity: 0;
}
</style>
