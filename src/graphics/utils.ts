import unit from 'parse-unit'
import type { Options } from 'roughjs/bin/core'
import toPX from 'to-px'
import type { InjectionKey, Ref } from 'vue'

export const optionsInjection: InjectionKey<Ref<Options | undefined>> = Symbol('RGraphicsConfig#options')

export function getSVGSize(element: SVGSVGElement) {
  return {
    width: element.width.baseVal.value,
    height: element.height.baseVal.value,
  }
}

function measureCSSValue(element: Element, value: string) {
  const parts = unit(value)
  if (!isNaN(parts[0]) && !parts[1]) return parts[0]
  return toPX(value, element as HTMLElement)
}

export function measureSVGSize(element: SVGSVGElement, property: string) {
  const size = getComputedStyle(element).getPropertyValue(property)
  return measureCSSValue(element, size)
}

export function measureSVGSizeAsArray(element: SVGSVGElement, property: string) {
  const size = getComputedStyle(element).getPropertyValue(property)
  const value = size.split(/[,\s]+/).map(part => measureCSSValue(element, part))
  if (value.length === 1 && value[0] === null) return null
  return value
}
