<script lang="ts" setup>
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, ref, toRef } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
import { listStyleInjection } from './utils'

defineOptions({
  name: 'RListItem',
})

const {
  graphicsOptions,
  reactions = (() => []) as never,
} = defineProps<GraphicsProps>()

const getReactionState = useReactionState(toRef(() => reactions))

const listStyle = $(inject(listStyleInjection, ref()))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const options: Options = {
    stroke: 'var(--r-list-marker-color)',
    fill: 'var(--r-list-marker-color)',
  }
  let offsetY = 0
  switch (listStyle) {
    case 'disc': {
      const circle = rc.circle(width / 2, height / 2 + offsetY, width / 4, {
        stroke: 'var(--r-list-marker-color)',
      })
      svg.appendChild(circle)
      break
    }
    case 'circle': {
      const circle = rc.circle(width / 2, height / 2 + offsetY, width / 3, options)
      svg.appendChild(circle)
      break
    }
    case 'square': {
      const rect = rc.rectangle(
        width / 2 - width / 8,
        height / 2 - width / 8 + offsetY,
        width / 3,
        width / 3,
        options,
      )
      svg.appendChild(rect)
      break
    }
  }
}
</script>

<template>
  <li class="r-list-item">
    <span v-if="listStyle" class="r-list-item__marker">
      <RGraphics :options="graphicsOptions" @draw="draw" />
    </span>
    <slot></slot>
  </li>
</template>

<style lang="scss" scoped>
.r-list-item {
  position: relative;
  &::marker {
    width: var(--r-list-marker-inline-size);
  }
}
.r-list-item__marker {
  position: absolute;
  inset-block: 0;
  inset-inline-start: calc(0px - var(--r-list-marker-inline-size));
  display: inline-block;
  block-size: var(--r-list-marker-block-size);
  inline-size: var(--r-list-marker-inline-size);
  pointer-events: none;
}
</style>