<script lang="ts" setup>
import { useElementHover, useFocus, useMousePressed } from '@vueuse/core'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import '../common/style.scss'
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
  type = 'default',
} = defineProps<{
  block?: boolean,
  filled?: boolean,
  htmlType?: HTMLButtonElement['type'],
  rounded?: boolean,
  tag?: 'button' | 'a' | string,
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error' | string,
}>()

let root = $ref<HTMLButtonElement>()

const hovered = $(useElementHover($$(root)))
const { focused } = $(useFocus($$(root)))
const { pressed } = $(useMousePressed({ target: $$(root) }))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void hovered
  void focused
  void pressed
  const style = getComputedStyle(svg)
  const borderWidth = style.getPropertyValue('--r-button-border-width')
  const borderDash = style.getPropertyValue('--r-button-border-dash')
  const strokeWidth = parseInt(borderWidth, 10) || 0
  const strokeLineDash = borderDash === 'none'
    ? undefined
    : borderDash.split(/\s+/).map(part => parseInt(part, 10) || 0)
  const padding = 2
  const options: Options = {
    stroke: 'var(--r-button-border-color)',
    fill: filled ? 'var(--r-button-color)' : undefined,
    strokeWidth,
    strokeLineDash,
  }
  if (rounded) {
    const ellipse = rc.ellipse(
      Math.round(svg.width.baseVal.value / 2) - padding,
      Math.round(svg.height.baseVal.value / 2) - padding,
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
    ref="root"
    :type="htmlType"
    :class="['r-button', type, { 'is-filled': filled, 'is-block': block }]"
  >
    <RGraphics @draw="draw" />
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
@use '../common/_partials';

:global(:root) {
  --r-button-border-width: 1;
  --r-button-border-dash: none;
  --r-button-color: var(--r-common-text-color);
}
.r-button {
  --r-button-border-color: var(--r-button-color);
  appearance: none;
  display: inline-block;
  padding: var(--r-common-box-padding);
  color: var(--r-button-color);
  font-size: var(--r-common-font-size);
  line-height: var(--r-common-line-height);
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  &:hover {
    --r-button-border-dash: 8 8;
  }
  &:focus {
    --r-button-border-width: 2;
  }
  &:active {
    --r-button-border-width: 2;
  }
  &:disabled {
    text-decoration: line-through;
    opacity: 0.8;
    cursor: not-allowed;
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
  &.is-filled:not(:disabled) {
    @include partials.stroke(var(--r-common-background-color), 3px);
  }
  &.is-block {
    display: block;
  }
}
</style>
