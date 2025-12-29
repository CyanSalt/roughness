import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray } from '../common/property'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'

export interface DrawBoxProps {
  stroked?: MaybeRefOrGetter<boolean>,
  filled?: MaybeRefOrGetter<boolean>,
  round?: MaybeRefOrGetter<boolean>,
}

export function useDrawBox(props?: DrawBoxProps) {
  return function (rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
    const stroked = toValue(props?.stroked) ?? true
    const filled = toValue(props?.filled) ?? false
    const round = toValue(props?.round) ?? false
    const { width, height } = getSVGSize(svg)
    const strokeWidth = getLengthProperty(svg, '--R-box-border-width') ?? 0
    const strokeLineDash = getLengthPropertyAsArray(svg, '--R-box-border-dash')
      ?.map(value => value ?? 0) ?? undefined
    const options: Options = {
      ...(stroked ? {
        stroke: 'var(--R-box-border-color)',
        strokeWidth,
        strokeLineDash,
      } : {
        strokeWidth: 0,
      }),
      ...(filled ? {
        fill: 'var(--R-box-fill-color)',
        ...getFilledSizeOptions(strokeWidth),
      } : undefined),
    }
    const epsilon = 2
    if (round) {
      const ellipse = rc.ellipse(
        width / 2,
        height / 2,
        width - epsilon * 2,
        height - epsilon * 2,
        {
          ...options,
          disableMultiStroke: Boolean(strokeLineDash),
          ...overridden,
        },
      )
      svg.appendChild(ellipse)
    } else {
      const rectangle = rc.rectangle(
        epsilon,
        epsilon,
        width - epsilon * 2,
        height - epsilon * 2,
        {
          ...options,
          ...overridden,
        },
      )
      svg.appendChild(rectangle)
    }
  }
}
