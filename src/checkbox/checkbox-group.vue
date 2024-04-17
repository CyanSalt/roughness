<script lang="ts" setup>
import '../common/style.scss'
import { provide } from 'vue'
import type { RValueOrKey } from '../common/key'
import { useModel } from '../common/utils'
import RSpace from '../space/index.vue'
import { disabledInjection, modelInjection, multipleInjection } from './utils'

defineOptions({
  name: 'RCheckboxGroup',
})

const {
  disabled = false,
  modelValue,
  multiple = true,
} = defineProps<{
  /** Whether to disable all checking items. */
  disabled?: boolean,
  /** Key(s) or data of the checked item(s) of the group. */
  modelValue?: RValueOrKey[] | RValueOrKey | undefined,
  /** Whether to support checking multiple items. */
  multiple?: boolean,
}>()

const emit = defineEmits<{
  /** Callback function triggered when the checked items are changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  /** Content of the checkbox group. */
  default?: (props: {}) => any,
}>()

const model = $(useModel({
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
}))

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
