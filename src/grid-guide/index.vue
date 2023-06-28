<script lang="ts" setup>
import { useElementSize, useParentElement } from '@vueuse/core'
import { watchEffect } from 'vue'
import { useDark } from '../common/utils'

defineOptions({
  name: 'RGridGuide',
})

const {
  maxSections = 10,
  responsive = true,
  sectionCells = 8,
} = defineProps<{
  maxSections?: number,
  responsive?: boolean,
  sectionCells?: number,
}>()

const root = $ref<HTMLCanvasElement>()

const parent = $(useParentElement())
const container = $computed(() => (responsive ? parent : null))
const { width, height } = $(useElementSize($$(container), undefined, {
  box: 'border-box',
}))

const dark = $(useDark())

function draw() {
  if (!root) return
  void dark
  const actualWidth = width * window.devicePixelRatio
  const actualHeight = height * window.devicePixelRatio
  const viewportSize = Math.max(window.innerWidth, window.innerHeight) * window.devicePixelRatio
  const sectionSize = Math.ceil(viewportSize / maxSections)
  const cellSize = Math.ceil(sectionSize / sectionCells)

  const cellRows = Math.ceil(actualHeight / cellSize)
  const cellColumns = Math.ceil(actualWidth / cellSize)

  const style = getComputedStyle(root)
  const color = style.getPropertyValue('--r-grid-guide-color')

  const extraSections = 1
  const padding = sectionSize / 2

  root.width = actualWidth
  root.height = actualHeight

  const ctx = root.getContext('2d')!
  ctx.clearRect(0, 0, actualWidth, actualHeight)
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  for (let i = -extraSections * sectionCells; i <= cellColumns; i++) {
    ctx.beginPath()
    if (i % sectionCells === 0) {
      ctx.lineWidth = 2
    } else {
      ctx.lineWidth = 1
    }
    ctx.moveTo(cellSize * i + padding, 0)
    ctx.lineTo(cellSize * i + padding, actualHeight + padding)
    ctx.stroke()
  }

  for (let i = -extraSections * sectionCells; i <= cellRows; i++) {
    ctx.beginPath()
    if (i % sectionCells === 0) {
      ctx.lineWidth = 3
    } else {
      ctx.lineWidth = 1
    }
    ctx.moveTo(0, cellSize * i + padding)
    ctx.lineTo(actualWidth + padding, cellSize * i + padding)
    ctx.stroke()
  }
}

watchEffect(() => {
  draw()
})
</script>

<template>
  <canvas
    ref="root"
    :class="['r-grid-guide', { 'is-responsive': responsive }]"
  ></canvas>
</template>

<style lang="scss" scoped>
.r-grid-guide {
  --r-grid-guide-color: #f5f5f5;
  pointer-events: none;
  &.is-responsive {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  :root.dark & {
    --r-grid-guide-color: rgb(255 255 255 / 0.1);
  }
}
:global(:has(> .r-grid-guide.is-responsive)) {
  position: relative;
  z-index: 0;
}
</style>
