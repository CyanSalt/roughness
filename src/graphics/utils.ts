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

export function measureSVGSize(element: SVGSVGElement, property: string) {
  const size = getComputedStyle(element).getPropertyValue(property)
  return toPX(size, element as unknown as HTMLElement)
}

export function measureSVGSizeAsArray(element: SVGSVGElement, property: string) {
  const size = getComputedStyle(element).getPropertyValue(property)
  const value = size.split(/[,\s]+/).map(part => toPX(part, element as unknown as HTMLElement))
  if (value.length === 1 && value[0] === null) return null
  return value
}
