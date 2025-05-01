<script lang="ts" setup>
import '../common/style.scss'
import { useMutationObserver } from '@vueuse/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { SVGAttributes, watch } from 'vue'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { drawSVGNode, parseSVGNode, SVGNode } from '../graphics/utils'

defineOptions({
  name: 'RPicture',
})

const {
  attrs,
  tag = 'div',
  graphicsOptions,
} = defineProps<{
  /**
   * Additional attributes for SVG element.
   */
  attrs: SVGAttributes & Record<string, string | number | undefined>,
  /**
   * HTML tag for rendering the picture.
   * @default 'div'
   */
  tag?: string,
} & GraphicsProps>()

let source = $ref<HTMLElement>()
let node = $ref<SVGNode>()

function load(container: HTMLElement) {
  const element = container.querySelector('svg')
  node = element ? parseSVGNode(element) : undefined
}

watch($$(source), value => {
  if (value) {
    load(value)
  }
}, { immediate: true })

useMutationObserver($$(source), entries => {
  load(entries[0].target as HTMLElement)
}, { attributes: true, characterData: true, childList: true, subtree: true })

const svgAttrs = $computed(() => {
  return {
    ...node?.[1],
    ...attrs,
  }
})

const children = $computed(() => {
  return node?.[2] ?? []
})

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  for (const child of children) {
    drawSVGNode(rc, svg, child)
  }
}
</script>

<template>
  <component :is="tag" class="r-picture">
    <RGraphics
      :options="graphicsOptions"
      :responsive="false"
      v-bind="svgAttrs"
      @draw="draw"
    />
    <span ref="source" class="r-picture__source">
      <slot></slot>
    </span>
  </component>
</template>

<style lang="scss">
.r-picture__source {
  position: absolute;
  inset: 0;
  block-size: 0;
  inline-size: 0;
  overflow: hidden;
  pointer-events: none;
}
</style>
