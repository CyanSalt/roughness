import type { Options } from 'roughjs/bin/core'
import type { InjectionKey, Ref } from 'vue'

export const optionsInjection: InjectionKey<Ref<Options | undefined>> = Symbol('RGraphicsConfig#options')

export interface GraphicsProps {
  /**
   * Options for Rough.js
   * {@link https://github.com/rough-stuff/rough/wiki#options}
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
