<script lang="ts" setup>
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import '../common/style.scss'
import { toRef } from 'vue'
import type { ColorProps, ReactionProps, SizeProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'

defineOptions({
  name: 'RButton',
})

const {
  block = false,
  filled = false,
  htmlType,
  rounded = false,
  tag = 'button',
  type,
  size,
  reactions = (() => ['hover', 'focus', 'active']) as never,
} = defineProps<{
  block?: boolean,
  filled?: boolean,
  htmlType?: HTMLButtonElement['type'],
  rounded?: boolean,
  tag?: 'button' | 'a' | string,
} & ColorProps & SizeProps & ReactionProps>()

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const style = getComputedStyle(svg)
  const borderWidth = style.getPropertyValue('--r-button-border-width')
  const borderDash = style.getPropertyValue('--r-button-border-dash')
  const strokeWidth = parseInt(borderWidth, 10) || 0
  const strokeLineDash = borderDash === 'none'
    ? undefined
    : borderDash.split(/[,\s]+/).map(part => parseInt(part, 10) || 0)
  const padding = 2
  const options: Options = {
    stroke: 'var(--r-button-border-color)',
    fill: filled ? 'var(--r-button-color)' : undefined,
    strokeWidth,
    strokeLineDash,
  }
  if (rounded) {
    const ellipse = rc.ellipse(
      Math.round(svg.width.baseVal.value / 2),
      Math.round(svg.height.baseVal.value / 2),
      svg.width.baseVal.value - padding * 2,
      svg.height.baseVal.value - padding * 2,
      options,
    )
    svg.appendChild(ellipse)
  } else {
    const rect = rc.rectangle(
      padding,
      padding,
      svg.width.baseVal.value - padding * 2,
      svg.height.baseVal.value - padding * 2,
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
    :class="['r-button', type, size, { 'is-filled': filled, 'is-block': block }]"
  >
    <RGraphics @draw="draw" />
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
@use '../common/_partials';

.r-button {
  --r-button-color: var(--r-common-text-color);
  --r-button-border-color: var(--r-button-color);
  --r-button-border-width: 1;
  --r-button-border-dash: none;
  appearance: none;
  display: inline-block;
  padding: var(--r-common-box-padding);
  color: var(--r-button-color);
  font-size: var(--r-common-font-size);
  line-height: var(--r-common-line-height);
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  text-decoration-thickness: calc(var(--r-button-border-width) * 1px + 1px);
  &:hover {
    --r-button-border-dash: 8 8;
  }
  &:focus, &:active {
    --r-button-border-width: 2;
  }
  &:disabled {
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
  &.small {
    font-size: var(--r-common-small-font-size);
  }
  &.large {
    font-size: var(--r-common-large-font-size);
  }
}
a.r-button {
  text-decoration: none;
}
</style>
