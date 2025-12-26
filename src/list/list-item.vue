<script lang="ts" setup>
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, ref } from 'vue'
import { getLengthProperty, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import { listStyleInjection } from './utils'

defineOptions({
  name: 'RListItem',
})

defineSlots<{
  /** Content of the list item. */
  default?: (props: {}) => any,
}>()

const listStyle = inject(listStyleInjection, ref())

const { timestamp, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
  void timestamp.value
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-list-marker-border-width') ?? 0
  const options: Options = {
    strokeWidth,
    stroke: 'var(--R-list-marker-color)',
    fill: 'var(--R-list-marker-color)',
    ...getFilledSizeOptions(1),
  }
  let offsetY = 0
  switch (listStyle.value) {
    case 'disc': {
      const circle = rc.circle(width / 2, height / 2 + offsetY, width / 4, {
        ...options,
        roughness: 0.5,
        fill: undefined,
        ...overridden,
      })
      svg.appendChild(circle)
      break
    }
    case 'circle': {
      const circle = rc.circle(width / 2, height / 2 + offsetY, width / 3, {
        ...options,
        roughness: 0,
        ...overridden,
      })
      svg.appendChild(circle)
      break
    }
    case 'square': {
      const rectangle = rc.rectangle(
        width / 2 - width / 8,
        height / 2 - width / 8 + offsetY,
        width / 3,
        width / 3,
        {
          ...options,
          ...overridden,
        },
      )
      svg.appendChild(rectangle)
      break
    }
  }
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "list-item.marker",
      "description": "Marker of the list item."
    }
  ]
}
</defs>

<template>
  <li class="r-list-item" @transitionrun="listener">
    <span v-if="listStyle" class="r-list-item__marker">
      <RGraphics selector="list-item.marker" @draw="draw" />
    </span>
    <slot></slot>
  </li>
</template>

<style lang="scss">
@use '../common/_partials';

.r-list-item {
  position: relative;
  &::marker {
    inline-size: var(--R-list-marker-inline-size);
  }
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-list-marker-border-width: border-top-width,
    ));
  }
}
.r-list-item__marker {
  position: absolute;
  inset-block: 0;
  inset-inline-start: calc(0px - var(--R-list-marker-inline-size));
  display: inline-block;
  block-size: var(--R-list-marker-block-size);
  inline-size: var(--R-list-marker-inline-size);
  pointer-events: none;
}
</style>
