<script lang="ts" setup generic="const T extends 'canvas' | 'svg' = 'svg'">
import '../common/style.scss'
import { useElementSize, useParentElement } from '@vueuse/core'
import rough from 'roughjs'
import type { RoughCanvas } from 'roughjs/bin/canvas'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, ref, watchEffect } from 'vue'
import { optionsInjection } from './utils'

defineOptions({
  name: 'RGraphics',
})

const {
  options,
  responsive = true,
  tag = 'svg',
} = defineProps<{
  /**
   * Options for Rough.js
   * {@link https://github.com/rough-stuff/rough/wiki#options}
   */
  options?: Options,
  /**
   * Whether to adjust the size to fit the parent element
   * @default true
   */
  responsive?: boolean,
  /**
   * HTML tag for rendering the graphics
   * {@link https://github.com/rough-stuff/rough/wiki#roughcanvas--roughsvg}
   */
  tag?: T,
}>()

const emit = defineEmits<{
  (event: 'draw', rc: T extends 'canvas' ? RoughCanvas : RoughSVG, element: T extends 'canvas' ? HTMLCanvasElement : SVGSVGElement): void,
}>()

let root = $ref<T extends 'canvas' ? HTMLCanvasElement : SVGSVGElement>()

const parent = $(useParentElement())
const container = $computed(() => (responsive ? parent : root))
const { width, height } = $(useElementSize($$(container), undefined, {
  box: 'border-box',
}))

const configOptions = $(inject(optionsInjection, ref()))

const nestingOptions = $computed<Options>(() => {
  return {
    ...configOptions,
    ...options,
  }
})

const rc = $computed(() => {
  if (!root) return null
  return (
    root instanceof HTMLCanvasElement
      ? rough.canvas(root, { options: nestingOptions })
      : rough.svg(root, { options: nestingOptions })
  ) as T extends 'canvas' ? RoughCanvas : RoughSVG
})

watchEffect(() => {
  if (!root || !rc) return
  if (responsive) {
    if (root instanceof HTMLCanvasElement) {
      root.width = width
      root.height = height
    } else {
      root.setAttribute('width', String(width))
      root.setAttribute('height', String(height))
    }
  }
  if (root instanceof HTMLCanvasElement) {
    const context = root.getContext('2d')!
    context.clearRect(0, 0, width, height)
  } else {
    root.innerHTML = ''
  }
  emit('draw', rc, root)
})
</script>

<template>
  <component
    :is="(tag as T)"
    ref="root"
    :class="['r-graphics', { 'is-responsive': responsive }]"
    aria-hidden="true"
  />
</template>

<style lang="scss">
.r-graphics {
  pointer-events: none;
  &.is-responsive {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
}
@layer base {
  :has(> .r-graphics.is-responsive) {
    position: relative;
    z-index: 0;
  }
}
</style>
