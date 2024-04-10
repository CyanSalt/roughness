<script lang="ts" setup>
import '../common/style.scss'
import { provide, watchEffect } from 'vue'
import type { RValueOrKey } from '../common/key'
import { useList } from '../common/list'
import { effectRef } from '../common/utils'
import { itemsInjection, modelInjection } from './utils'

const {
  autoplay = 0,
  modelValue,
} = defineProps<{
  /**
   * Time interval in milliseconds to autoplay the carousel items
   * @default 0
   */
  autoplay?: number,
  /** Key or data of the active item of the carousel */
  modelValue?: RValueOrKey,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

let internalModelValue = $(effectRef({
  get: () => {
    return modelValue
  },
  set: value => {
    emit('update:modelValue', value)
  },
}))

provide(modelInjection, $$(internalModelValue))
const items = useList(itemsInjection)

watchEffect(() => {
  if (typeof internalModelValue === 'undefined' && items.length) {
    internalModelValue = items[0].value
  }
})

watchEffect(onInvalidate => {
  if (autoplay > 0 && items.length) {
    const index = items.findIndex(item => item.value === internalModelValue)
    const timer = setTimeout(() => {
      const target = index === items.length - 1 ? 0 : index + 1
      internalModelValue = items[target].value
    }, autoplay)
    onInvalidate(() => {
      clearTimeout(timer)
    })
  }
})
</script>

<template>
  <div
    class="r-carousel"
    :style="{ '--r-carousel-count': items.length }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.r-carousel {
  --r-carousel-gap-size: calc(1em - 4px);
  display: flex;
  align-items: start;
  padding-block-start: calc(var(--r-carousel-gap-size) * (var(--r-carousel-count) - 1));
  padding-inline-end: var(--r-carousel-gap-size);
}
</style>
