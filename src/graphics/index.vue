<script lang="ts" setup generic="T extends 'canvas' | 'svg' = 'svg'">
import { useElementSize, useParentElement } from '@vueuse/core'
import rough from 'roughjs'
import type { RoughCanvas } from 'roughjs/bin/canvas'
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, ref, watchEffect } from 'vue'
import { configInjection } from './utils'

defineOptions({
  name: 'RGraphics',
})

const {
  responsive = true,
  tag = 'svg',
} = defineProps<{
  responsive?: boolean,
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

const config = $(inject(configInjection) ?? ref<undefined>())

const rc = $computed(() => {
  if (!root) return null
  return (
    root instanceof HTMLCanvasElement
      ? rough.canvas(root, { options: config })
      : rough.svg(root, { options: config })
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
    aria-hidden="true"
    :class="['r-graphics', { 'is-responsive': responsive }]"
  />
</template>

<style lang="scss" scoped>
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
:global(:has(> .r-graphics.is-responsive)) {
  position: relative;
}
</style>
