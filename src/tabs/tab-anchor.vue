<script lang="ts" setup generic="T extends string | number">
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize, measureSVGSize, measureSVGSizeAsArray } from '../graphics/utils'

defineOptions({
  name: 'RTabAnchor',
})

const {
  active = false,
  tab,
  reactions = (() => ['hover', 'focus-within', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  active?: boolean,
  tab: T,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'activate', tab: T): void,
}>()

function activate() {
  emit('activate', tab)
}

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-tab-anchor-border-width') ?? 0
  const strokeLineDash = measureSVGSizeAsArray(svg, '--r-tab-anchor-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const line = rc.line(
    padding,
    height - padding,
    width - padding,
    height - padding,
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
    <button class="r-tab-anchor__button" @click="activate">
      <slot></slot>
    </button>
  </li>
</template>

<style lang="scss" scoped>
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
:where(.r-tab-anchor__button) {
  @include reset.button;
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
