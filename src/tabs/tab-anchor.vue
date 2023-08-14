<script lang="ts" setup generic="T">
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, getLengthPropertyAsArray } from '../common/property'
import { useReactionState } from '../common/reaction'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RTabAnchor',
})

const {
  active = false,
  side = 'top',
  tab,
  reactions = (() => ['hover', 'focus-within', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  active?: boolean,
  side?: 'top' | 'bottom' | 'left' | 'right',
  tab: T,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'activate', tab: T): void,
}>()

function activate() {
  emit('activate', tab)
}

const getReactionState = useReactionState(() => reactions)

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-tab-anchor-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--r-tab-anchor-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  let startX: number
  let startY: number
  let endX: number
  let endY: number
  switch (side) {
    case 'bottom':
      startX = padding
      startY = padding
      endX = width - padding
      endY = padding
      break
    case 'left':
      startX = width - padding
      startY = padding
      endX = width - padding
      endY = height - padding
      break
    case 'right':
      startX = padding
      startY = padding
      endX = padding
      endY = height - padding
      break
    case 'top':
    default:
      startX = padding
      startY = height - padding
      endX = width - padding
      endY = height - padding
      break
  }
  const line = rc.line(
    startX,
    startY,
    endX,
    endY,
    {
      stroke: 'var(--r-tab-anchor-border-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(line)
}
</script>

<template>
  <li
    :class="['r-tab-anchor', { 'is-active': active }]"
    role="tab"
    :aria-selected="active"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <button type="button" class="r-tab-anchor__button" @click="activate">
      <slot></slot>
    </button>
  </li>
</template>

<style lang="scss">
@use '../common/_reset';

.r-tab-anchor {
  --r-tab-anchor-active-color: var(--r-common-primary-color);
  --r-tab-anchor-border-color: var(--r-common-text-color);
  --r-tab-anchor-border-width: 1px;
  --r-tab-anchor-border-dash: none;
  cursor: pointer;
  &:hover {
    --r-tab-anchor-border-dash: 8px;
  }
  &:has(.r-tab-anchor__button:focus), &:active {
    --r-tab-anchor-border-width: 2px;
  }
  &.is-active {
    --r-tab-anchor-border-color: var(--r-tab-anchor-active-color);
  }
}
@layer base {
  .r-tab-anchor__button {
    @include reset.button;
  }
}
.r-tab-anchor__button {
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  .r-tab-anchor.is-active & {
    color: var(--r-tab-anchor-active-color);
  }
}
</style>
