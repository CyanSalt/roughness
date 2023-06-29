<script lang="ts" setup>
import { useElementHover } from '@vueuse/core'
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import { watchEffect } from 'vue'
import RGraphics from '../graphics/index.vue'

const {
  open = false,
} = defineProps<{
  open?: boolean,
}>()

const emit = defineEmits<{
  (event: 'update:open', value: typeof open): void,
}>()

let internalOpen = $ref(open)

watchEffect(() => {
  internalOpen = open
})

function toggle(event: Event) {
  internalOpen = (event.target as HTMLDetailsElement).open
  emit('update:open', internalOpen)
}

let summary = $ref<HTMLElement>()

const hovered = $(useElementHover($$(summary)))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void hovered
  const options: Options = {
    stroke: 'var(--r-detail-summary-color)',
    fill: 'var(--r-detail-summary-color)',
  }
  const padding = 2
  const points: Point[] = internalOpen ? [
    [padding, Math.round(svg.height.baseVal.value / 8) + padding],
    [svg.width.baseVal.value - padding * 2, Math.round(svg.height.baseVal.value / 8) + padding],
    [Math.round(svg.width.baseVal.value / 2), svg.height.baseVal.value - padding * 2],
  ] : [
    [Math.round(svg.width.baseVal.value / 8) + padding, padding],
    [Math.round(svg.width.baseVal.value / 8) + padding, svg.height.baseVal.value - padding * 2],
    [svg.width.baseVal.value - padding * 2, Math.round(svg.height.baseVal.value / 2)],
  ]
  const polygon = rc.polygon(points, options)
  svg.appendChild(polygon)
}
</script>

<template>
  <details :data-open="open" :open="internalOpen" class="r-details" @toggle="toggle">
    <summary ref="summary" class="r-details__summary">
      <span class="r-details__summary-marker">
        <RGraphics @draw="draw" />
      </span>
      <slot name="summary"></slot>
    </summary>
    <slot></slot>
  </details>
</template>

<style lang="scss" scoped>
.r-details {
  --r-detail-summary-color: var(--r-common-text-color);
  --r-details-summary-marker-size: var(--r-common-line-height);
}
.r-details__summary {
  display: flex;
  align-items: center;
  color: var(--r-detail-summary-color);
  cursor: pointer;
  // for Safari
  &::-webkit-details-marker {
    display: none;
  }
  &::marker {
    content: none;
  }
}
.r-details__summary-marker {
  display: inline-block;
  flex: none;
  width: var(--r-details-summary-marker-size);
  height: var(--r-details-summary-marker-size);
  margin-right: calc(var(--r-details-summary-marker-size) / 4);
  pointer-events: none;
}
</style>
