<script lang="ts" setup>
import '../common/style.scss'
import { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { computed } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import type { ColorProps, SizeProps } from '../common/utils'
import { useDrawBox } from '../composables'
import RGraphics from '../graphics/index.vue'
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
  /**
   * Current numeric progress value.
   * The progress state is indeterminate if the value is `undefined`.
   */
  value?: number,
} & ColorProps & SizeProps>()

defineSlots<{
  /** Text displayed on the progress */
  default?: (props: {}) => any,
}>()

const indeterminate = computed(() => value === undefined)

const ratio = computed(() => {
  if (value === undefined) return 0
  return (value - min) / (max - min) || 0
})

const drawBox = useDrawBox()

const { track, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
  track()
  drawBox(rc, svg, overridden)
  const strokeWidth = getLengthProperty(svg, '--R-progress-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-progress-border-dash')
    ?.map(item => item ?? 0) ?? undefined
  const insetSize = getLengthProperty(svg, '--R-progress-inset-size') ?? 0
  const { width, height } = getSVGSize(svg)
  const epsilon = 2
  const progressSize = indeterminate.value
    ? (width - epsilon * 2) / 4
    : (width - epsilon * 2) * ratio.value
  if (insetSize) {
    const startLine = rc.line(
      insetSize + epsilon,
      epsilon,
      insetSize + epsilon,
      height - epsilon * 2,
      {
        stroke: 'var(--R-progress-color)',
        strokeWidth,
        strokeLineDash,
        ...overridden,
      },
    )
    svg.appendChild(startLine)
  }
  const endLine = rc.line(
    progressSize + insetSize + epsilon,
    epsilon,
    progressSize + insetSize + epsilon,
    height - epsilon * 2,
    {
      stroke: 'var(--R-progress-color)',
      strokeWidth,
      strokeLineDash,
      ...overridden,
    },
  )
  svg.appendChild(endLine)
  const barRect = rc.rectangle(
    insetSize + epsilon,
    epsilon,
    progressSize,
    height - epsilon * 2,
    {
      strokeWidth: 0,
      fill: 'var(--R-progress-color)',
      ...getFilledSizeOptions(0),
      ...overridden,
    },
  )
  svg.appendChild(barRect)
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "progress",
      "description": "Root of the progress."
    }
  ]
}
</defs>

<template>
  <RSpace
    inline
    align="center"
    :class="['r-progress', color, size, { 'is-indeterminate': indeterminate }]"
    role="progressbar"
    dir="ltr"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="value"
    @transitionrun="listener"
  >
    <RGraphics selector="progress" @draw="draw" />
    <span class="r-progress__content">
      <slot></slot>
    </span>
  </RSpace>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../box/_partials' as box;

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

@property --R-progress-inset-size {
  syntax: '<length-percentage>';
  inherits: true;
  initial-value: 0px;
}

@keyframes r-indeterminate-progress {
  0% {
    --R-progress-inset-size: 0%;
  }
  25% {
    --R-progress-inset-size: 25%;
  }
  50% {
    --R-progress-inset-size: 50%;
  }
  75% {
    --R-progress-inset-size: 75%;
  }
  100% {
    --R-progress-inset-size: 100%;
  }
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
  // Offset size of the progress bar.
  --R-progress-inset-size: var(--r-progress-inset-size, 0%);
  // Box styles
  --r-box-border-color: var(--R-progress-border-color);
  --r-box-border-width: var(--R-progress-border-width);
  --r-box-border-dash: var(--r-common-border-dash);
  display: inline-block;
  block-size: var(--R-progress-block-size);
  inline-size: var(--R-progress-inline-size);
  @include partials.colored-element();
  @include partials.sized-element();
  @include box.box();
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-progress-border-width: border-top-width,
      --R-progress-border-dash: border-spacing,
      --R-progress-inset-size: padding-top,
    ));
  }
  &.is-indeterminate {
    animation: r-indeterminate-progress 1s infinite steps(1);
  }
}
.r-progress__content {
  --r-element-font-size: calc(1em - 2px);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-progress-color);
  text-shadow: var(--r-common-stroke-text-shadow);
}
</style>
