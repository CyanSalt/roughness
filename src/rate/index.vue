<script lang="ts" setup>
import '../common/style.scss'
import { useMouseInElement, useMousePressed } from '@vueuse/core'
import { Star } from 'lucide'
import type { InputHTMLAttributes } from 'vue'
import { computed, useTemplateRef, watchEffect } from 'vue'
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

const name = useName(() => userName)

const internalModelValue = useLocal({
  get: () => modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
})

const root = useTemplateRef<HTMLLabelElement>('root')
const input = useTemplateRef<HTMLInputElement>('input')

const { pressed } = useMousePressed({ target: root })
const { elementX, isOutside } = useMouseInElement(root)

const targetModelValue = computed(() => {
  if (!root.value || isOutside.value) return 0
  const controlSize = root.value.clientHeight
  const gapSize = getLengthProperty(root.value, '--R-rate-gap-size') ?? 0
  return Math.ceil(elementX.value / (controlSize + gapSize))
})

const filledCount = computed(() => targetModelValue.value || internalModelValue.value)

watchEffect(() => {
  if (!pressed.value || !targetModelValue.value) return
  internalModelValue.value = targetModelValue.value
  if (input.value) {
    input.value.focus()
  }
})
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "rate.shape",
      "description": "Icon of the rate shape."
    }
  ]
}
</defs>

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
      graphics-selector="rate.shape"
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
