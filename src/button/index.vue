<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import type { ColorProps, SizeProps } from '../common/utils'
import { isTruthyBooleanish } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RLoading from '../loading/index.vue'

defineOptions({
  name: 'RButton',
})

const {
  block = false,
  disabled: userDisabled,
  filled = false,
  htmlType,
  loading = false,
  round = false,
  tag = 'button',
  type,
  size,
  graphicsOptions,
} = defineProps<{
  /** Whether the button is displayed as block. */
  block?: boolean,
  /** @ignore */
  disabled?: HTMLButtonElement['disabled'],
  /** Whether the button is filled with its color. */
  filled?: boolean,
  /**
   * [The `type` attribute of `HTMLButtonElement`]{@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement#htmlbuttonelement.type}.
   */
  htmlType?: HTMLButtonElement['type'],
  /**
   * Whether the button is loading. It will be non-interactive in loading state.
   */
  loading?: boolean,
  /** Whether the button is round. */
  round?: boolean,
  /**
   * HTML tag for rendering the button.
   * @default 'button'
   */
  tag?: 'button' | 'a' | (string & {}),
} & ColorProps & SizeProps & GraphicsProps>()

defineSlots<{
  /** Content of the button. */
  default?: (props: {}) => any,
}>()

const disabled = $computed(() => {
  return isTruthyBooleanish(userDisabled) || loading
})

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-button-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-button-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const options: Options = {
    stroke: 'var(--R-button-border-color)',
    strokeWidth,
    strokeLineDash,
    fill: filled ? 'var(--R-button-color)' : undefined,
    ...getFilledSizeOptions(strokeWidth),
  }
  const padding = 2
  if (round) {
    const ellipse = rc.ellipse(
      width / 2,
      height / 2,
      width - padding * 2,
      height - padding * 2,
      {
        ...options,
        disableMultiStroke: Boolean(strokeLineDash),
      },
    )
    svg.appendChild(ellipse)
  } else {
    const rectangle = rc.rectangle(
      padding,
      padding,
      width - padding * 2,
      height - padding * 2,
      options,
    )
    svg.appendChild(rectangle)
  }
}
</script>

<template>
  <component
    :is="tag"
    :type="htmlType"
    :disabled="disabled"
    :class="['r-button', type, size, { 'is-filled': filled, 'is-block': block, 'is-loading': loading }]"
    @transitionrun="listener"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <slot></slot>
    <RLoading v-if="loading" class="r-button__loading" />
  </component>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-button-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-button-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-button-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-button-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

@layer roughness__base {
  .r-button {
    @include reset.button;
  }
  a.r-button {
    text-decoration: none;
  }
}
.r-button {
  // Color of the button text.
  --R-button-color: var(--r-button-color, var(--r-element-color));
  // Color of the button border.
  --R-button-border-color: var(--r-button-border-color, var(--R-button-color));
  // Width of the button border.
  --R-button-border-width: var(--r-button-border-width, 1px);
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-button-border-dash: var(--r-button-border-dash, none);
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-button-color);
  white-space: nowrap;
  text-align: center;
  text-decoration-thickness: calc(var(--R-button-border-width) + 1px);
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-button-border-width: border-top-width,
      --R-button-border-dash: border-spacing,
    ));
  }
  &:hover:not(:disabled) {
    // @default 8px when hovered
    --R-button-border-dash: var(--r-button-border-dash, 8px);
  }
  &:focus-visible:not(:disabled), &:active:not(:disabled) {
    // @default 2px when focused or active
    --R-button-border-width: var(--r-button-border-width, 2px);
  }
  &:not(.is-loading) {
    cursor: pointer;
  }
  &:disabled:not(.is-loading) {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &.is-filled:not(:disabled) {
    text-shadow: var(--r-common-stroke-text-shadow);
  }
  &.is-block {
    display: block;
  }
  &.primary {
    --r-element-color: var(--r-common-primary-color);
  }
  &.info {
    --r-element-color: var(--r-common-info-color);
  }
  &.success {
    --r-element-color: var(--r-common-success-color);
  }
  &.warning {
    --r-element-color: var(--r-common-warning-color);
  }
  &.error {
    --r-element-color: var(--r-common-error-color);
  }
  &.comment {
    --r-element-color: var(--r-common-comment-color);
  }
  &.small {
    --r-element-font-size: var(--r-common-small-font-size);
  }
  &.large {
    --r-element-font-size: var(--r-common-large-font-size);
  }
}
</style>
