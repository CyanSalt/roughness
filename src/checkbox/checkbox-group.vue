<script lang="ts" setup generic="T extends boolean = true">
import type { HTMLAttributes } from 'vue'
import { provide } from 'vue'
import type { CheckboxValue } from './utils'
import { modelInjection, multipleInjection } from './utils'

defineOptions({
  name: 'RCheckboxGroup',
})

const {
  modelValue,
  multiple = true,
  vertical = false,
} = defineProps<{
  modelValue: T extends true ? CheckboxValue[] : CheckboxValue | undefined,
  multiple?: T,
  vertical?: boolean,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const model = $computed({
  get: () => modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
})

provide(multipleInjection, $$(multiple))
provide(modelInjection, $$(model))

const style = $computed<HTMLAttributes['style']>(() => {
  return {
    'flex-direction': vertical ? 'column' : undefined,
  }
})
</script>

<template>
  <div class="r-checkbox-group" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.r-checkbox-group {
  --r-checkbox-group-gap-size: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-checkbox-group-gap-size);
}
</style>
