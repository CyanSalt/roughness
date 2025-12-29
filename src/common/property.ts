import unit from 'parse-unit'
import toPX from 'to-px'
import { useTriggerable } from './utils'

function transformValueToLength(element: Element, value: string) {
  const parts = unit(value)
  if (!isNaN(parts[0]) && !parts[1]) return parts[0]
  // Prefer width-based percentage
  if (parts[1] === '%') return element.clientWidth * parts[0] / 100
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

export function useTransitionListener(pseudoElement?: string) {
  const { track, trigger } = useTriggerable()
  const listener = function (event: TransitionEvent) {
    if (typeof pseudoElement === 'string' && event.pseudoElement !== pseudoElement) return
    trigger()
  }
  return { track, listener }
}
