import type { Options } from 'roughjs/bin/core'
import type { InjectionKey, Ref } from 'vue'

export const configInjection: InjectionKey<Ref<Options | undefined>> = Symbol('RGraphicsConfig')

export function getSVGSize(element: SVGSVGElement) {
  return {
    width: element.width.baseVal.value,
    height: element.height.baseVal.value,
  }
}
