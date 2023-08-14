<script lang="ts" setup>
import '../common/style.scss'
import { provide, reactive } from 'vue'
import RToast from './index.vue'
import type { ToastItem } from './utils'
import { itemsInjection } from './utils'

defineOptions({
  name: 'RToastProvider',
})

defineSlots<{
  default?: (props: {}) => any,
}>()

const items = reactive<ToastItem[]>([])

function toggle(open: boolean, id: ToastItem['id']) {
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
      :style="{ '--r-toast-provider-index': index }"
      @update:open="toggle($event, item.id)"
    >
      <component :is="item.slots.default"></component>
    </RToast>
  </div>
</template>

<style lang="scss">
.r-toast-provider {
  --r-toast-provider-base-size: calc(var(--r-common-line-height) + var(--r-common-box-padding-block) * 2);
  --r-toast-provider-gap-size: calc(1em - 4px);
  position: fixed;
  block-size: 0;
  inline-size: 0;
  :deep(> .r-toast) {
    transform: translate(-50%, calc(-50% - var(--r-toast-provider-index) * (var(--r-toast-provider-base-size) + var(--r-toast-provider-gap-size))));
  }
}
</style>
