<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import type { ColorProps, SizeProps } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RProgress',
})

const {
  max = 1,
  min = 0,
  value,
  type,
  size,
  graphicsOptions,
} = defineProps<{
  /**
   * Lower numeric bound of the range.
   * @default 0
   */
  min?: number,
  /**
   * Upper numeric bound of the range.
   * @default 1
   */
  max?: number,
  /** Current numeric progress value. */
  value: number,
} & ColorProps & SizeProps & GraphicsProps>()

defineSlots<{
  /** Text displayed on the progress */
  default?: (props: {}) => any,
}>()

const ratio = $computed(() => {
  return (value - min) / (max - min) || 0
})

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const strokeWidth = getLengthProperty(svg, '--R-progress-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-progress-border-dash')
    ?.map(item => item ?? 0) ?? undefined
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--R-progress-border-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(rectangle)
  const line = rc.line(
    (width - padding * 2) * ratio,
    padding,
    (width - padding * 2) * ratio,
    height - padding * 2,
    {
      stroke: 'var(--R-progress-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(line)
  const barRect = rc.rectangle(
    padding,
    padding,
    (width - padding * 2) * ratio,
    height - padding * 2,
    {
      strokeWidth: 0,
      fill: 'var(--R-progress-color)',
      ...getFilledSizeOptions(0),
    },
  )
  svg.appendChild(barRect)
}
</script>

<template>
  <RSpace
    inline
    align="center"
    :class="['r-progress', type, size]"
    role="progressbar"
    @transitionrun="listener"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <span class="r-progress__content">
      <slot></slot>
    </span>
  </RSpace>
</template>

<style lang="scss">
@use '../common/_partials';

.r-progress {
  // Color of the progress bar and its content.
  --R-progress-color: var(--r-progress-color, var(--r-element-color));
  // Height of the progress bar.
  // @type {<length>}
  --R-progress-block-size: var(--r-progress-block-size, var(--r-common-line-height));
  // Width of the progress bar.
  // @type {<length>}
  --R-progress-inline-size: var(--r-progress-inline-size, calc(var(--R-progress-block-size) * 10));
  // Color of the progress bar border.
  // @type {<length>}
  --R-progress-border-color: var(--r-progress-border-color, var(--r-common-color));
  // Width of the progress bar border.
  // @type {<length>}
  --R-progress-border-width: var(--r-progress-border-width, 1px);
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  // @type {<length>+ | none}
  --R-progress-border-dash: var(--r-progress-border-dash, none);
  display: inline-block;
  block-size: var(--R-progress-block-size);
  inline-size: var(--R-progress-inline-size);
  &::before {
    @include partials.ghost();
    border-spacing: var(--R-progress-border-dash);
    border-top: var(--R-progress-border-width) solid;
    transition: border-spacing 1ms, border-top 1ms !important;
  }
  &.primary {
    --r-element-color: var(--r-common-primary-color);
  }
  &.info {
    --r-element-color: var(--r-common-info-color);
  }
  &.success {
    --r-element-color: var(--r-common-success-color);
  }
  &.warning {
    --r-element-color: var(--r-common-warning-color);
  }
  &.error {
    --r-element-color: var(--r-common-error-color);
  }
  &.comment {
    --r-element-color: var(--r-common-comment-color);
  }
  &.small {
    --r-element-font-size: var(--r-common-small-font-size);
  }
  &.large {
    --r-element-font-size: var(--r-common-large-font-size);
  }
}
.r-progress__content {
  --r-element-font-size: calc(1em - 2px);
  @include partials.stroke(var(--r-common-background-color), 3px);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-progress-color);
}
</style>
