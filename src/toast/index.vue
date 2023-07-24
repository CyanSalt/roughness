<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef, watchEffect } from 'vue'
import type { ColorProps, SizeProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RToast',
})

const {
  duration = 3000,
  open = true,
  type,
  size,
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  duration?: number,
  open?: boolean,
} & ColorProps & SizeProps & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

let internalOpen = $ref(open)

watchEffect(() => {
  internalOpen = open
})

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

function toggle(event: ToggleEvent) {
  internalOpen = event.newState === 'open'
  emit('update:open', internalOpen)
}

let root = $ref<HTMLElement>()

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

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke: 'var(--r-toast-color)',
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
  })
  svg.appendChild(rectangle)
}
</script>

<template>
  <div ref="root" popover="manual" :class="['r-toast', type, size]" @toggle="toggle">
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use '../common/_reset';

:where(.r-toast) {
  @include reset.popover;
}
.r-toast {
  --r-toast-color: var(--r-common-text-color);
  position: fixed;
  inset: unset;
  inset-block-start: 75%;
  inset-inline-start: 50%;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--r-toast-color);
  transform: translate(-50%, -50%);
  &.primary {
    --r-toast-color: var(--r-common-primary-color);
  }
  &.info {
    --r-toast-color: var(--r-common-info-color);
  }
  &.success {
    --r-toast-color: var(--r-common-success-color);
  }
  &.warning {
    --r-toast-color: var(--r-common-warning-color);
  }
  &.error {
    --r-toast-color: var(--r-common-error-color);
  }
  &.comment {
    --r-toast-color: var(--r-common-comment-color);
  }
  &.small {
    --r-element-font-size: var(--r-common-small-font-size);
  }
  &.large {
    --r-element-font-size: var(--r-common-large-font-size);
  }
}
</style>
