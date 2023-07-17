<script lang="ts" setup>
import '../common/style.scss'
import { vOnClickOutside } from '@vueuse/components'
import { refDebounced, useMouseInElement } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'
import { watch, watchEffect } from 'vue'
import RCard from '../card/index.vue'
import type { GraphicsProps } from '../graphics/utils'

defineOptions({
  name: 'RPopover',
})

const {
  align = 'start',
  footer = false,
  header = false,
  open = false,
  side = 'top',
  trigger = 'hover',
  reactions,
  graphicsOptions,
} = defineProps<{
  align?: 'start' | 'end' | 'center' | 'stretch',
  footer?: boolean,
  header?: boolean,
  open?: boolean,
  side?: 'top' | 'bottom' | 'left' | 'right',
  trigger?: 'hover' | 'click' | 'manual',
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  anchor?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

let internalOpen = $ref(open)

watchEffect(() => {
  internalOpen = open
})

watch($$(internalOpen), currentValue => {
  emit('update:open', currentValue)
})

function toggle() {
  if (trigger !== 'manual') {
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
  let style: HTMLAttributes['style'] = {}
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
      :reactions="reactions"
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

<style lang="scss" scoped>
@use '../common/_reset';

.r-popover {
  position: relative;
  display: inline-block;
}
:where(.r-popover__anchor) {
  @include reset.button;
}
.r-popover__anchor {
  display: block;
  color: var(--r-common-text-color);
}
.r-popover__content {
  position: absolute;
  width: max-content;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
}
</style>
