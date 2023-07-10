<script lang="ts" setup>
import icons from 'feather-icons/dist/icons.json'
import { chunk } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import RText from '../text/index.vue'

defineOptions({
  name: 'RIcon',
})

const {
  name,
  reactions = (() => ['']) as never,
  graphicsOptions,
} = defineProps<{
  name: string,
} & GraphicsProps>()

const svgAttrs: Partial<Record<keyof SVGSVGElement, string>> = {
  viewBox: '0 0 24 24',
}

const parser = new DOMParser()

const elements = $computed<SVGElement[]>(() => {
  const root = parser.parseFromString(`<svg>${icons[name]}</svg>`, 'image/svg+xml')
  const doc = root.documentElement as unknown as SVGSVGElement
  return Array.from(doc.children as HTMLCollectionOf<SVGElement>)
})

function getSVGElementValue(element: SVGElement, property: string) {
  return element.attributes.getNamedItem(property)?.value
}

function getSVGElementValueAsNumber(element: SVGElement, property: string) {
  const value = getSVGElementValue(element, property)
  return value === undefined ? value : Number(value)
}

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const options: Options = {
    stroke: 'var(--r-icon-color)',
    strokeWidth: 2,
  }
  for (const item of elements) {
    switch (item.tagName) {
      case 'ellipse': {
        const ellipse = rc.ellipse(
          getSVGElementValueAsNumber(item, 'cx') ?? 0,
          getSVGElementValueAsNumber(item, 'cy') ?? 0,
          (getSVGElementValueAsNumber(item, 'rx') ?? 0) * 2,
          (getSVGElementValueAsNumber(item, 'ry') ?? 0) * 2,
          options,
        )
        svg.appendChild(ellipse)
        break
      }
      case 'circle': {
        const circle = rc.circle(
          getSVGElementValueAsNumber(item, 'cx') ?? 0,
          getSVGElementValueAsNumber(item, 'cy') ?? 0,
          (getSVGElementValueAsNumber(item, 'r') ?? 0) * 2,
          options,
        )
        svg.appendChild(circle)
        break
      }
      case 'line': {
        const line = rc.line(
          getSVGElementValueAsNumber(item, 'x1') ?? 0,
          getSVGElementValueAsNumber(item, 'y1') ?? 0,
          getSVGElementValueAsNumber(item, 'x2') ?? 0,
          getSVGElementValueAsNumber(item, 'y2') ?? 0,
          options,
        )
        svg.appendChild(line)
        break
      }
      case 'path': {
        const path = rc.path(getSVGElementValue(item, 'd') ?? '', options)
        svg.appendChild(path)
        break
      }
      case 'polygon': {
        const points = getSVGElementValue(item, 'points') ?? ''
        const positions = chunk((points.match(/\d+(?:\.\d+)?/g) ?? []).map(Number), 2) as Point[]
        const polygon = rc.polygon(positions, options)
        svg.appendChild(polygon)
        break
      }
      case 'polyline': {
        const points = getSVGElementValue(item, 'points') ?? ''
        const positions = chunk((points.match(/\d+(?:\.\d+)?/g) ?? []).map(Number), 2) as Point[]
        const linearPath = rc.linearPath(positions, options)
        svg.appendChild(linearPath)
        break
      }
      case 'rect': {
        const rectangle = rc.rectangle(
          getSVGElementValueAsNumber(item, 'x') ?? 0,
          getSVGElementValueAsNumber(item, 'y') ?? 0,
          getSVGElementValueAsNumber(item, 'width') ?? 0,
          getSVGElementValueAsNumber(item, 'height') ?? 0,
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

<style lang="scss" scoped>
.r-icon {
  --r-icon-color: var(--r-common-text-color);
  display: inline-block;
  width: calc(1em + 4px);
  height: calc(1em + 4px);
  :deep(.r-graphics) {
    width: 100%;
    height: 100%;
  }
}
</style>
