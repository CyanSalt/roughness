<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { useLocal } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RDetails',
})

const {
  open = false,
  graphicsOptions,
} = defineProps<{
  /**
   * Whether the details are currently visible.
   * See [`open`]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#open}
   */
  open?: boolean,
} & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when visibility of the detail is changed. */
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  /**
   * Content of the summary.
   * See [`summary`]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary}.
   */
  summary?: (props: {}) => any,
  /** Content of the details. */
  default?: (props: {}) => any,
}>()

let internalOpen = $(useLocal({
  get: () => open,
  set: value => {
    emit('update:open', value)
  },
}))

function toggle(event: Event) {
  internalOpen = (event.target as HTMLDetailsElement).open
}

let summary = $ref<HTMLElement>()

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-details-summary-marker-border-width') ?? 0
  const options: Options = {
    strokeWidth,
    stroke: 'var(--R-details-summary-color)',
    fill: 'var(--R-details-summary-color)',
    ...getFilledSizeOptions(1),
  }
  const padding = 2
  const points: Point[] = internalOpen ? [
    [padding, height / 8 + padding],
    [width - padding, height / 8 + padding],
    [width / 2, height - padding],
  ] : [
    [width / 8 + padding, padding],
    [width / 8 + padding, height - padding],
    [width - padding, height / 2],
  ]
  const polygon = rc.polygon(points, options)
  svg.appendChild(polygon)
}
</script>

<template>
  <details
    :open="internalOpen"
    class="r-details"
    @toggle="toggle"
    @transitionrun="listener"
  >
    <RSpace ref="summary" tag="summary" :wrap="false" class="r-details__summary">
      <span class="r-details__summary-marker">
        <RGraphics :options="graphicsOptions" @draw="draw" />
      </span>
      <slot name="summary"></slot>
    </RSpace>
    <slot></slot>
  </details>
</template>

<style lang="scss">
@use '../common//partials';

@property --R-details-summary-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-details-summary-marker-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-details-gap-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-details {
  // Color of summary text and marker.
  --R-details-summary-color: var(--r-details-summary-color, var(--r-common-color));
  // Size of the block of summary marker.
  --R-details-summary-marker-size: var(--r-details-summary-marker-size, var(--r-common-line-height));
  // Width of summary marker border.
  --R-details-summary-marker-border-width: var(--r-details-summary-marker-border-width, var(--r-common-stroke-width));
  // Size of the gap between the summary and content.
  --R-details-gap-size: var(--r-details-gap-size, calc(1em - 4px));
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-details-summary-marker-border-width: border-top-width,
    ));
  }
}
.r-details__summary {
  display: flex;
  align-items: center;
  margin-block-end: var(--R-details-gap-size);
  color: var(--R-details-summary-color);
  cursor: pointer;
  // for Safari
  &::-webkit-details-marker {
    display: none;
  }
  &::marker {
    content: none;
  }
}
.r-details__summary-marker {
  flex: none;
  block-size: var(--R-details-summary-marker-size);
  inline-size: var(--R-details-summary-marker-size);
  pointer-events: none;
}
</style>
