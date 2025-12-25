<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { computed } from 'vue'
import { getLengthProperty, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import { drawSVGNode, getFilledSizeOptions, GraphicsProps, SVGNode, useGraphicsSelectors } from '../graphics/utils'
import RText from '../text/index.vue'
import { IconNode } from './utils'

defineOptions({
  name: 'RIcon',
})

const {
  icon,
  filled,
  graphicsSelector,
} = defineProps<{
  /**
   * Icon object conforming to the type constraint.
   */
  icon: IconNode,
  /** Whether to fill the icon. */
  filled?: boolean,
} & GraphicsProps>()

const selectors = useGraphicsSelectors('icon', () => graphicsSelector)

const { timestamp, listener } = useTransitionListener('::before')

function isSVGNodeList(node: IconNode): node is SVGNode[] {
  return !node.length || Array.isArray(node[0])
}

/**
 * @see {@link lucide/dist/esm/defaultAttributes.js}
 */
const defaultAttrs = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
}

const rootNode = computed<SVGNode>(() => {
  if (!icon || isSVGNodeList(icon)) {
    return ['svg', defaultAttrs, icon]
  }
  return icon
})

const svgAttrs = computed(() => {
  const { xmlns, viewBox } = rootNode.value[1]
  return { xmlns, viewBox }
})

const children = computed(() => {
  return rootNode.value[2] ?? []
})

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp.value
  const strokeWidth = getLengthProperty(svg, '--R-icon-stroke-width') ?? 0
  const options: Options = {
    roughness: 0.5,
    disableMultiStroke: true,
    stroke: 'var(--R-icon-stroke-color)',
    strokeWidth,
    fill: filled ? 'var(--R-icon-color)' : undefined,
    ...getFilledSizeOptions(1),
  }
  for (const child of children.value) {
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
      :selector="selectors"
      :responsive="false"
      v-bind="svgAttrs"
      @draw="draw"
    />
  </RText>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-icon-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-icon-stroke-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-icon-stroke-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-icon {
  // Color of the icon.
  --R-icon-color: var(--r-icon-color, var(--R-text-color));
  // Stroke line color of the icon.
  --R-icon-stroke-color: var(--r-icon-stroke-color, var(--R-icon-color));
  // Stroke line width of the icon.
  --R-icon-stroke-width: var(--r-icon-stroke-width, var(--r-common-text-stroke-width));
  display: inline-block;
  block-size: calc(1em + 4px);
  inline-size: calc(1em + 4px);
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-icon-stroke-width: border-top-width,
    ));
  }
  .r-graphics {
    block-size: 100%;
    inline-size: 100%;
  }
}
</style>
