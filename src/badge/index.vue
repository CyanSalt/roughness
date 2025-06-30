<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RBadge',
})

const {
  graphicsOptions,
} = defineProps<{
} & GraphicsProps>()

defineSlots<{
  /** Content of the badge marker. */
  marker?: (props: {}) => any,
  /** Decorated content of the badge. */
  default?: (props: {}) => any,
}>()

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-badge-border-width') ?? 0
  const padding = 2
  const ellipse = rc.ellipse(
    width / 2,
    height / 2,
    width - padding * 2,
    height - padding * 2,
    {
      strokeWidth,
      stroke: 'var(--R-badge-color)',
    },
  )
  svg.appendChild(ellipse)
}
</script>

<template>
  <span class="r-badge" @transitionrun="listener">
    <sup class="r-badge__marker">
      <RGraphics :options="graphicsOptions" @draw="draw" />
      <span class="r-badge__marker-content"><slot name="marker"></slot></span>
    </sup>
    <slot></slot>
  </span>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-badge-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-badge-padding-block {
  syntax: '<length-percentage>+';
  inherits: true;
  initial-value: 0px;
}

@property --R-badge-padding-inline {
  syntax: '<length-percentage>+';
  inherits: true;
  initial-value: 0px;
}

@property --R-badge-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-badge {
  // Color of the badge marker.
  --R-badge-color: var(--r-badge-color, var(--r-common-error-color));
  // Vertical padding of the badge marker.
  --R-badge-padding-block: var(--r-badge-padding-block, calc((1em - 4px) / 2 - 4px));
  // Horizontal padding of the badge marker.
  --R-badge-padding-inline: var(--r-badge-padding-inline, calc((1em - 4px) - 4px));
  // Width of the badge marker border.
  --R-badge-border-width: var(--r-badge-border-width, var(--r-common-stroke-width));
  position: relative;
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-badge-border-width: border-top-width,
    ));
  }
}
.r-badge__marker {
  --r-element-font-size: calc(1em - 4px);
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  padding-block: var(--R-badge-padding-block);
  padding-inline: var(--R-badge-padding-inline);
  color: var(--R-badge-color);
  transform: translate(75%, -25%);
  &:has(> .r-badge__marker-content:empty) {
    padding-inline: var(--R-badge-padding-block);
  }
}
.r-badge__marker-content {
  font-size: inherit;
}
</style>
