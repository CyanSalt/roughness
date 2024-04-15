<script lang="ts" setup>
import '../common/style.scss'
import { chunk } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions } from '../graphics/utils'
import RText from '../text/index.vue'
import type { IconNode } from './utils'

defineOptions({
  name: 'RIcon',
})

const {
  icon,
  filled,
  graphicsOptions,
} = defineProps<{
  /** Icon object conforming to the type constraint */
  icon: IconNode,
  /** Whether to fill the icon */
  filled?: boolean,
} & GraphicsProps>()

const svgAttrs = $computed(() => {
  if (!icon) {
    return { viewBox: '0 0 1 1' } // as placeholder
  }
  const { xmlns, viewBox } = icon[1]
  return { xmlns, viewBox }
})

const children = $computed(() => {
  return icon?.[2] ?? []
})

function asNumber(value: string | number | undefined) {
  return value === undefined ? value : Number(value)
}

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const strokeWidth = getLengthProperty(svg, '--R-icon-stroke-width') ?? 0
  const options: Options = {
    roughness: 0.5,
    disableMultiStroke: true,
    stroke: 'var(--R-icon-stroke-color)',
    strokeWidth,
    fill: filled ? 'var(--R-icon-color)' : undefined,
    ...getFilledSizeOptions(1),
  }
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
  <RText
    :class="['r-icon', { 'is-filled': filled }]"
    @transitionrun="listener"
  >
    <RGraphics
      :options="graphicsOptions"
      :responsive="false"
      v-bind="svgAttrs"
      @draw="draw"
    />
  </RText>
</template>

<style lang="scss">
@use '../common/_partials';

.r-icon {
  --R-icon-color: var(--r-icon-color, var(--R-text-color));
  --R-icon-stroke-color: var(--r-icon-stroke-color, var(--R-icon-color));
  --R-icon-stroke-width: var(--r-icon-stroke-width, 2px);
  display: inline-block;
  block-size: calc(1em + 4px);
  inline-size: calc(1em + 4px);
  &::before {
    @include partials.ghost();
    border-top: var(--R-icon-stroke-width) solid;
    transition: border-top 1ms !important;
  }
  .r-graphics {
    block-size: 100%;
    inline-size: 100%;
  }
}
</style>
