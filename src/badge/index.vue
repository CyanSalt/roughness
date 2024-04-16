<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RBadge',
})

const {
  graphicsOptions,
} = defineProps<{
} & GraphicsProps>()

defineSlots<{
  /** Content of the badge marker. */
  marker?: (props: {}) => any,
  /** Decorated content of the badge. */
  default?: (props: {}) => any,
}>()

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const ellipse = rc.ellipse(
    width / 2,
    height / 2,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--R-badge-color)',
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

<style lang="scss">
@use '../common/_partials';

.r-badge {
  // Color of the badge marker.
  // @type {<color>}
  --R-badge-color: var(--r-badge-color, var(--r-common-error-color));
  // Vertical padding of the badge marker.
  // @type {<'padding-top'>{1,2}}
  --R-badge-padding-block: var(--r-badge-padding-block, calc(0.5em - 4px));
  // Horizontal padding of the badge marker.
  // @type {<'padding-top'>{1,2}}
  --R-badge-padding-inline: var(--r-badge-padding-inline, calc(1em - 4px));
  position: relative;
}
.r-badge__marker {
  --r-element-font-size: calc(1em - 4px);
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  padding-block: var(--R-badge-padding-block);
  padding-inline: var(--R-badge-padding-inline);
  color: var(--R-badge-color);
  transform: translate(50%, -50%);
  &:has(> .r-badge__marker-content:empty) {
    padding-inline: var(--R-badge-padding-block);
  }
}
.r-badge__marker-content {
  font-size: inherit;
}
</style>
