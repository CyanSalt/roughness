<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray } from '../common/property'
import { useReactionState } from '../common/reaction'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RLoading from '../loading/index.vue'

defineOptions({
  name: 'RUpload',
})

const {
  accept,
  block = false,
  disabled: userDisabled,
  filled = false,
  loading = false,
  multiple = false,
  reactions = (() => ['hover', 'focus', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  accept?: InputHTMLAttributes['accept'],
  /** Whether the upload is displayed as block */
  block?: boolean,
  disabled?: boolean,
  /** Whether the upload is filled with its color */
  filled?: boolean,
  /**
   * Whether the upload is loading.
   * It will be non-interactive in loading state
   */
  loading?: boolean,
  multiple?: boolean,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'select', value: File | File[]): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const disabled = $computed(() => {
  return Boolean(userDisabled || loading)
})

const getReactionState = useReactionState(() => reactions)

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-upload-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--r-upload-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--r-upload-border-color)',
      strokeWidth,
      strokeLineDash,
      fill: filled ? 'var(--r-upload-color)' : undefined,
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
  <label :class="['r-upload', { 'is-block': block }]">
    <input
      type="file"
      :accept="accept"
      :disabled="disabled"
      :multiple="multiple"
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
  --r-upload-color: var(--r-element-color);
  --r-upload-border-color: var(--r-upload-color);
  --r-upload-border-width: 1px;
  --r-upload-border-dash: 8px;
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--r-upload-color);
  text-align: center;
  cursor: pointer;
  &:focus, &:active {
    --r-upload-border-width: 2px;
  }
  &:disabled:not(.is-loading) {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &.is-filled:not(:disabled) {
    @include partials.stroke(var(--r-common-background-color), 3px);
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
