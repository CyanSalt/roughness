<script lang="ts" setup>
import '../common/style.scss'
import { useMutationObserver } from '@vueuse/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { computed, ref, useTemplateRef, watch } from 'vue'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps, SVGAttrs } from '../graphics/utils'
import { drawSVGNode, parseSVGNode, SVGNode } from '../graphics/utils'

defineOptions({
  name: 'RPicture',
})

const {
  solid = true,
  attrs,
  tag = 'div',
  graphicsOptions,
} = defineProps<{
  /**
   * Whether to add strokes to shapes that have a fill but no stroke
   */
  solid?: boolean,
  /**
   * Additional attributes for SVG element.
   */
  attrs?: SVGAttrs,
  /**
   * HTML tag for rendering the picture.
   * @default 'div'
   */
  tag?: string,
} & GraphicsProps>()

const source = useTemplateRef<HTMLElement>('source')
const node = ref<SVGNode>()

function load(container: HTMLElement) {
  const element = container.querySelector('svg')
  node.value = element ? parseSVGNode(element) : undefined
}

watch(source, value => {
  if (value) {
    load(value)
  }
}, { immediate: true })

useMutationObserver(source, () => {
  if (source.value) {
    load(source.value)
  }
}, { attributes: true, characterData: true, childList: true, subtree: true })

const svgAttrs = computed(() => {
  return {
    ...node.value?.[1],
    ...attrs,
  }
})

const children = computed(() => {
  return node.value?.[2] ?? []
})

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  for (const child of children.value) {
    drawSVGNode(rc, svg, child, { solid })
  }
}
</script>

<template>
  <component :is="tag" class="r-picture">
    <!-- Must go before source to make id (e.g. <symbol> or <marker>) work -->
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
.r-picture {
  display: contents;
}
.r-picture__source {
  position: absolute;
  inset: 0;
  block-size: 0;
  inline-size: 0;
  overflow: hidden;
  pointer-events: none;
}
</style>
