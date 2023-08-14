<script lang="ts" setup>
import '../common/style.scss'
import { provide } from 'vue'
import RSpace from '../space/index.vue'
import type { CheckboxValue } from './utils'
import { disabledInjection, modelInjection, multipleInjection } from './utils'

defineOptions({
  name: 'RCheckboxGroup',
})

const {
  disabled = false,
  modelValue,
  multiple = true,
} = defineProps<{
  disabled?: boolean,
  modelValue: CheckboxValue[] | CheckboxValue | undefined,
  multiple?: boolean,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const model = $computed({
  get: () => {
    return multiple ? (
      Array.isArray(modelValue) ? modelValue : (modelValue === undefined ? [] : [modelValue])
    ) : (
      Array.isArray(modelValue) ? modelValue[0] : modelValue
    )
  },
  set: value => {
    emit('update:modelValue', value)
  },
})

provide(multipleInjection, $$(multiple))
provide(modelInjection, $$(model))
provide(disabledInjection, $$(disabled))
</script>

<template>
  <RSpace
    tag="fieldset"
    class="r-checkbox-group"
  >
    <slot></slot>
  </RSpace>
</template>

<style lang="scss">
@use '../common/_reset';

@layer base {
  .r-checkbox-group {
    @include reset.fieldset;
  }
}
</style>
