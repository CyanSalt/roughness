<script lang="ts" setup>
import { useMutationObserver } from '@vueuse/core'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { ComponentPublicInstance } from 'vue'
import { onMounted, toRef } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize, measureSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RList',
})

const {
  items,
  listStyle = 'disc',
  graphicsOptions,
  reactions = (() => []) as never,
} = defineProps<{
  items: string[] | number,
  listStyle?: 'disc' | 'circle' | 'square' | 'auto',
} & GraphicsProps>()

defineSlots<{
  '*'?: (props: { item: string }) => any,
  default?: (props: {}) => any,
}>()

const renderedItems = $computed(() => {
  return typeof items === 'number'
    ? Array.from({ length: items }, (item, index) => String(index + 1))
    : items
})

const tag = $computed(() => {
  return listStyle === 'auto' ? 'ol' : 'ul'
})

let root = $ref<ComponentPublicInstance>()
let graphics = $ref<ComponentPublicInstance>()

let dimensions = $ref<number[]>([])

function calculateDimensions() {
  const rootEl: HTMLElement = root?.$el ?? null
  dimensions = rootEl?.children
    ? Array.from(rootEl.children).slice(1).filter(el => el.matches('li')).map(el => el.clientHeight)
    : []
}

useMutationObserver($$(root), (mutations) => {
  if (mutations.length) {
    const graphicsEl: SVGSVGElement = graphics?.$el ?? null
    if (mutations.every(record => record.target.contains(graphicsEl))) return
    calculateDimensions()
  }
}, {
  characterData: true,
  childList: true,
  subtree: true,
})

onMounted(() => {
  calculateDimensions()
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width } = getSVGSize(svg)
  const lineHeight = measureSVGSize(svg, 'line-height') ?? 0
  const gapSize = measureSVGSize(svg, '--r-space-gap-size') ?? 0
  const options: Options = {
    stroke: 'var(--r-list-marker-color)',
    fill: 'var(--r-list-marker-color)',
  }
  let offsetY = 0
  for (const value of dimensions) {
    switch (listStyle) {
      case 'disc': {
        const circle = rc.circle(width / 2, lineHeight / 2 + offsetY, width / 4, {
          stroke: 'var(--r-list-marker-color)',
        })
        svg.appendChild(circle)
        break
      }
      case 'circle': {
        const circle = rc.circle(width / 2, lineHeight / 2 + offsetY, width / 3, options)
        svg.appendChild(circle)
        break
      }
      case 'square': {
        const rect = rc.rectangle(
          width / 2 - width / 8,
          lineHeight / 2 - width / 8 + offsetY,
          width / 3,
          width / 3,
          options,
        )
        svg.appendChild(rect)
        break
      }
    }
    offsetY += value + gapSize
  }
}
</script>

<template>
  <RSpace
    ref="root"
    :tag="tag"
    vertical
    class="r-list"
  >
    <li v-if="listStyle !== 'auto'" role="presentation" class="r-list__markers">
      <RGraphics ref="graphics" :options="graphicsOptions" @draw="draw" />
    </li>
    <li v-for="item in renderedItems" :key="item" class="r-list__item">
      <slot :name="item">
        <slot name="*" :item="item"></slot>
      </slot>
    </li>
  </RSpace>
</template>

<style lang="scss" scoped>
.r-list {
  --r-list-marker-color: var(--r-common-text-color);
  --r-list-marker-size: 1.5em;
  position: relative;
  padding-inline-start: var(--r-list-marker-size);
}
.r-list:has(> .r-list__markers) {
  list-style-type: none;
}
.r-list__markers {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  display: block;
  width: var(--r-list-marker-size);
  pointer-events: none;
}
.r-list__item {
  &::marker {
    width: var(--r-list-marker-size);
  }
}
</style>
