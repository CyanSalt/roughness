<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef } from 'vue'
import type { ColorProps, SizeProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize, measureSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RAlert',
})

const {
  inline = false,
  type,
  size,
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  inline?: boolean,
} & ColorProps & SizeProps & GraphicsProps>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const lineWidth = measureSVGSize(svg, '--r-alert-line-width') ?? 0
  const lineLength = measureSVGSize(svg, '--r-alert-line-length') ?? 0
  const lineGap = measureSVGSize(svg, '--r-alert-line-gap') ?? 0

  const options: Options = {
    stroke: 'var(--r-alert-line-color)',
    strokeWidth: lineWidth,
  }

  const padding = 2
  const centerX = width / 2
  const centerY = height / 2
  const outerEllipsisA = width / 2 - padding
  const outerEllipsisB = height / 2 - padding
  const innerEllipsisA = outerEllipsisA - lineLength
  const innerEllipsisB = outerEllipsisB - lineLength
  const centerEllipsisA = outerEllipsisA + lineLength / 2
  const centerEllipsisB = outerEllipsisB + lineLength / 2
  const startAngle = -Math.PI / 2

  const unit = lineGap / Math.max(width, height)
  let lastX = Math.cos(startAngle) * centerEllipsisA
  let lastY = Math.sin(startAngle) * centerEllipsisB
  for (let angle = startAngle; angle < startAngle + 2 * Math.PI; angle += unit) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const currentX = cos * centerEllipsisA
    const currentY = sin * centerEllipsisB
    if ((currentX - lastX) ** 2 + (currentY - lastY) ** 2 > lineGap ** 2) {
      const startX = cos * innerEllipsisA
      const endX = cos * outerEllipsisA
      const startY = sin * innerEllipsisB
      const endY = sin * outerEllipsisB
      const line = rc.line(
        centerX + startX,
        centerY + startY,
        centerX + endX,
        centerY + endY,
        options,
      )
      svg.appendChild(line)
      lastX = currentX
      lastY = currentY
    }
  }
}
</script>

<template>
  <strong
    :class="['r-alert', type, size, { 'is-inline': inline }]"
    role="status"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <slot></slot>
  </strong>
</template>

<style lang="scss" scoped>
.r-alert {
  --r-alert-color: var(--r-common-text-color);
  --r-alert-line-color: var(--r-alert-color);
  --r-alert-line-width: 2px;
  --r-alert-line-length: 0.5em;
  // `calc(1em - 4px)` in fact
  --r-alert-line-gap: 12px;
  display: block;
  padding-block: calc(var(--r-common-box-padding-block) + var(--r-alert-line-length) / 2);
  padding-inline: calc(var(--r-common-box-padding-inline) + var(--r-alert-line-length) / 2);
  color: var(--r-alert-color);
  text-align: center;
  :deep(.r-graphics) {
    font-size: inherit;
  }
  &.is-inline {
    display: inline-block;
  }
  &.primary {
    --r-alert-color: var(--r-common-primary-color);
  }
  &.info {
    --r-alert-color: var(--r-common-info-color);
  }
  &.success {
    --r-alert-color: var(--r-common-success-color);
  }
  &.warning {
    --r-alert-color: var(--r-common-warning-color);
  }
  &.error {
    --r-alert-color: var(--r-common-error-color);
  }
  &.comment {
    --r-alert-color: var(--r-common-comment-color);
  }
  &.small {
    --r-alert-line-gap: 8px;
    font-size: var(--r-common-small-font-size);
  }
  &.large {
    --r-alert-line-gap: 16px;
    font-size: var(--r-common-large-font-size);
  }
}
</style>
