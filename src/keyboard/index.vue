<script lang="ts" setup>
import { Options } from 'roughjs/bin/core'
import '../common/style.scss'
import { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { ColorProps, SizeProps } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RKeyboard',
})

const {
  tag = 'kbd',
  color,
  size = 'small',
} = defineProps<{
  /**
   * HTML tag for rendering the card.
   * @default 'article'
   */
  tag?: string,
} & ColorProps & SizeProps>()

defineSlots<{
  /** Content of the keyboard. */
  default?: (props: {}) => any,
}>()

const { track, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
  track()
  const { width, height } = getSVGSize(svg)
  const insetSize = getLengthProperty(svg, '--R-keyboard-inset-size') ?? 0
  const sideSize = getLengthProperty(svg, '--R-keyboard-side-size') ?? 0
  const strokeWidth = getLengthProperty(svg, '--R-keyboard-border-width') ?? 0
  const options: Options = {
    stroke: 'var(--R-keyboard-border-color)',
    strokeWidth,
  }
  const renderedSideSize = sideSize - insetSize
  const epsilon = 2
  const rectangle = rc.rectangle(
    insetSize + epsilon,
    insetSize + epsilon,
    width - insetSize - renderedSideSize - epsilon * 2,
    height - insetSize - renderedSideSize - epsilon * 2,
    {
      ...options,
      ...overridden,
    },
  )
  svg.appendChild(rectangle)
  const frame = rc.linearPath([
    [insetSize + epsilon, height - renderedSideSize - epsilon],
    [insetSize + renderedSideSize + epsilon, height - epsilon],
    [width - epsilon, height - epsilon],
    [width - epsilon, insetSize + renderedSideSize + epsilon],
    [width - renderedSideSize - epsilon, insetSize + epsilon],
  ], {
    ...options,
    ...overridden,
  })
  svg.appendChild(frame)
  const shadow = rc.polygon([
    [insetSize + epsilon, height - renderedSideSize - epsilon],
    [insetSize + renderedSideSize + epsilon, height - epsilon],
    [width - epsilon, height - epsilon],
    [width - epsilon, insetSize + renderedSideSize + epsilon],
    [width - renderedSideSize - epsilon, insetSize + epsilon],
    [width - renderedSideSize - epsilon, height - renderedSideSize - epsilon],
  ], {
    ...options,
    strokeWidth: 0,
    fill: 'var(--R-keyboard-border-color)',
    hachureAngle: 45,
    ...getFilledSizeOptions(1),
    ...overridden,
  })
  svg.appendChild(shadow)
  const line = rc.line(
    width - renderedSideSize - epsilon,
    height - renderedSideSize - epsilon,
    width - epsilon,
    height - epsilon,
    {
      ...options,
      ...overridden,
    },
  )
  svg.appendChild(line)
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "keyboard",
      "description": "Root of the keyboard."
    }
  ]
}
</defs>

<template>
  <component :is="tag" :class="['r-keyboard', color, size]" @transitionrun="listener">
    <RGraphics selector="keyboard" @draw="draw"></RGraphics>
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-keyboard-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-keyboard-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-keyboard-top-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-keyboard-padding-inline {
  syntax: '<length-percentage>+';
  inherits: true;
  initial-value: 0px;
}

@property --R-keyboard-side-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-keyboard-inset-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-keyboard {
  // Color of the keyboard border.
  --R-keyboard-border-color: var(--r-keyboard-border-color, var(--r-element-color));
  // Width of the keyboard border.
  --R-keyboard-border-width: var(--r-keyboard-border-width, var(--r-common-stroke-width));
  // Area height of the keyboard top surface.
  --R-keyboard-top-size: var(--r-keyboard-block-size, 2em);
  // Horizontal padding of the keyboard top surface.
  --R-keyboard-padding-inline: var(--r-keyboard-padding-inline, calc(var(--R-keyboard-top-size) - 2 * 1ch));
  // Area width of the keyboard side surfaces.
  --R-keyboard-side-size: var(--r-keyboard-side-size, 6px);
  // Pressed distance of the keyboard.
  --R-keyboard-inset-size: var(--r-keyboard-inset-size, 0px);
  display: inline-block;
  padding-top: var(--R-keyboard-inset-size);
  padding-right: calc(var(--R-keyboard-padding-inline) + var(--R-keyboard-side-size) - var(--R-keyboard-inset-size));
  padding-bottom: calc(var(--R-keyboard-side-size) - var(--R-keyboard-inset-size));
  padding-left: calc(var(--R-keyboard-padding-inline) + var(--R-keyboard-inset-size));
  color: var(--r-element-color);
  line-height: var(--R-keyboard-top-size);
  @include partials.colored-element();
  @include partials.sized-element();
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-keyboard-border-width: border-top-width,
      --R-keyboard-side-size: padding-top,
      --R-keyboard-inset-size: padding-right,
    ));
  }
  &:focus:active {
    --R-keyboard-inset-size: var(--r-keyboard-inset-size, 4px);
  }
}
</style>
