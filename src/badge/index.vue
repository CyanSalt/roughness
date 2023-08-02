<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RBadge',
})

const {
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
} & GraphicsProps>()

defineSlots<{
  marker?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const getReactionState = useReactionState(() => reactions)

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const ellipse = rc.ellipse(
    width / 2,
    height / 2,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--r-badge-color)',
    },
  )
  svg.appendChild(ellipse)
}
</script>

<template>
  <span class="r-badge">
    <sup class="r-badge__marker">
      <RGraphics :options="graphicsOptions" @draw="draw" />
      <span class="r-badge__marker-content"><slot name="marker"></slot></span>
    </sup>
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
@use '../common/_partials';

.r-badge {
  --r-badge-color: var(--r-common-error-color);
  --r-badge-padding-block: calc(0.5em - 4px);
  --r-badge-padding-inline: calc(1em - 4px);
  position: relative;
}
.r-badge__marker {
  --r-element-font-size: calc(1em - 4px);
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  padding-block: var(--r-badge-padding-block);
  padding-inline: var(--r-badge-padding-inline);
  color: var(--r-badge-color);
  transform: translate(50%, -50%);
  &:has(> .r-badge__marker-content:empty) {
    padding-inline: var(--r-badge-padding-block);
  }
}
</style>
