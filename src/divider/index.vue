<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RDivider',
})

const {
  vertical = false,
} = defineProps<{
  /** Whether to display vertical divider. */
  vertical?: boolean,
}>()

const { timestamp, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp.value
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-divider-line-width') ?? 0
  const epsilon = 2
  const line = rc.line(epsilon, epsilon, vertical ? epsilon : width - epsilon, vertical ? height - epsilon : epsilon, {
    stroke: 'var(--R-divider-color)',
    strokeWidth,
    ...getFilledSizeOptions(strokeWidth),
  })
  svg.appendChild(line)
}
</script>

<template>
  <span
    :class="['r-divider', { 'is-vertical': vertical }]"
    role="separator"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    @transitionrun="listener"
  >
    <RGraphics selector="divider" @draw="draw" />
  </span>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-divider-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-divider-gap-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-divider {
  // Color of the divider.
  --R-divider-color: var(--r-divider-color, var(--r-common-color));
  // Width of the divider.
  --R-divider-line-width: var(--r-divider-line-width, var(--r-common-stroke-width));
  // Size of the divider gap.
  --R-divider-gap-size: var(--r-divider-gap-size, calc(1em - 4px));
  display: block;
  block-size: 1px + 2px * 2;
  margin-block: calc(var(--R-divider-gap-size) - 2px);
  margin-inline: auto;
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-divider-line-width: border-top-width,
    ));
  }
  &.is-vertical {
    display: inline-block;
    block-size: var(--r-common-line-height);
    inline-size: 1px + 2px * 2;
    margin-block: auto;
    margin-inline: calc(var(--R-divider-gap-size) - 2px);
    vertical-align: middle;
  }
}
</style>
