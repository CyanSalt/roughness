<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { computed } from 'vue'
import RBox from '../box/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RAvatar',
})

const {
  name,
} = defineProps<{
  /** Unique key to generate color and pixels. */
  name: string,
} & GraphicsProps>()


function hash(str: string) {
  let code = 0
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i)
    // eslint-disable-next-line no-bitwise
    code = ((code << 5) - code + chr) | 0
  }
  return code
}

const code = computed(() => hash(name))

/**
 * Inspired by minidenticons
 */
function getPixels(seed: number) {
  return Array.from({ length: 5 ** 2 }, (_, i) => i)
    // testing the 15 lowest weight bits of the hash
    // eslint-disable-next-line no-bitwise
    .filter(i => seed & (1 << (i % 15)))
    .map(i => {
      return {
        x: i > 14 ? 7 - Math.floor(i / 5) : Math.floor(i / 5),
        y: i % 5,
      }
    })
}

const pixels = computed(() => getPixels(code.value))
const color = computed(() => {
  const colors = 9
  const hue = (code.value % colors) * (360 / colors)
  return `hsl(${hue}deg 95% 45%)`
})

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const { width, height } = getSVGSize(svg)
  const scaleX = width / 10
  const scaleY = height / 10
  for (const pixel of pixels.value) {
    const rectangle = rc.rectangle(
      (pixel.x + 2.5) * scaleX,
      (pixel.y + 2.5) * scaleY,
      scaleX,
      scaleY,
      {
        stroke: 'var(--R-avatar-pixel-color)',
      },
    )
    svg.appendChild(rectangle)
  }
}
</script>

<template>
  <RBox
    class="r-avatar"
    :style="{ '--R-avatar-pixel-color': color }"
    @draw="draw"
  />
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-avatar-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-avatar {
  // Size of the avatar.
  --R-avatar-size: var(--r-avatar-size, 2em);
  block-size: var(--R-avatar-size);
  inline-size: var(--R-avatar-size);
}
</style>
