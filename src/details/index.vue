<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import { useTemplateRef } from 'vue'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { useLocal } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RDetails',
})

const {
  open = false,
} = defineProps<{
  /**
   * Whether the details are currently visible.
   * See [`open`]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#open}
   */
  open?: boolean,
}>()

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

const internalOpen = useLocal({
  get: () => open,
  set: value => {
    emit('update:open', value)
  },
})

function toggle(event: Event) {
  internalOpen.value = (event.target as HTMLDetailsElement).open
}

const summary = useTemplateRef<HTMLElement>('summary')

const { timestamp, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
  void timestamp.value
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-details-summary-marker-border-width') ?? 0
  const options: Options = {
    strokeWidth,
    stroke: 'var(--R-details-summary-color)',
    fill: 'var(--R-details-summary-color)',
    ...getFilledSizeOptions(1),
    ...overridden,
  }
  const epsilon = 2
  const points: Point[] = internalOpen.value ? [
    [epsilon, height / 8 + epsilon],
    [width - epsilon, height / 8 + epsilon],
    [width / 2, height - epsilon],
  ] : [
    [width / 8 + epsilon, epsilon],
    [width / 8 + epsilon, height - epsilon],
    [width - epsilon, height / 2],
  ]
  const polygon = rc.polygon(points, options)
  svg.appendChild(polygon)
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "details.summary-marker",
      "description": "Marker of the details summary."
    }
  ]
}
</defs>

<template>
  <details
    :open="internalOpen"
    class="r-details"
    @toggle="toggle"
    @transitionrun="listener"
  >
    <RSpace ref="summary" tag="summary" :wrap="false" class="r-details__summary">
      <span class="r-details__summary-marker">
        <RGraphics selector="details.summary-marker" @draw="draw" />
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
