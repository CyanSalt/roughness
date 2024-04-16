<script lang="ts" setup>
import '../common/style.scss'
import { provide, reactive } from 'vue'
import RConfirm from './index.vue'
import type { ConfirmItemData } from './utils'
import { itemsInjection } from './utils'

defineOptions({
  name: 'RConfirmProvider',
})

defineSlots<{
  /** Context scope of the provider. */
  default?: (props: {}) => any,
}>()

const items = reactive<ConfirmItemData[]>([])

function resolve(id: ConfirmItemData['id'], value: boolean) {
  const index = items.findIndex(item => item.id === id)
  if (index !== -1) {
    const item = items[index]
    item.resolve(value)
    items.splice(index, 1)
  }
}

provide(itemsInjection, items)
</script>

<template>
  <slot></slot>
  <div class="r-confirm-provider">
    <RConfirm
      v-for="item in items"
      :key="item.id"
      v-bind="item.props"
      @confirm="resolve(item.id, true)"
      @cancel="resolve(item.id, false)"
    >
      <template #title>
        <component :is="item.slots.title"></component>
      </template>
      <component :is="item.slots.default"></component>
    </RConfirm>
  </div>
</template>

<style lang="scss">
.r-confirm-provider {
  position: fixed;
  block-size: 0;
  inline-size: 0;
}
</style>
