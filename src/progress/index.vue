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
  color,
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
    :class="['r-progress', color, size]"
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

@property --R-progress-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-progress-block-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-progress-inline-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-progress-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-progress-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-progress-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

.r-progress {
  // Color of the progress bar and its content.
  --R-progress-color: var(--r-progress-color, var(--r-element-color));
  // Height of the progress bar.
  --R-progress-block-size: var(--r-progress-block-size, var(--r-common-line-height));
  // Width of the progress bar.
  --R-progress-inline-size: var(--r-progress-inline-size, calc(var(--R-progress-block-size) * 10));
  // Color of the progress bar border.
  --R-progress-border-color: var(--r-progress-border-color, var(--r-common-color));
  // Width of the progress bar border.
  --R-progress-border-width: var(--r-progress-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-progress-border-dash: var(--r-progress-border-dash, none);
  display: inline-block;
  block-size: var(--R-progress-block-size);
  inline-size: var(--R-progress-inline-size);
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-progress-border-width: border-top-width,
      --R-progress-border-dash: border-spacing,
    ));
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
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-progress-color);
  text-shadow: var(--r-common-stroke-text-shadow);
}
</style>
