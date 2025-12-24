<script lang="ts" setup>
import '../common/style.scss'
import { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import { ColorProps, SizeProps } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RBox',
})

const {
  as = 'span',
  filled = false,
  round = false,
  color,
  size,
  graphicsOptions,
} = defineProps<{
  /**
   * HTML tag for rendering the box.
   * @default 'span'
   */
  as?: string,
  /** Whether the box is filled with its color. */
  filled?: boolean,
  /** Whether the box is round. */
  round?: boolean,
} & ColorProps & SizeProps & GraphicsProps>()

const emit = defineEmits<{
  /** Ready to start drawing. */
  (event: 'draw', rc: RoughSVG, element: SVGSVGElement): void,
}>()

defineSlots<{
  /** Content of the box. */
  default?: (props: {}) => any,
}>()

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-box-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-box-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const options: Options = {
    stroke: 'var(--R-box-border-color)',
    strokeWidth,
    strokeLineDash,
    fill: filled ? 'var(--R-box-border-color)' : undefined,
    ...getFilledSizeOptions(strokeWidth),
  }
  const epsilon = 2
  if (round) {
    const ellipse = rc.ellipse(
      width / 2,
      height / 2,
      width - epsilon * 2,
      height - epsilon * 2,
      {
        ...options,
        disableMultiStroke: Boolean(strokeLineDash),
      },
    )
    svg.appendChild(ellipse)
  } else {
    const rectangle = rc.rectangle(
      epsilon,
      epsilon,
      width - epsilon * 2,
      height - epsilon * 2,
      options,
    )
    svg.appendChild(rectangle)
  }
  emit('draw', rc, svg)
}
</script>

<template>
  <component
    :is="as"
    :class="['r-box', color, size, { 'is-filled': filled }]"
    @transitionrun="listener"
  >
    <RGraphics :graphics-options="graphicsOptions" @draw="draw"></RGraphics>
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-box-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-box-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-box-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

.r-box {
  // Color of the box border.
  --R-box-border-color: var(--r-box-border-color, var(--r-element-color));
  // Width of the box border.
  --R-box-border-width: var(--r-box-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-box-border-dash: var(--r-box-border-dash, none);
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-box-border-width: border-top-width,
      --R-box-border-dash: border-spacing,
    ));
  }
  &.is-filled:not(:disabled) {
    text-shadow: var(--r-common-stroke-text-shadow);
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
</style>
