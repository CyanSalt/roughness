<script lang="ts" setup generic="const T extends 'canvas' | 'svg' = 'svg'">
import '../common/style.scss'
import { useCurrentElement, useElementSize, useParentElement } from '@vueuse/core'
import rough from 'roughjs'
import type { RoughCanvas } from 'roughjs/bin/canvas'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { computed, watchEffect } from 'vue'
import { useGraphicsElementOptions } from './utils'

defineOptions({
  name: 'RGraphics',
})

const {
  options,
  selector,
  responsive = true,
  tag = 'svg',
} = defineProps<{
  /**
   * [Options for Rough.js]{@link https://github.com/rough-stuff/rough/wiki#options}.
   * @type {import('roughjs/bin/core').Options}
   */
  options?: Options,
  /**
   * Selector(s) to apply graphics configuration.
   */
  selector?: string | string[],
  /**
   * Whether to adjust the size to fit the parent element.
   * @default true
   */
  responsive?: boolean,
  /**
   * [HTML tag for rendering the graphics]{@link https://github.com/rough-stuff/rough/wiki#roughcanvas--roughsvg}.
   * @type {'canvas' | 'svg'}
   */
  tag?: T,
}>()

const emit = defineEmits<{
  /**
   * Ready to start drawing.
   * @type {(rc: import('roughjs/bin/canvas').RoughCanvas, element: HTMLCanvasElement, options: import('roughjs/bin/core').Options)}
   * @type {(rc: import('roughjs/bin/svg').RoughSVG, element: SVGSVGElement, options: import('roughjs/bin/core').Options)}
   */
  (event: 'draw', rc: T extends 'canvas' ? RoughCanvas : RoughSVG, element: T extends 'canvas' ? HTMLCanvasElement : SVGSVGElement, options: Options): void,
}>()

const root = useCurrentElement<(T extends 'canvas' ? HTMLCanvasElement : SVGSVGElement) | null>()
const parent = useParentElement()
const container = computed(() => (responsive ? parent.value : root.value))
const { width, height } = useElementSize(container, undefined, {
  box: 'border-box',
})

const configOptions = useGraphicsElementOptions(() => selector, () => options)

const rc = computed(() => {
  if (!root.value) return null
  const defaultOptions = {
    stroke: 'var(--R-graphics-stroke-color)',
    ...configOptions.value,
  }
  return (
    root.value instanceof HTMLCanvasElement
      ? rough.canvas(root.value, { options: defaultOptions })
      : rough.svg(root.value, { options: defaultOptions })
  ) as T extends 'canvas' ? RoughCanvas : RoughSVG
})

watchEffect(() => {
  if (!root.value || !rc.value) return
  if (responsive) {
    if (root.value instanceof HTMLCanvasElement) {
      root.value.width = width.value
      root.value.height = height.value
    } else {
      root.value.setAttribute('width', String(width.value))
      root.value.setAttribute('height', String(height.value))
    }
  }
  if (root.value instanceof HTMLCanvasElement) {
    const context = root.value.getContext('2d')!
    context.clearRect(0, 0, width.value, height.value)
  } else {
    root.value.innerHTML = ''
  }
  emit('draw', rc.value, root.value, configOptions.value)
})
</script>

<template>
  <component
    :is="(tag as T)"
    :class="['r-graphics', { 'is-responsive': responsive }]"
    aria-hidden="true"
  />
</template>

<style lang="scss">
@property --R-graphics-stroke-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

.r-graphics {
  // Color of the graphics lines by default.
  --R-graphics-stroke-color: var(--r-graphics-stroke-color, var(--r-common-color));
  pointer-events: none;
  &.is-responsive {
    position: absolute;
    inset: 0;
    z-index: -1;
    block-size: 100%;
    inline-size: 100%;
  }
}
@layer roughness__base {
  :has(> .r-graphics.is-responsive) {
    position: relative;
    z-index: 0;
  }
}
</style>
