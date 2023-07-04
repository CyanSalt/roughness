<script lang="ts" setup>
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef, watchEffect } from 'vue'
import type { ReactionProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RDetails',
})

const {
  open = false,
  reactions = (() => []) as never,
} = defineProps<{
  open?: boolean,
} & ReactionProps>()

const emit = defineEmits<{
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  summary?: (props: {}) => any,
  default?: (props: {}) => any,
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

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const options: Options = {
    stroke: 'var(--r-details-summary-color)',
    fill: 'var(--r-details-summary-color)',
  }
  const padding = 2
  const { width, height } = getSVGSize(svg)
  const points: Point[] = internalOpen ? [
    [padding, Math.round(height / 8) + padding],
    [width - padding, Math.round(height / 8) + padding],
    [Math.round(width / 2), height - padding],
  ] : [
    [Math.round(width / 8) + padding, padding],
    [Math.round(width / 8) + padding, height - padding],
    [width - padding, Math.round(height / 2)],
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
  --r-details-summary-color: var(--r-common-text-color);
  --r-details-summary-marker-size: var(--r-common-line-height);
}
.r-details__summary {
  display: flex;
  align-items: center;
  color: var(--r-details-summary-color);
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
  margin-inline-end: calc(var(--r-details-summary-marker-size) / 4);
  pointer-events: none;
}
</style>
