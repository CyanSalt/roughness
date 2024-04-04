<script lang="ts" setup>
import '../common/style.scss'
import { useElementSize, useParentElement } from '@vueuse/core'
import { watchEffect } from 'vue'
import { getIntegerProperty, getLengthProperty, getProperty, useTransitionListener } from '../common/property'

defineOptions({
  name: 'RGridGuide',
})

const {
  responsive = true,
} = defineProps<{
  /**
   * Whether to adjust the size to fit the parent element
   * @default true
   */
  responsive?: boolean,
}>()

const background = $ref<HTMLCanvasElement>()

const parent = $(useParentElement())
const container = $computed(() => (responsive ? parent : null))
const { width, height } = $(useElementSize($$(container), undefined, {
  box: 'border-box',
}))

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  void timestamp

  const cellSize = getLengthProperty(canvas, '--r-grid-guide-cell-size') ?? 0
  const cellCount = getIntegerProperty(canvas, '--r-grid-guide-section-cell-count') ?? 1
  const color = getProperty(canvas, '--r-grid-guide-color')

  const actualWidth = width * window.devicePixelRatio
  const actualHeight = height * window.devicePixelRatio
  const actualCellSize = cellSize * window.devicePixelRatio

  const cellRows = Math.ceil(actualHeight / actualCellSize)
  const cellColumns = Math.ceil(actualWidth / actualCellSize)

  const extraSections = 1
  const padding = Math.round(actualCellSize * (cellCount / 2 - 0.5))

  canvas.width = actualWidth
  canvas.height = actualHeight

  ctx.clearRect(0, 0, actualWidth, actualHeight)
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  for (let i = -extraSections * cellCount; i <= cellColumns; i++) {
    ctx.beginPath()
    if (i % cellCount === 0) {
      ctx.lineWidth = 2
    } else {
      ctx.lineWidth = 1
    }
    ctx.moveTo(actualCellSize * i + padding, 0)
    ctx.lineTo(actualCellSize * i + padding, actualHeight + padding)
    ctx.stroke()
  }

  for (let i = -extraSections * cellCount; i <= cellRows; i++) {
    ctx.beginPath()
    if (i % cellCount === 0) {
      ctx.lineWidth = 3
    } else {
      ctx.lineWidth = 1
    }
    ctx.moveTo(0, actualCellSize * i + padding)
    ctx.lineTo(actualWidth + padding, actualCellSize * i + padding)
    ctx.stroke()
  }
}

watchEffect(() => {
  if (!background) return
  const ctx = background.getContext('2d')
  if (!ctx) return
  draw(ctx, background)
})
</script>

<template>
  <div
    :class="['r-grid-guide', { 'is-responsive': responsive }]"
    @transitionrun="listener"
  >
    <canvas
      ref="background"
      class="r-grid-guide__canvas"
      aria-hidden="true"
    ></canvas>
  </div>
</template>

<style lang="scss">
@use '../common/_partials';

.r-grid-guide {
  --r-grid-guide-color: #f5f5f5;
  --r-grid-guide-cell-size: var(--r-common-font-size);
  --r-grid-guide-section-cell-count: 8;
  position: relative;
  pointer-events: none;
  &::before {
    @include partials.ghost();
    color: var(--r-grid-guide-color);
    transition: color 1ms !important;
  }
  &.is-responsive {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  :root.dark & {
    --r-grid-guide-color: rgb(255 255 255 / 10%);
  }
}
@layer base {
  :has(> .r-grid-guide.is-responsive) {
    position: relative;
    z-index: 0;
  }
}
.r-grid-guide__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
