<script lang="ts" setup>
import '../common/style.scss'
import { useElementSize, useParentElement } from '@vueuse/core'
import { watchEffect } from 'vue'
import { getIntegerProperty, getLengthProperty, getProperty } from '../common/property'
import type { ReactionProps } from '../common/reaction'
import { useReactionState } from '../common/reaction'

defineOptions({
  name: 'RGridGuide',
})

const {
  responsive = true,
  reactions = (() => ['dark']) as never,
} = defineProps<{
  maxSections?: number,
  responsive?: boolean,
  sectionCells?: number,
} & ReactionProps>()

const getReactionState = useReactionState(() => reactions)

const root = $ref<HTMLCanvasElement>()

const parent = $(useParentElement())
const container = $computed(() => (responsive ? parent : null))
const { width, height } = $(useElementSize($$(container), undefined, {
  box: 'border-box',
}))

function draw() {
  if (!root) return
  getReactionState()

  const cellSize = getLengthProperty(root, '--r-grid-guide-cell-size') ?? 0
  const cellCount = getIntegerProperty(root, '--r-grid-guide-section-cell-count') ?? 1
  const color = getProperty(root, '--r-grid-guide-color')

  const actualWidth = width * window.devicePixelRatio
  const actualHeight = height * window.devicePixelRatio
  const actualCellSize = cellSize * window.devicePixelRatio

  const cellRows = Math.ceil(actualHeight / actualCellSize)
  const cellColumns = Math.ceil(actualWidth / actualCellSize)

  const extraSections = 1
  const padding = Math.round(actualCellSize * (cellCount / 2 - 0.5))

  root.width = actualWidth
  root.height = actualHeight

  const ctx = root.getContext('2d')!
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
  draw()
})
</script>

<template>
  <canvas
    ref="root"
    :class="['r-grid-guide', { 'is-responsive': responsive }]"
    aria-hidden="true"
  ></canvas>
</template>

<style lang="scss">
.r-grid-guide {
  --r-grid-guide-color: #f5f5f5;
  --r-grid-guide-cell-size: var(--r-common-font-size);
  --r-grid-guide-section-cell-count: 8;
  pointer-events: none;
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
</style>
