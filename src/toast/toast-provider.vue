<script lang="ts" setup>
import '../common/style.scss'
import { provide, reactive } from 'vue'
import RToast from './index.vue'
import type { ToastItemData } from './utils'
import { itemsInjection } from './utils'

defineOptions({
  name: 'RToastProvider',
})

defineSlots<{
  /** Context scope of the provider. */
  default?: (props: {}) => any,
}>()

const items = reactive<ToastItemData[]>([])

function toggle(open: boolean, id: ToastItemData['id']) {
  if (!open) {
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items.splice(index, 1)
    }
  }
}

provide(itemsInjection, items)
</script>

<template>
  <slot></slot>
  <div class="r-toast-provider">
    <RToast
      v-for="(item, index) in items"
      :key="item.id"
      v-bind="item.props"
      :style="{ '--R-toast-provider-index': index }"
      @update:open="toggle($event, item.id)"
    >
      <component :is="item.slots.default"></component>
    </RToast>
  </div>
</template>

<style lang="scss">
.r-toast-provider {
  // Value to treat the size of a toast as when calculating the offset.
  // @type {<length>}
  --R-toast-provider-base-size: var(--r-toast-provider-base-size, calc(var(--r-common-line-height) + var(--r-common-box-padding-block) * 2));
  // Size of the gap between toasts as when calculating the offset.
  // @type {<length>}
  --R-toast-provider-gap-size: var(--r-toast-provider-gap-size, calc(1em - 4px));
  position: fixed;
  block-size: 0;
  inline-size: 0;
  & > .r-toast {
    transform: translate(-50%, calc(-50% - var(--R-toast-provider-index) * (var(--R-toast-provider-base-size) + var(--R-toast-provider-gap-size))));
  }
}
</style>
