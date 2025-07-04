<script lang="ts" setup>
import '../common/style.scss'
import { useMouseInElement, useMousePressed } from '@vueuse/core'
import { Star } from 'lucide'
import type { InputHTMLAttributes } from 'vue'
import { watchEffect } from 'vue'
import { getLengthProperty } from '../common/property'
import { useLocal } from '../common/utils'
import { useName } from '../form/utils'
import RIcon from '../icon/index.vue'
import type { IconNode } from '../icon/utils'

defineOptions({
  name: 'RRate',
})

interface InputProps {
  /** @ignore */
  disabled?: InputHTMLAttributes['disabled'],
  /** @ignore */
  form?: InputHTMLAttributes['form'],
  /** @ignore */
  name?: InputHTMLAttributes['name'],
}

const {
  modelValue = 0,
  name: userName,
  shape = Star,
  ...props
} = defineProps<{
  /** Value of the rate. */
  modelValue?: number,
  /** Shape icon of the rate. */
  shape?: IconNode,
} & InputProps>()

const emit = defineEmits<{
  /** Callback function triggered when the value is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const name = $(useName($$(userName)))

let internalModelValue = $(useLocal({
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
  const gapSize = getLengthProperty(root, '--R-rate-gap-size') ?? 0
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
      :name="name"
      v-bind="props"
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

@property --R-rate-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-rate-control-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-rate-gap-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-rate {
  // Color of the rate control when active.
  --R-rate-color: var(--r-rate-color, var(--r-common-primary-color));
  // Size of the rate control.
  --R-rate-control-size: var(--r-rate-control-size, calc(1em + 4px));
  // Gap size of the rate control.
  --R-rate-gap-size: var(--r-rate-gap-size, 4px);
  display: inline-flex;
  flex-direction: row-reverse;
  gap: var(--R-rate-gap-size);
  cursor: pointer;
  &:has(> .r-rate__input:disabled) {
    cursor: not-allowed;
  }
}
@layer roughness__base {
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
  font-size: var(--R-rate-control-size);
  &.is-filled,
  .r-rate:hover &,
  .r-rate__input:focus-visible + & {
    --R-icon-color: var(--R-rate-color);
  }
}
</style>
