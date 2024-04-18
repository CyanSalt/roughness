<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
import type { BitMatrix } from './utils'

defineOptions({
  name: 'RQRCode',
})

const {
  data,
  graphicsOptions,
} = defineProps<{
  /** Symbol data of QR Code. */
  data: BitMatrix,
} & GraphicsProps>()

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const { width, height } = getSVGSize(svg)
  const minPadding = 2
  const cellSize = Math.floor((Math.min(width, height) - minPadding * 2) / data.size)
  const inlinePadding = Math.floor((width - cellSize * data.size) / 2)
  const blockPadding = Math.floor((height - cellSize * data.size) / 2)
  for (let i = 0; i < data.data.length; i += 1) {
    if (data.data[i]) {
      const col = i % data.size
      const row = Math.floor(i / data.size)
      const rectangle = rc.rectangle(
        inlinePadding + cellSize * col,
        blockPadding + cellSize * row,
        cellSize,
        cellSize,
        {
          roughness: 0.5,
          stroke: 'var(--R-qr-code-color)',
          fill: 'var(--R-qr-code-color)',
          fillStyle: 'solid',
        },
      )
      svg.appendChild(rectangle)
    }
  }
}
</script>

<template>
  <span class="r-qr-code">
    <RGraphics :graphics-options="graphicsOptions" @draw="draw"></RGraphics>
  </span>
</template>

<style lang="scss">
@use '../common/_partials';

.r-qr-code {
  // Color of the QR Code cells.
  --R-qr-code-color: var(--r-qr-code-color, var(--r-common-color));
  // Size of the QR Code.
  // @type {<length>}
  --R-qr-code-size: var(--r-qr-code-size, 8em);
  block-size: var(--R-qr-code-size);
  inline-size: var(--R-qr-code-size);
}
</style>
