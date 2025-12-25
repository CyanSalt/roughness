<script lang="ts" setup>
import '../common/style.scss'
import { vOnClickOutside } from '@vueuse/components'
import { refDebounced, useMouseInElement } from '@vueuse/core'
import { Redo } from 'lucide'
import type { CSSProperties } from 'vue'
import { computed, useSlots, useTemplateRef, watchEffect } from 'vue'
import RCard from '../card/index.vue'
import { useLocal } from '../common/utils'
import { useGraphicsConfig } from '../graphics/utils'
import RIcon from '../icon/index.vue'

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
}>()

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

const internalOpen = useLocal({
  get: () => open,
  set: value => {
    emit('update:open', value)
  },
})

const slots = useSlots()

const header = computed(() => {
  if (userHeader !== undefined) return userHeader
  if (slots.title) return true
  if (slots['header-end']) return true
  return false
})

const footer = computed(() => {
  if (userFooter !== undefined) return userFooter
  if (slots.footer) return true
  return false
})

function toggle() {
  if (trigger === 'click') {
    internalOpen.value = !internalOpen.value
  }
}

function close() {
  if (trigger !== 'manual') {
    internalOpen.value = false
  }
}

const anchor = useTemplateRef<HTMLElement>('anchor')
const content = useTemplateRef<HTMLElement>('content')
const { isOutside: isOutsideAnchor } = useMouseInElement(anchor)
const { isOutside: isOutsideContent } = useMouseInElement(content)
const isOutside = computed<boolean>(() => isOutsideAnchor.value && isOutsideContent.value)
const isOutsideDebounced = refDebounced(isOutside, 200)

watchEffect(() => {
  if (trigger === 'hover') {
    internalOpen.value = !isOutsideDebounced.value
  }
})

const arrowStyle = computed(() => {
  let style: CSSProperties = {}
  let rotate = '0'
  let scaleY = '1'
  let translateX = '0'
  let translateY = '0'
  switch (side) {
    case 'top':
      rotate = '0.75turn'
      break
    case 'left':
      rotate = '0.5turn'
      break
    case 'bottom':
      rotate = '0.25turn'
      break
  }
  switch (side) {
    case 'top':
      style.bottom = '0'
      translateY = '50%'
      break
    case 'bottom':
      style.top = '0'
      translateY = '-50%'
      break
    case 'left':
      style.right = '0'
      translateX = '50%'
      break
    case 'right':
      style.left = '0'
      translateX = '-50%'
      break
  }
  switch (side) {
    case 'top':
      switch (align) {
        case 'start':
          style['inset-inline-start'] = '0'
          break
        case 'end':
          style['inset-inline-end'] = '0'
          scaleY = '-1'
          break
        case 'center':
        case 'stretch':
          style.left = '50%'
          translateX = '-50%'
          break
      }
      break
    case 'bottom':
      switch (align) {
        case 'start':
          style['inset-inline-start'] = '0'
          scaleY = '-1'
          break
        case 'end':
          style['inset-inline-end'] = '0'
          break
        case 'center':
        case 'stretch':
          style.left = '50%'
          translateX = '-50%'
          break
      }
      break
    case 'left':
      switch (align) {
        case 'start':
          style['inset-block-start'] = '0'
          scaleY = '-1'
          break
        case 'end':
          style['inset-block-end'] = '0'
          break
        case 'center':
        case 'stretch':
          style.top = '50%'
          translateY = '-50%'
          break
      }
      break
    case 'right':
      switch (align) {
        case 'start':
          style['inset-block-start'] = '0'
          break
        case 'end':
          style['inset-block-end'] = '0'
          scaleY = '-1'
          break
        case 'center':
        case 'stretch':
          style.top = '50%'
          translateY = '-50%'
          break
      }
      break
  }
  style.transform = `translate(${translateX}, ${translateY}) rotate(${rotate}) scaleY(${scaleY})`
  return style
})

const contentStyle = computed(() => {
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
          style['inset-inline-start'] = '0'
          break
        case 'end':
          style['inset-inline-end'] = '0'
          break
        case 'center':
          style.left = '50%'
          translateX = '-50%'
          break
        case 'stretch':
          style['inset-inline'] = '0'
          break
      }
      break
    case 'left':
    case 'right':
      switch (align) {
        case 'start':
          style['inset-block-start'] = '0'
          break
        case 'end':
          style['inset-block-end'] = '0'
          break
        case 'center':
          style.top = '50%'
          translateX = '-50%'
          break
        case 'stretch':
          style['inset-block'] = '0'
          break
      }
      break
  }
  style.transform = `translate(${translateX}, ${translateY})`
  return style
})

useGraphicsConfig({
  include: 'popover',
  options: {
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
  },
})
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "popover",
      "description": "Card of the popover."
    }
  ]
}
</defs>

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
      graphics-selector="popover"
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
      <RIcon :icon="Redo" class="r-popover__arrow" :style="arrowStyle" />
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
.r-popover__arrow {
  position: absolute;
}
</style>
