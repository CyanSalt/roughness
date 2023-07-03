<script lang="ts" setup generic="T extends boolean = true">
import { provide } from 'vue'
import RSpace from '../space/index.vue'
import type { CheckboxValue } from './utils'
import { modelInjection, multipleInjection } from './utils'

defineOptions({
  name: 'RCheckboxGroup',
})

const {
  modelValue,
  multiple = true,
} = defineProps<{
  modelValue: T extends true ? CheckboxValue[] : CheckboxValue | undefined,
  multiple?: T,
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
</script>

<template>
  <RSpace
    tag="fieldset"
    class="r-checkbox-group"
    :role="multiple ? undefined : 'radiogroup'"
  >
    <slot></slot>
  </RSpace>
</template>

<style lang="scss" scoped>
.r-checkbox-group {
  border: none;
}
</style>
