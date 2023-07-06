<script lang="ts" setup>
import type { RoughSVG } from 'roughjs/bin/svg'
import RGraphics from '../graphics/index.vue'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RDivider',
})

const {
  vertical = false,
} = defineProps<{
  vertical?: boolean,
}>()

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const line = rc.line(padding, padding, vertical ? padding : width - padding, vertical ? height - padding : padding, {
    stroke: 'var(--r-divider-color)',
  })
  svg.appendChild(line)
}
</script>

<template>
  <span :class="['r-divider', { 'is-vertical': vertical }]" role="separator">
    <RGraphics @draw="draw" />
  </span>
</template>

<style lang="scss" scoped>
.r-divider {
  --r-divider-color: var(--r-common-text-color);
  --r-divider-gap-size: 12px;
  display: block;
  height: 5px;
  margin-block: calc(var(--r-divider-gap-size) - 2px);
  margin-inline: auto;
  /* background-color: var(--r-divider-color); */
  &.is-vertical {
    display: inline-block;
    width: 5px;
    height: var(--r-common-line-height);
    margin-block: auto;
    margin-inline: calc(var(--r-divider-gap-size) - 2px);
    vertical-align: middle;
  }
}
</style>
