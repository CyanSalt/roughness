<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RAvatar',
})

const {
  name,
  round,
  graphicsOptions,
} = defineProps<{
  /** Unique key to generate color and pixels. */
  name: string,
  /** Whether the avatar is round. */
  round?: boolean,
} & GraphicsProps>()


function hash(str: string) {
  let code = 0
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i)
    // eslint-disable-next-line no-bitwise
    code = ((code << 5) - code + chr) | 0
  }
  return code
}

const code = $computed(() => hash(name))

/**
 * Inspired by minidenticons
 */
function getPixels(seed: number) {
  return Array.from({ length: 5 ** 2 }, (_, i) => i)
    // testing the 15 lowest weight bits of the hash
    // eslint-disable-next-line no-bitwise
    .filter(i => seed & (1 << (i % 15)))
    .map(i => {
      return {
        x: i > 14 ? 7 - Math.floor(i / 5) : Math.floor(i / 5),
        y: i % 5,
      }
    })
}

const pixels = $computed(() => getPixels(code))
const color = $computed(() => {
  const colors = 9
  const hue = (code % colors) * (360 / colors)
  return `hsl(${hue}deg 95% 45%)`
})

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-avatar-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-avatar-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const scaleX = width / 10
  const scaleY = height / 10
  for (const pixel of pixels) {
    const rectangle = rc.rectangle(
      (pixel.x + 2.5) * scaleX,
      (pixel.y + 2.5) * scaleY,
      scaleX,
      scaleY,
      {
        stroke: 'var(--R-avatar-pixel-color)',
      },
    )
    svg.appendChild(rectangle)
  }
  const padding = 2
  if (round) {
    const ellipse = rc.ellipse(
      width / 2,
      height / 2,
      width - padding * 2,
      height - padding * 2,
      {
        stroke: 'var(--R-avatar-border-color)',
        strokeWidth,
        strokeLineDash,
        disableMultiStroke: Boolean(strokeLineDash),
      },
    )
    svg.appendChild(ellipse)
  } else {
    const rectangle = rc.rectangle(
      padding,
      padding,
      width - padding * 2,
      height - padding * 2,
      {
        stroke: 'var(--R-avatar-border-color)',
        strokeWidth,
        strokeLineDash,
      },
    )
    svg.appendChild(rectangle)
  }
}
</script>

<template>
  <span
    class="r-avatar"
    :style="{ '--R-avatar-pixel-color': color }"
    @transitionrun="listener"
  >
    <RGraphics :graphics-options="graphicsOptions" @draw="draw"></RGraphics>
  </span>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-avatar-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-avatar-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-avatar-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-avatar-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

.r-avatar {
  // Size of the avatar.
  --R-avatar-size: var(--r-avatar-size, 2em);
  // Color of the avatar border.
  --R-avatar-border-color: var(--r-avatar-border-color, var(--r-common-color));
  // Width of the avatar border.
  --R-avatar-border-width: var(--r-avatar-border-width, 1px);
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-avatar-border-dash: var(--r-avatar-border-dash, none);
  block-size: var(--R-avatar-size);
  inline-size: var(--R-avatar-size);
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-avatar-border-width: border-top-width,
      --R-avatar-border-dash: border-spacing,
    ));
  }
}
</style>
