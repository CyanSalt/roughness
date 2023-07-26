import unit from 'parse-unit'
import type { Options } from 'roughjs/bin/core'
import toPX from 'to-px'
import type { InjectionKey, Ref } from 'vue'
import type { ReactionProps } from '../common/utils'

export const optionsInjection: InjectionKey<Ref<Options | undefined>> = Symbol('RGraphicsConfig#options')

export interface GraphicsProps extends ReactionProps {
  graphicsOptions?: Options,
}

export function getSVGSize(element: SVGSVGElement) {
  return {
    width: element.width.baseVal.value,
    height: element.height.baseVal.value,
  }
}

function transformValueToLength(element: Element, value: string) {
  const parts = unit(value)
  if (!isNaN(parts[0]) && !parts[1]) return parts[0]
  return toPX(value, element as HTMLElement)
}

export function getProperty(element: Element, property: string) {
  return getComputedStyle(element).getPropertyValue(property)
}

export function getIntegerProperty(element: Element, property: string) {
  const value = getProperty(element, property)
  const integer = parseInt(value, 10)
  return isNaN(integer) ? null : integer
}

export function getLengthProperty(element: Element, property: string) {
  const value = getProperty(element, property)
  return transformValueToLength(element, value)
}

export function getLengthPropertyAsArray(element: Element, property: string) {
  const value = getProperty(element, property)
  const values = value.split(/[,\s]+/).map(part => transformValueToLength(element, part))
  if (values.length === 1 && values[0] === null) return null
  return values
}

export function getFilledSizeOptions(strokeWidth: number) {
  return {
    fillWeight: strokeWidth ? strokeWidth / 2 : 0.5,
    hachureGap: strokeWidth ? strokeWidth * 4 : 4,
  }
}
