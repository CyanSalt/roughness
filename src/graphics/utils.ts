import { chunk } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { Point } from 'roughjs/bin/geometry'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InjectionKey, Ref, SVGAttributes } from 'vue'

export const optionsInjection: InjectionKey<Ref<Options | undefined>> = Symbol('RGraphicsConfig#options')

export interface GraphicsProps {
  /**
   * [Options for Rough.js]{@link https://github.com/rough-stuff/rough/wiki#options}.
   * See [Graphics Configuration]{@link https://roughness.vercel.app/components/graphics.html#component-prop}.
   * @type {import('roughjs/bin/core').Options}
   */
  graphicsOptions?: Options,
}

export function getSVGSize(element: SVGSVGElement) {
  return {
    width: element.width.baseVal.value,
    height: element.height.baseVal.value,
  }
}

export function getFilledSizeOptions(strokeWidth: number) {
  return {
    fillWeight: strokeWidth ? strokeWidth / 2 : 0.5,
    hachureGap: strokeWidth ? strokeWidth * 4 : 4,
  }
}

export type SVGAttrs = SVGAttributes & Record<string, string | number | undefined>

export type SVGNode = [
  tag: string,
  attrs: SVGAttrs,
  children?: SVGNode[],
]

function asNumber(value: string | number | undefined) {
  return value === undefined ? value : Number(value)
}

function getComputedStyleAttrs(element: SVGElement) {
  const properties = ['fill', 'stroke', 'stroke-width'] as const
  const style = getComputedStyle(element)
  return Object.fromEntries(properties.map(property => [property, style.getPropertyValue(property)])) as {
    fill: string,
    stroke: string,
    'stroke-width': string,
  }
}

function applyMarkerAttrs(element: SVGElement, attrs: SVGAttrs) {
  const properties = ['marker-start', 'marker-mid', 'marker-end'] as const
  for (const property of properties) {
    const value = attrs[property]
    if (value) {
      element.setAttribute(property, value)
    }
  }
}

export function parseSVGNode(element: SVGElement): SVGNode {
  const xmlns = element.namespaceURI ?? undefined
  const tag = xmlns === 'http://www.w3.org/1999/xhtml' ? element.localName : element.nodeName
  const attrs = element.nodeType === 3
    ? { textContent: element.textContent ?? undefined }
    : {
      ...Object.fromEntries(Array.from(element.attributes, attr => [attr.name, attr.value])),
      ...getComputedStyleAttrs(element),
      xmlns,
    }
  const children = element.childNodes.length
    ? Array.from(element.childNodes, child => parseSVGNode(child as SVGElement))
    : undefined
  return [tag, attrs, children]
}

export interface DrawSVGNodeOptions {
  solid?: boolean,
  graphicsOptions?: Options,
}

export function drawSVGNode(
  rc: RoughSVG,
  parent: Element,
  node: SVGNode,
  options?: DrawSVGNodeOptions,
) {
  const [tag, rawAttrs, children] = node
  const { xmlns, fill, stroke, 'stroke-width': strokeWidth, ...attrs } = rawAttrs
  const graphicsOptions: Options = {
    ...options?.graphicsOptions,
    ...Object.fromEntries([
      ['fill', fill],
      ['stroke', stroke],
      ['stroke-width', strokeWidth],
    ].filter(([key, value]) => value)),
  }
  if (
    options?.solid
    && !(graphicsOptions.stroke && graphicsOptions.stroke !== 'none')
    && (graphicsOptions.fill && graphicsOptions.fill !== 'none')
  ) {
    graphicsOptions.stroke = graphicsOptions.fill
  }
  switch (tag) {
    case 'ellipse': {
      const ellipse = rc.ellipse(
        asNumber(attrs.cx) ?? 0,
        asNumber(attrs.cy) ?? 0,
        (asNumber(attrs.rx) ?? 0) * 2,
        (asNumber(attrs.ry) ?? 0) * 2,
        graphicsOptions,
      )
      parent.appendChild(ellipse)
      break
    }
    case 'circle': {
      const circle = rc.circle(
        asNumber(attrs.cx) ?? 0,
        asNumber(attrs.cy) ?? 0,
        (asNumber(attrs.r) ?? 0) * 2,
        graphicsOptions,
      )
      parent.appendChild(circle)
      break
    }
    case 'line': {
      const line = rc.line(
        asNumber(attrs.x1) ?? 0,
        asNumber(attrs.y1) ?? 0,
        asNumber(attrs.x2) ?? 0,
        asNumber(attrs.y2) ?? 0,
        graphicsOptions,
      )
      applyMarkerAttrs(line, attrs)
      parent.appendChild(line)
      break
    }
    case 'path': {
      const path = rc.path(String(attrs.d ?? ''), graphicsOptions)
      applyMarkerAttrs(path, attrs)
      parent.appendChild(path)
      break
    }
    case 'polygon': {
      const points = String(attrs.points ?? '')
      const positions = chunk((points.match(/\d+(?:\.\d+)?/g) ?? []).map(Number), 2) as Point[]
      const polygon = rc.polygon(positions, graphicsOptions)
      parent.appendChild(polygon)
      break
    }
    case 'polyline': {
      const points = String(attrs.points ?? '')
      const positions = chunk((points.match(/\d+(?:\.\d+)?/g) ?? []).map(Number), 2) as Point[]
      const linearPath = rc.linearPath(positions, graphicsOptions)
      applyMarkerAttrs(linearPath, attrs)
      parent.appendChild(linearPath)
      break
    }
    case 'rect': {
      const rectangle = rc.rectangle(
        asNumber(attrs.x) ?? 0,
        asNumber(attrs.y) ?? 0,
        asNumber(attrs.width) ?? 0,
        asNumber(attrs.height) ?? 0,
        graphicsOptions,
      )
      parent.appendChild(rectangle)
      break
    }
    case '#text': {
      const text = document.createTextNode(String(attrs.textContent ?? ''))
      parent.appendChild(text)
      break
    }
    default: {
      const svg = document.createElementNS(xmlns ?? 'http://www.w3.org/2000/svg', tag)
      for (const [key, value] of Object.entries(attrs)) {
        svg.setAttribute(key, String(value))
      }
      parent.appendChild(svg)
      if (children) {
        for (const child of children) {
          drawSVGNode(rc, svg, child, options)
        }
      }
      break
    }
  }
}
