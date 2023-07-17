<script lang="ts" setup>
import { provide, reactive } from 'vue'
import RToast from './index.vue'
import type { Toast } from './utils'
import { toastsInjection } from './utils'

defineOptions({
  name: 'RToastProvider',
})

defineSlots<{
  default?: (props: {}) => any,
}>()

const toasts = reactive<Toast[]>([])

function toggle(open: boolean, id: Toast['id']) {
  if (!open) {
    const index = toasts.findIndex(item => item.id === id)
    if (index !== -1) {
      toasts.splice(index, 1)
    }
  }
}

provide(toastsInjection, toasts)
</script>

<template>
  <slot></slot>
  <div class="r-toast-provider">
    <RToast
      v-for="(toast, index) in toasts"
      :key="toast.id"
      v-bind="toast.props"
      :style="{ '--r-toast-provider-index': index }"
      @update:open="toggle($event, toast.id)"
    >
      <component :is="toast.render"></component>
    </RToast>
  </div>
</template>

<style lang="scss" scoped>
.r-toast-provider {
  --r-toast-provider-base-size: calc(var(--r-common-line-height) + var(--r-common-box-padding-block) * 2);
  --r-toast-provider-gap-size: 12px;
  position: fixed;
  block-size: 0;
  inline-size: 0;
  :deep(> .r-toast) {
    transform: translate(-50%, calc(-50% - var(--r-toast-provider-index) * (var(--r-toast-provider-base-size) + var(--r-toast-provider-gap-size))));
  }
}
</style>
