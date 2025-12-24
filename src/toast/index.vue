<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { useTemplateRef, watchEffect } from 'vue'
import { getLengthProperty, useTransitionListener } from '../common/property'
import type { LegacyColorProps, SizeProps } from '../common/utils'
import { useLocal } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RToast',
})

const {
  duration = 3000,
  open = true,
  type,
  size,
  graphicsOptions,
} = defineProps<{
  /**
   * Duration of each toast display.
   * @default 3000
   */
  duration?: number,
  /**
   * Whether to display the toast.
   * @default true
   */
  open?: boolean,
} & LegacyColorProps & SizeProps & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when visibility of the toast is changed. */
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  /** Content of the toast. */
  default?: (props: {}) => any,
}>()

let internalOpen = $(useLocal({
  get: () => open,
  set: value => {
    emit('update:open', internalOpen)
  },
}))

function toggle(event: ToggleEvent) {
  internalOpen = event.newState === 'open'
}

watchEffect(onInvalidate => {
  if (internalOpen && Number.isFinite(duration)) {
    const timeout = setTimeout(() => {
      internalOpen = false
    }, duration)
    onInvalidate(() => {
      clearTimeout(timeout)
    })
  }
})

let root = $(useTemplateRef<HTMLElement>('root'))

watchEffect(() => {
  if (!root) return
  try {
    if (internalOpen) {
      root.showPopover()
    } else {
      root.hidePopover()
    }
  } catch (err) {
    if (!(err instanceof DOMException)) {
      throw err
    }
  }
})

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-toast-border-width') ?? 0
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    strokeWidth,
    stroke: 'var(--R-toast-color)',
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
    ...getFilledSizeOptions(strokeWidth),
  })
  svg.appendChild(rectangle)
}
</script>

<template>
  <div
    ref="root"
    popover="manual"
    :class="['r-toast', type, size]"
    @toggle="toggle"
    @transitionrun="listener"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-toast-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-toast-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@layer roughness__base {
  .r-toast {
    @include reset.popover;
  }
}
.r-toast {
  // Color of the toast text and border.
  --R-toast-color: var(--r-toast-color, var(--r-element-color));
  // Width of the toast border.
  --R-toast-border-width: var(--r-toast-border-width, var(--r-common-stroke-width));
  position: fixed;
  inset: unset;
  inset-block-start: 75%;
  inset-inline-start: 50%;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-toast-color);
  transform: translate(-50%, -50%);
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-toast-border-width: border-top-width,
    ));
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
