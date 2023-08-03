<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import { useReactionState } from '../common/reaction'
import { effectRef } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RDetails',
})

const {
  open = false,
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  open?: boolean,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  summary?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

let internalOpen = $(effectRef({
  get: () => open,
  set: value => {
    emit('update:open', value)
  },
}))

function toggle(event: Event) {
  internalOpen = (event.target as HTMLDetailsElement).open
}

let summary = $ref<HTMLElement>()

const getReactionState = useReactionState(() => reactions)

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const options: Options = {
    stroke: 'var(--r-details-summary-color)',
    fill: 'var(--r-details-summary-color)',
  }
  const padding = 2
  const points: Point[] = internalOpen ? [
    [padding, height / 8 + padding],
    [width - padding, height / 8 + padding],
    [width / 2, height - padding],
  ] : [
    [width / 8 + padding, padding],
    [width / 8 + padding, height - padding],
    [width - padding, height / 2],
  ]
  const polygon = rc.polygon(points, options)
  svg.appendChild(polygon)
}
</script>

<template>
  <details
    :open="internalOpen"
    class="r-details"
    @toggle="toggle"
  >
    <RSpace ref="summary" tag="summary" :wrap="false" class="r-details__summary">
      <span class="r-details__summary-marker">
        <RGraphics :options="graphicsOptions" @draw="draw" />
      </span>
      <slot name="summary"></slot>
    </RSpace>
    <slot></slot>
  </details>
</template>

<style lang="scss" scoped>
.r-details {
  --r-details-summary-color: var(--r-common-text-color);
  --r-details-summary-marker-size: var(--r-common-line-height);
  --r-details-gap-size: calc(1em - 4px);
}
.r-details__summary {
  display: flex;
  align-items: center;
  margin-block-end: var(--r-details-gap-size);
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
  flex: none;
  block-size: var(--r-details-summary-marker-size);
  inline-size: var(--r-details-summary-marker-size);
  pointer-events: none;
}
</style>
