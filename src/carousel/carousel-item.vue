<script lang="ts" setup>
import '../common/style.scss'
import { inject, ref } from 'vue'
import type { RValueOrKey } from '../common/key'
import { useListItem } from '../common/list'
import { itemsInjection, modelInjection } from './utils'

defineOptions({
  name: 'RCarouselItem',
})

const {
  value,
} = defineProps<{
  /**
   * Carousel item key or data
   * {@link https://roughness.vercel.app/guide/specs#list-rendering}
   */
  value: RValueOrKey,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const item = $computed(() => ({ value }))

const items = useListItem(itemsInjection, $$(item))
let model = $(inject(modelInjection, ref()))

const index = $computed(() => {
  if (!items) return -1
  return items.indexOf(item)
})

const currentIndex = $computed(() => {
  if (!items) return -1
  return items.findIndex(sibling => sibling.value === model)
})

const offset = $computed(() => {
  if (!items) return 0
  return index >= currentIndex ? index - currentIndex : index - currentIndex + items.length
})

function activate() {
  model = value
}
</script>

<template>
  <div
    :class="['r-carousel-item', { 'is-active': index === currentIndex }]"
    :style="{
      '--r-carousel-item-z-index': items ? items.length - offset : 0,
      '--r-carousel-item-block-offset': -offset,
      '--r-carousel-item-inline-offset': index % 2 ? 1 : (index && index !== currentIndex ? -1 : 0),
    }"
    @click="activate"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.r-carousel-item {
  z-index: var(--r-carousel-item-z-index);
  flex: 0 0 100%;
  order: calc(var(--r-carousel-item-block-offset) * -1);
  margin-block-start: calc(var(--r-carousel-gap-size) * var(--r-carousel-item-block-offset));
  margin-inline-start: calc(var(--r-carousel-gap-size) * var(--r-carousel-item-inline-offset));
  background-color: var(--r-common-background-color);
  &:not(.is-active) {
    margin-inline-start: calc(-100% + var(--r-carousel-gap-size) * var(--r-carousel-item-inline-offset));
  }
}
</style>
