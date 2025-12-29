<script lang="ts" setup>
import '../common/style.scss'
import { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { useTransitionListener } from '../common/property'
import { ColorProps, SizeProps } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { useGraphicsSelectors } from '../graphics/utils'
import { useDrawBox } from './utils'

defineOptions({
  name: 'RBox',
})

const {
  tag = 'span',
  filled = false,
  stroked = true,
  round = false,
  color,
  size,
  graphicsSelector,
} = defineProps<{
  /**
   * HTML tag for rendering the box.
   * @default 'span'
   */
  tag?: string,
  /** Whether the box is stroked with its border color. */
  stroked?: boolean,
  /** Whether the box is filled with its fill color. */
  filled?: boolean,
  /** Whether the box is round. */
  round?: boolean,
} & ColorProps & SizeProps & GraphicsProps>()

const emit = defineEmits<{
  /**
   * Ready to start drawing.
   * @type {(rc: import('roughjs/bin/svg').RoughSVG, element: SVGSVGElement, options: import('roughjs/bin/core').Options)}
   */
  (event: 'draw', rc: RoughSVG, element: SVGSVGElement, options: Options): void,
}>()

defineSlots<{
  /** Content of the box. */
  default?: (props: {}) => any,
}>()

const selectors = useGraphicsSelectors('box', () => graphicsSelector)

const drawBox = useDrawBox({
  stroked: () => stroked,
  filled: () => filled,
  round: () => round,
})

const { track, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, options: Options) {
  track()
  drawBox(rc, svg, options)
  emit('draw', rc, svg, options)
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "box",
      "description": "Root of the box."
    }
  ]
}
</defs>

<template>
  <component
    :is="tag"
    :class="['r-box', color, size, { 'is-filled': filled }]"
    @transitionrun="listener"
  >
    <RGraphics :selector="selectors" @draw="draw"></RGraphics>
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use './_partials' as box;

.r-box {
  // Color of the box border.
  --R-box-border-color: var(--r-box-border-color, var(--r-element-color));
  // Color of the box inside stroked line.
  --R-box-fill-color: var(--r-box-fill-color, var(--R-box-border-color));
  // Width of the box border.
  --R-box-border-width: var(--r-box-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-box-border-dash: var(--r-box-border-dash, none);
  // ^^^ for docs only
  @include box.box();
}
</style>
