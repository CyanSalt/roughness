<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { drawSVGNode, getFilledSizeOptions, SVGNode } from '../graphics/utils'
import RText from '../text/index.vue'
import { IconNode } from './utils'

defineOptions({
  name: 'RIcon',
})

const {
  icon,
  filled,
  graphicsOptions,
} = defineProps<{
  /**
   * Icon object conforming to the type constraint.
   */
  icon: IconNode,
  /** Whether to fill the icon. */
  filled?: boolean,
} & GraphicsProps>()

const { timestamp, listener } = $(useTransitionListener('::before'))

function isSVGNodeList(node: IconNode): node is SVGNode[] {
  return !icon.length || Array.isArray(icon[0])
}

/**
 * @see {@link lucide/dist/esm/defaultAttributes.js}
 */
const defaultAttrs = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
}

const rootNode = $computed<SVGNode>(() => {
  if (!icon || isSVGNodeList(icon)) {
    return ['svg', defaultAttrs, icon]
  }
  return icon
})

const svgAttrs = $computed(() => {
  const { xmlns, viewBox } = rootNode[1]
  return { xmlns, viewBox }
})

const children = $computed(() => {
  return rootNode[2] ?? []
})

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const strokeWidth = getLengthProperty(svg, '--R-icon-stroke-width') ?? 0
  const options: Options = {
    roughness: 0.5,
    disableMultiStroke: true,
    stroke: 'var(--R-icon-stroke-color)',
    strokeWidth,
    fill: filled ? 'var(--R-icon-color)' : undefined,
    ...getFilledSizeOptions(1),
  }
  for (const child of children) {
    drawSVGNode(rc, svg, child, {
      graphicsOptions: options,
    })
  }
}
</script>

<template>
  <RText
    :class="['r-icon', { 'is-filled': filled }]"
    @transitionrun="listener"
  >
    <RGraphics
      :options="graphicsOptions"
      :responsive="false"
      v-bind="svgAttrs"
      @draw="draw"
    />
  </RText>
</template>

<style lang="scss">
@use '../common/_partials';

.r-icon {
  // Color of the icon.
  --R-icon-color: var(--r-icon-color, var(--R-text-color));
  // Stroke line color of the icon.
  --R-icon-stroke-color: var(--r-icon-stroke-color, var(--R-icon-color));
  // Stroke line width of the icon.
  // @type {<length>}
  --R-icon-stroke-width: var(--r-icon-stroke-width, 2px);
  display: inline-block;
  block-size: calc(1em + 4px);
  inline-size: calc(1em + 4px);
  &::before {
    @include partials.ghost();
    border-top: var(--R-icon-stroke-width) solid;
    transition: border-top 1ms !important;
  }
  .r-graphics {
    block-size: 100%;
    inline-size: 100%;
  }
}
</style>
