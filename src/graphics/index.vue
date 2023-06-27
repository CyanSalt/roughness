<script lang="ts" setup generic="T extends 'canvas' | 'svg' = 'svg'">
import { useElementSize, useParentElement } from '@vueuse/core'
import rough from 'roughjs'
import type { RoughCanvas } from 'roughjs/bin/canvas'
import type { RoughSVG } from 'roughjs/bin/svg'
import { watchEffect } from 'vue'

defineOptions({
  name: 'RGraphics',
})

const {
  ctx,
  responsive = false,
  tag = 'svg',
} = defineProps<{
  ctx?: any,
  responsive?: boolean,
  tag?: T,
}>()

const emit = defineEmits<{
  (event: 'draw', rc: T extends 'canvas' ? RoughCanvas : RoughSVG, svg: T extends 'canvas' ? HTMLCanvasElement : SVGSVGElement, ctx: any): void,
}>()

const parent = $(useParentElement())
const container = $computed(() => (responsive ? parent : null))
const { width, height } = $(useElementSize($$(container), undefined, {
  box: 'border-box',
}))

let root = $ref<T extends 'canvas' ? HTMLCanvasElement : SVGSVGElement>()

const rc = $computed(() => {
  if (!root) return null
  return (
    root instanceof HTMLCanvasElement
      ? rough.canvas(root)
      : rough.svg(root)
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
  emit('draw', rc, root, ctx)
})
</script>

<template>
  <component
    :is="(tag as T)"
    ref="root"
    aria-hidden="true"
    :class="['r-graphics', { 'is-responsive': responsive }]"
  />
</template>

<style lang="scss" scoped>
.r-graphics {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
:global(:has(> .r-graphics.is-responsive)) {
  position: relative;
}
</style>
