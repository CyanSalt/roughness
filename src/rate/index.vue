<script lang="ts" setup>
import '../common/style.scss'
import { useMouseInElement, useMousePressed } from '@vueuse/core'
import { Star } from 'lucide'
import { watchEffect } from 'vue'
import { getLengthProperty } from '../common/property'
import { effectRef } from '../common/utils'
import type { IconNode } from '../compositions'
import RIcon from '../icon/index.vue'

defineOptions({
  name: 'RRate',
})

const {
  disabled = false,
  modelValue = 0,
  shape = Star,
} = defineProps<{
  disabled?: boolean,
  /** Value of the rate */
  modelValue?: number,
  /** Shape icon of the rate */
  shape?: IconNode,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

let internalModelValue = $(effectRef({
  get: () => modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
}))

let root = $ref<HTMLLabelElement>()
let input = $ref<HTMLInputElement>()

const { pressed } = $(useMousePressed({ target: $$(root) }))
const { elementX, isOutside } = $(useMouseInElement($$(root)))

const targetModelValue: number = $computed(() => {
  if (!root || isOutside) return 0
  const controlSize = root.clientHeight
  const gapSize = getLengthProperty(root, '--r-rate-gap-size') ?? 0
  return Math.ceil(elementX / (controlSize + gapSize))
})

const filledCount = $computed(() => targetModelValue || internalModelValue)

watchEffect(() => {
  if (!pressed || !targetModelValue) return
  internalModelValue = targetModelValue
  if (input) {
    input.focus()
  }
})
</script>

<template>
  <label ref="root" class="r-rate">
    <input
      ref="input"
      v-model.number="internalModelValue"
      :disabled="disabled"
      type="range"
      min="1"
      max="5"
      class="r-rate__input"
    >
    <RIcon
      v-for="n in 5"
      :key="n"
      :icon="shape"
      :filled="n > 5 - filledCount"
      class="r-rate__shape"
    />
  </label>
</template>

<style lang="scss">
@use '../common/_reset';

.r-rate {
  --r-rate-color: var(--r-common-primary-color);
  --r-rate-control-size: calc(var(--r-common-font-size) + 4px);
  --r-rate-gap-size: 4px;
  display: inline-flex;
  flex-direction: row-reverse;
  gap: var(--r-rate-gap-size);
  cursor: pointer;
  &:has(> .r-rate__input:disabled) {
    cursor: not-allowed;
  }
}
@layer base {
  .r-rate__input {
    @include reset.input-range;
  }
}
.r-rate__input {
  position: absolute;
  block-size: 0;
  inline-size: 0;
  opacity: 0;
}
.r-rate__shape {
  font-size: var(--r-rate-control-size);
  &.is-filled,
  .r-rate:hover &,
  .r-rate:focus-within & {
    --r-icon-color: var(--r-rate-color);
  }
}
</style>
