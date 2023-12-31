<script lang="ts" setup>
import '../common/style.scss'
import { chunk, kebabCase } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty } from '../common/property'
import { useReactionState } from '../common/reaction'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import RText from '../text/index.vue'
import type { IconNode } from './utils'
import { useIcons } from './utils'

defineOptions({
  name: 'RIcon',
})

const {
  name,
  icon,
  reactions = (() => ['']) as never,
  graphicsOptions,
} = defineProps<{
  /** Name of the icon defined by `defineIcons` */
  name?: string,
  /** Icon object conforming to the type constraint */
  icon?: IconNode,
} & GraphicsProps>()

const definedIcons = useIcons()

const renderedIcon = $computed(() => {
  return icon ?? (name ? definedIcons[kebabCase(name)] : undefined)
})

const svgAttrs = $computed(() => {
  if (!renderedIcon) {
    return { viewBox: '0 0 1 1' } // as placeholder
  }
  const { xmlns, viewBox } = renderedIcon[1]
  return { xmlns, viewBox }
})

function asNumber(value: string | number | undefined) {
  return value === undefined ? value : Number(value)
}

const getReactionState = useReactionState(() => reactions)

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  if (!renderedIcon) return
  getReactionState()
  const strokeWidth = getLengthProperty(svg, '--r-icon-line-width') ?? 0
  const options: Options = {
    stroke: 'var(--r-icon-color)',
    strokeWidth,
  }
  const children = renderedIcon[2] ?? []
  for (const [tag, attrs] of children) {
    switch (tag) {
      case 'ellipse': {
        const ellipse = rc.ellipse(
          asNumber(attrs.cx) ?? 0,
          asNumber(attrs.cy) ?? 0,
          (asNumber(attrs.rx) ?? 0) * 2,
          (asNumber(attrs.ry) ?? 0) * 2,
          options,
        )
        svg.appendChild(ellipse)
        break
      }
      case 'circle': {
        const circle = rc.circle(
          asNumber(attrs.cx) ?? 0,
          asNumber(attrs.cy) ?? 0,
          (asNumber(attrs.r) ?? 0) * 2,
          options,
        )
        svg.appendChild(circle)
        break
      }
      case 'line': {
        const line = rc.line(
          asNumber(attrs.x1) ?? 0,
          asNumber(attrs.y1) ?? 0,
          asNumber(attrs.x2) ?? 0,
          asNumber(attrs.y2) ?? 0,
          options,
        )
        svg.appendChild(line)
        break
      }
      case 'path': {
        const path = rc.path(String(attrs.d ?? ''), options)
        svg.appendChild(path)
        break
      }
      case 'polygon': {
        const points = String(attrs.points ?? '')
        const positions = chunk((points.match(/\d+(?:\.\d+)?/g) ?? []).map(Number), 2) as Point[]
        const polygon = rc.polygon(positions, options)
        svg.appendChild(polygon)
        break
      }
      case 'polyline': {
        const points = String(attrs.points ?? '')
        const positions = chunk((points.match(/\d+(?:\.\d+)?/g) ?? []).map(Number), 2) as Point[]
        const linearPath = rc.linearPath(positions, options)
        svg.appendChild(linearPath)
        break
      }
      case 'rect': {
        const rectangle = rc.rectangle(
          asNumber(attrs.x) ?? 0,
          asNumber(attrs.y) ?? 0,
          asNumber(attrs.width) ?? 0,
          asNumber(attrs.height) ?? 0,
          options,
        )
        svg.appendChild(rectangle)
        break
      }
    }
  }
}
</script>

<template>
  <RText class="r-icon">
    <RGraphics
      :options="graphicsOptions"
      :responsive="false"
      v-bind="svgAttrs"
      @draw="draw"
    />
  </RText>
</template>

<style lang="scss">
.r-icon {
  --r-icon-color: var(--r-text-color);
  --r-icon-line-width: 2px;
  display: inline-block;
  block-size: calc(1em + 4px);
  inline-size: calc(1em + 4px);
  :deep(.r-graphics) {
    width: 100%;
    height: 100%;
  }
}
</style>
