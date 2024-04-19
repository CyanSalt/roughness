<script lang="ts" setup>
import '../common/style.scss'
import { startCase } from 'lodash-es'
import { Asterisk } from 'lucide'
import { inject, provide, ref } from 'vue'
import RIcon from '../icon/index.vue'
import RSpace from '../space/index.vue'
import { labelInlineInjection, nameInjection } from './utils'

defineOptions({
  name: 'RFormItem',
})

const {
  labelInline: userLabelInline = undefined,
  name,
  required = false,
} = defineProps<{
  /** Whether the label of the form item is displayed as an inline box. */
  labelInline?: boolean,
  /** Field name of the form model. */
  name?: string,
  /** Whether the field is required. */
  required?: boolean,
}>()

defineSlots<{
  /** Label of the form item. */
  label?: (props: {}) => any,
  /** Content of the form item. */
  default?: (props: {}) => any,
  /** Footnote of the form item. */
  message?: (props: {}) => any,
}>()

const label = $computed(() => {
  return typeof name === 'string' ? startCase(name) : undefined
})

const formLabelInline = $(inject(labelInlineInjection, ref()))

const labelInline = $computed(() => {
  return userLabelInline ?? formLabelInline ?? true
})

provide(nameInjection, $$(name))
</script>

<template>
  <RSpace
    :vertical="!labelInline"
    align="start"
    :wrap="false"
    :class="['r-form-item', { 'is-label-inline': labelInline }]"
    role="group"
  >
    <label class="r-form-item__label">
      <RIcon
        v-if="required"
        :icon="Asterisk"
        type="error"
        class="r-form-item__required-marker"
      />
      <slot name="label">{{ label }}</slot>
    </label>
    <RSpace vertical :wrap="false" class="r-form-item__container">
      <RSpace vertical justify="center" class="r-form-item__content">
        <slot></slot>
      </RSpace>
      <slot name="message"></slot>
    </RSpace>
  </RSpace>
</template>

<style lang="scss">
.r-form-item__label {
  // Size of the label when `label-inline` is `true`.
  // @type {<length>}
  --R-form-item-label-inline-size: var(--r-form-item-label-inline-size, 105px);
  position: relative;
  box-sizing: border-box;
  padding-block-start: var(--r-common-box-padding-block);
  padding-inline-end: var(--r-common-box-padding-inline);
  .r-form-item.is-label-inline > & {
    inline-size: var(--R-form-item-label-inline-size);
    padding-block-end: var(--r-common-box-padding-block);
    text-align: end;
  }
}
.r-form-item__required-marker {
  position: absolute;
  inset-block-start: calc(var(--r-common-box-padding-block) + var(--r-common-line-height) / 2);
  inset-inline-end: calc(var(--r-common-box-padding-inline) / 2);
  display: inline-block;
  transform: translate(50%, -50%);
}
.r-form-item__content {
  min-block-size: calc(var(--r-common-line-height) + var(--r-common-box-padding-block) * 2);
}
</style>
