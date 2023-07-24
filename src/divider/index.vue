<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RDivider',
})

const {
  vertical = false,
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  vertical?: boolean,
} & GraphicsProps>()

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const line = rc.line(padding, padding, vertical ? padding : width - padding, vertical ? height - padding : padding, {
    stroke: 'var(--r-divider-color)',
  })
  svg.appendChild(line)
}
</script>

<template>
  <span
    :class="['r-divider', { 'is-vertical': vertical }]"
    role="separator"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
  </span>
</template>

<style lang="scss" scoped>
.r-divider {
  --r-divider-color: var(--r-common-text-color);
  --r-divider-gap-size: calc(1em - 4px);
  display: block;
  block-size: 5px;
  margin-block: calc(var(--r-divider-gap-size) - 2px);
  margin-inline: auto;
  /* background-color: var(--r-divider-color); */
  &.is-vertical {
    display: inline-block;
    block-size: var(--r-common-line-height);
    inline-size: 5px;
    margin-block: auto;
    margin-inline: calc(var(--r-divider-gap-size) - 2px);
    vertical-align: middle;
  }
}
</style>
