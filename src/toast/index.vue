<script lang="ts" setup>
import '../common/style.scss'
import { useCurrentElement } from '@vueuse/core'
import { watchEffect } from 'vue'
import RBox from '../box/index.vue'
import { useLocal } from '../common/utils'
import { useGraphicsConfig } from '../graphics/utils'

defineOptions({
  name: 'RToast',
})

const {
  duration = 3000,
  open = true,
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
}>()

const emit = defineEmits<{
  /** Callback function triggered when visibility of the toast is changed. */
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  /** Content of the toast. */
  default?: (props: {}) => any,
}>()

const internalOpen = useLocal({
  get: () => open,
  set: value => {
    emit('update:open', value)
  },
})

function toggle(event: ToggleEvent) {
  internalOpen.value = event.newState === 'open'
}

watchEffect(onInvalidate => {
  if (internalOpen.value && Number.isFinite(duration)) {
    const timeout = setTimeout(() => {
      internalOpen.value = false
    }, duration)
    onInvalidate(() => {
      clearTimeout(timeout)
    })
  }
})

const root = useCurrentElement<HTMLElement | null>()

watchEffect(() => {
  if (!root.value) return
  try {
    if (internalOpen.value) {
      root.value.showPopover()
    } else {
      root.value.hidePopover()
    }
  } catch (err) {
    if (!(err instanceof DOMException)) {
      throw err
    }
  }
})

useGraphicsConfig({
  include: ['toast'],
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
      "name": "toast",
      "description": "Box of the toast."
    }
  ]
}
</defs>

<template>
  <RBox
    tag="div"
    graphics-selector="toast"
    popover="manual"
    class="r-toast"
    role="alert"
    aria-live="off"
    aria-atomic="true"
    @toggle="toggle"
  >
    <slot></slot>
  </RBox>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-toast-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@layer roughness__base {
  .r-toast {
    @include reset.popover;
  }
}
.r-toast {
  // Color of the toast text and border.
  --R-toast-color: var(--r-toast-color, var(--r-element-color));
  // Box styles
  --r-box-border-color: var(--R-toast-color);
  position: fixed;
  inset: unset;
  inset-block-start: 75%;
  inset-inline-start: 50%;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-toast-color);
  transform: translate(-50%, -50%);
}
</style>
