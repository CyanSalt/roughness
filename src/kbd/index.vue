<script lang="ts" setup>
import { Options } from 'roughjs/bin/core'
import '../common/style.scss'
import { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RKbd',
})

defineSlots<{
  /** Content of the kbd. */
  default?: (props: {}) => any,
}>()

const { track, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
  track()
  const { width, height } = getSVGSize(svg)
  const sideSize = getLengthProperty(svg, '--R-kbd-side-size') ?? 0
  const strokeWidth = getLengthProperty(svg, '--R-kbd-border-width') ?? 0
  const options: Options = {
    stroke: 'var(--R-kbd-border-color)',
    strokeWidth,
  }
  const epsilon = 2
  const rectangle = rc.rectangle(
    epsilon,
    epsilon,
    width - sideSize - epsilon * 2,
    height - sideSize - epsilon * 2,
    {
      ...options,
      ...overridden,
    },
  )
  svg.appendChild(rectangle)
  const frame = rc.linearPath([
    [epsilon, height - sideSize - epsilon],
    [sideSize + epsilon, height - epsilon],
    [width - epsilon, height - epsilon],
    [width - epsilon, sideSize + epsilon],
    [width - sideSize - epsilon, epsilon],
  ], {
    ...options,
    ...overridden,
  })
  svg.appendChild(frame)
  const shadow = rc.polygon([
    [epsilon, height - sideSize - epsilon],
    [sideSize + epsilon, height - epsilon],
    [width - epsilon, height - epsilon],
    [width - epsilon, sideSize + epsilon],
    [width - sideSize - epsilon, epsilon],
    [width - sideSize - epsilon, height - sideSize - epsilon],
  ], {
    ...options,
    strokeWidth: 0,
    fill: 'var(--R-kbd-border-color)',
    hachureAngle: 45,
    ...getFilledSizeOptions(1),
    ...overridden,
  })
  svg.appendChild(shadow)
  const line = rc.line(
    width - sideSize - epsilon,
    height - sideSize - epsilon,
    width - epsilon,
    height - epsilon,
    {
      ...options,
      ...overridden,
    },
  )
  svg.appendChild(line)
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "kbd",
      "description": "Root of the kbd."
    }
  ]
}
</defs>

<template>
  <kbd class="r-kbd" @transitionrun="listener">
    <RGraphics selector="kbd" @draw="draw"></RGraphics>
    <slot></slot>
  </kbd>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-kbd-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-kbd-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-kbd-top-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-kbd-side-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-kbd-padding-inline {
  syntax: '<length-percentage>+';
  inherits: true;
  initial-value: 0px;
}

.r-kbd {
  // Color of the kbd border.
  --R-kbd-border-color: var(--r-kbd-border-color, var(--r-element-color));
  // Width of the kbd border.
  --R-kbd-border-width: var(--r-kbd-border-width, var(--r-common-stroke-width));
  // Area height of the kbd top surface.
  --R-kbd-top-size: var(--r-kbd-block-size, 2em);
  // Horizontal padding of the kbd top surface.
  --R-kbd-padding-inline: var(--r-kbd-padding-inline, calc(var(--R-kbd-top-size) - 2 * 1ch));
  // Area width of the kbd side surfaces.
  --R-kbd-side-size: var(--r-kbd-side-size, 6px);
  display: inline-block;
  padding-right: calc(var(--R-kbd-padding-inline) + var(--R-kbd-side-size));
  padding-bottom: var(--R-kbd-side-size);
  padding-left: var(--R-kbd-padding-inline);
  font-family: var(--r-common-mono-font-family);
  font-size: var(--r-common-small-font-size);
  line-height: var(--R-kbd-top-size);
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-kbd-border-width: border-top-width,
      --R-kbd-side-size: padding-top,
    ));
  }
}
</style>
