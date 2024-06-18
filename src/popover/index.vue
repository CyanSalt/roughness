<script lang="ts" setup>
import '../common/style.scss'
import { vOnClickOutside } from '@vueuse/components'
import { refDebounced, useMouseInElement } from '@vueuse/core'
import type { CSSProperties } from 'vue'
import { useSlots, watchEffect } from 'vue'
import RCard from '../card/index.vue'
import { useLocal } from '../common/utils'
import type { GraphicsProps } from '../graphics/utils'

defineOptions({
  name: 'RPopover',
})

const {
  align = 'start',
  footer: userFooter = undefined,
  header: userHeader = undefined,
  open = false,
  side = 'top',
  trigger = 'hover',
  graphicsOptions,
} = defineProps<{
  /**
   * Alignment of the popover content relative to the anchor.
   * - `start`: Align to the left or top of the anchor, depending on the value of `side`
   * - `end`: Align to the right or bottom of the anchor, depending on the value of `side`
   * - `center`: Align to the center of the anchor
   * - `stretch`: Align to both sides of the anchor at the same time
   * @default 'start'
   */
  align?: 'start' | 'end' | 'center' | 'stretch',
  /**
   * Whether to display the card footer.
   * Will be enabled automatically when the slot is passed.
   * @ignore
   */
  footer?: boolean,
  /**
   * Whether to display the card header.
   * Will be enabled automatically when any header slot is passed.
   * @ignore
   */
  header?: boolean,
  /** Whether to display the popover content. */
  open?: boolean,
  /**
   * Which side of the anchor the popover will show on.
   * @default 'top'
   */
  side?: 'top' | 'bottom' | 'left' | 'right',
  /**
   * How to trigger the display of popover content.
   * @default 'hover'
   */
  trigger?: 'hover' | 'click' | 'manual',
} & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when visibility of the popover is changed. */
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  /** Anchor of the popover. */
  anchor?: (props: {}) => any,
  /** @ignore */
  title?: (props: {}) => any,
  /** @ignore */
  'header-end'?: (props: {}) => any,
  /** @ignore */
  default?: (props: {}) => any,
  /** @ignore */
  footer?: (props: {}) => any,
}>()

let internalOpen = $(useLocal({
  get: () => open,
  set: value => {
    emit('update:open', value)
  },
}))

const slots = useSlots()

const header = $computed(() => {
  if (userHeader !== undefined) return userHeader
  if (slots.title) return true
  if (slots['header-end']) return true
  return false
})

const footer = $computed(() => {
  if (userFooter !== undefined) return userFooter
  if (slots.footer) return true
  return false
})

function toggle() {
  if (trigger === 'click') {
    internalOpen = !internalOpen
  }
}

function close() {
  if (trigger !== 'manual') {
    internalOpen = false
  }
}

let anchor = $ref<HTMLElement>()
let content = $ref<HTMLElement>()
const { isOutside: isOutsideAnchor } = $(useMouseInElement($$(anchor)))
const { isOutside: isOutsideContent } = $(useMouseInElement($$(content)))
const isOutside = $computed<boolean>(() => isOutsideAnchor && isOutsideContent)
const isOutsideDebounced = $(refDebounced($$(isOutside), 200))

watchEffect(() => {
  if (trigger === 'hover') {
    internalOpen = !isOutsideDebounced
  }
})

const contentStyle = $computed(() => {
  let style: CSSProperties = {}
  let translateX = '0'
  let translateY = '0'
  switch (side) {
    case 'top':
      style.top = '0'
      translateY = '-100%'
      break
    case 'bottom':
      style.bottom = '0'
      translateY = '100%'
      break
    case 'left':
      style.left = '0'
      translateX = '-100%'
      break
    case 'right':
      style.right = '0'
      translateX = '100%'
      break
  }
  switch (side) {
    case 'top':
    case 'bottom':
      switch (align) {
        case 'start':
          style.left = '0'
          break
        case 'end':
          style.right = '0'
          break
        case 'center':
          style.left = '50%'
          translateX = '-50%'
          break
        case 'stretch':
          style.left = '0'
          style.right = '0'
          break
      }
      break
    case 'left':
    case 'right':
      switch (align) {
        case 'start':
          style.top = '0'
          break
        case 'end':
          style.bottom = '0'
          break
        case 'center':
          style.top = '50%'
          translateX = '-50%'
          break
        case 'stretch':
          style.top = '0'
          style.bottom = '0'
          break
      }
      break
  }
  style.transform = `translate(${translateX}, ${translateY})`
  return style
})

const nestingGraphicsOptions = $computed(() => {
  return {
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
    ...graphicsOptions,
  }
})
</script>

<template>
  <span v-on-click-outside.bubble="close" class="r-popover">
    <button
      ref="anchor"
      type="button"
      class="r-popover__anchor"
      @click="toggle"
      @keydown.escape="close"
    >
      <slot name="anchor"></slot>
    </button>
    <RCard
      v-if="internalOpen"
      ref="content"
      :header="header"
      :footer="footer"
      :graphics-options="nestingGraphicsOptions"
      class="r-popover__content"
      :style="contentStyle"
      role="tooltip"
    >
      <template #header-end>
        <slot name="header-end"></slot>
      </template>
      <template #title>
        <slot name="title"></slot>
      </template>
      <slot></slot>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </RCard>
  </span>
</template>

<style lang="scss">
@use '../common/_reset';

.r-popover {
  position: relative;
  display: inline-block;
}
@layer roughness__base {
  .r-popover__anchor {
    @include reset.button;
  }
}
.r-popover__anchor {
  display: block;
  color: var(--r-element-color);
}
.r-popover__content {
  position: absolute;
  z-index: var(--r-common-overlay-z-index);
  inline-size: max-content;
}
</style>
