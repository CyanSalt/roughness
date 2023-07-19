<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef } from 'vue'
import type { ColorProps, SizeProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize, measureSVGSize, measureSVGSizeAsArray } from '../graphics/utils'
import RIcon from '../icon/index.vue'

defineOptions({
  name: 'RButton',
})

const {
  block = false,
  disabled: userDisabled,
  filled = false,
  htmlType,
  loading = false,
  rounded = false,
  tag = 'button',
  type,
  size,
  reactions = (() => ['hover', 'focus', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  block?: boolean,
  disabled?: boolean,
  filled?: boolean,
  htmlType?: HTMLButtonElement['type'],
  loading?: boolean,
  rounded?: boolean,
  tag?: 'button' | 'a' | (string & {}),
} & ColorProps & SizeProps & GraphicsProps>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const disabled = $computed(() => {
  return Boolean(userDisabled || loading)
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-button-border-width') ?? 0
  const strokeLineDash = measureSVGSizeAsArray(svg, '--r-button-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const options: Options = {
    stroke: 'var(--r-button-border-color)',
    strokeWidth,
    strokeLineDash,
    fill: filled ? 'var(--r-button-color)' : undefined,
    ...getFilledSizeOptions(strokeWidth),
  }
  const padding = 2
  if (rounded) {
    const ellipse = rc.ellipse(
      width / 2,
      height / 2,
      width - padding * 2,
      height - padding * 2,
      options,
    )
    svg.appendChild(ellipse)
  } else {
    const rect = rc.rectangle(
      padding,
      padding,
      width - padding * 2,
      height - padding * 2,
      options,
    )
    svg.appendChild(rect)
  }
}
</script>

<template>
  <component
    :is="tag"
    :type="htmlType"
    :disabled="disabled"
    :class="['r-button', type, size, { 'is-filled': filled, 'is-block': block, 'is-loading': loading }]"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <slot></slot>
    <div v-if="loading" class="r-button__loading">
      <RIcon :type="type" name="loader" class="r-button__loading-icon" />
    </div>
  </component>
</template>

<style lang="scss" scoped>
@use '../common/_partials';
@use '../common/_reset';

:where(.r-button) {
  @include reset.button;
}
:where(a.r-button) {
  text-decoration: none;
}
.r-button {
  --r-button-color: var(--r-common-text-color);
  --r-button-border-color: var(--r-button-color);
  --r-button-border-width: 1px;
  --r-button-border-dash: none;
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--r-button-color);
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  text-decoration-thickness: calc(var(--r-button-border-width) + 1px);
  &:focus {
    outline: none;
  }
  :deep(.r-graphics) {
    font-size: inherit;
  }
  &:hover:not(.is-loading) {
    --r-button-border-dash: 8px;
  }
  &:focus, &:active {
    --r-button-border-width: 2px;
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
  &.primary {
    --r-button-color: var(--r-common-primary-color);
  }
  &.info {
    --r-button-color: var(--r-common-info-color);
  }
  &.success {
    --r-button-color: var(--r-common-success-color);
  }
  &.warning {
    --r-button-color: var(--r-common-warning-color);
  }
  &.error {
    --r-button-color: var(--r-common-error-color);
  }
  &.comment {
    --r-button-color: var(--r-common-comment-color);
  }
  &.small {
    font-size: var(--r-common-small-font-size);
  }
  &.large {
    font-size: var(--r-common-large-font-size);
  }
}
.r-button__loading {
  position: absolute;
  inset: 0;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background-color: var(--r-common-background-color);
    opacity: 0.2;
  }
}
.r-button__loading-icon {
  position: relative;
  z-index: 1;
}
</style>
