<script lang="ts" setup>
import '../common/style.scss'
import { useCurrentElement } from '@vueuse/core'
import { colord } from 'colord'
import type { InputHTMLAttributes } from 'vue'
import { computed } from 'vue'
import RBox from '../box/index.vue'
import { getProperty, useTransitionListener } from '../common/property'
import { isTruthyBooleanish, useLocal } from '../common/utils'
import { useName } from '../form/utils'
import RLoading from '../loading/index.vue'

defineOptions({
  name: 'RColorPicker',
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
  disabled: userDisabled,
  loading = false,
  modelValue,
  name: userName,
  ...props
} = defineProps<{
  /**
   * Whether the color picker is loading.
   * It will be non-interactive in loading state.
   */
  loading?: boolean,
  /** Value of the color picker. */
  modelValue?: string,
} & InputProps>()

const emit = defineEmits<{
  /** Callback function triggered when the color is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const name = useName(() => userName)

const internalModelValue = useLocal({
  get: () => modelValue || '#000000',
  set: value => {
    emit('update:modelValue', value)
  },
})

const disabled = computed(() => {
  return isTruthyBooleanish(userDisabled) || loading
})

const root = useCurrentElement<HTMLElement | null>()

const { timestamp, listener } = useTransitionListener('::before')

let color = computed(() => {
  if (!root.value) return undefined
  void timestamp.value
  let defaultColor = colord(getProperty(root.value, '--r-common-color'))
  const currentColor = colord(internalModelValue.value)
  return currentColor
    .lighten((defaultColor.toHsl().l - currentColor.toHsl().l) / 100)
    .toHex()
})

const style = computed(() => {
  return {
    '--R-color-picker-current-color': internalModelValue.value,
    '--R-color-picker-color': `var(--r-color-picker-color, ${color.value})`,
  }
})
</script>

<template>
  <RBox
    as="label"
    filled
    :class="['r-color-picker', { 'is-loading': loading }]"
    :style="style"
    @transitionrun="listener"
  >
    <input
      v-model="internalModelValue"
      :disabled="disabled"
      :name="name"
      v-bind="props"
      type="color"
      class="r-color-picker__input"
    >
    <slot>{{ internalModelValue }}</slot>
    <RLoading v-if="loading" class="r-button__loading" />
  </RBox>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-color-picker-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-color-picker-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-color-picker-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

.r-color-picker {
  // Color of the color picker text and border.
  // @default var(--r-common-color) in adjusting hue and saturation to be the same as the value if set
  --R-color-picker-color: var(--r-color-picker-color, var(--r-common-color));
  // Width of the color picker border.
  --R-color-picker-border-width: var(--r-color-picker-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-color-picker-border-dash: var(--r-color-picker-border-dash, none);
  // Box styles
  --r-box-border-color: var(--R-color-picker-color);
  --r-box-border-width: var(--R-color-picker-border-width);
  --r-box-border-dash: var(--R-color-picker-border-dash);
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-color-picker-color);
  &::before {
    @include partials.transition-runner((
      --r-common-color: background-color,
    ));
  }
  &:hover:not(.is-loading) {
    // @default 8px when hovered
    --R-color-picker-border-dash: var(--r-color-picker-border-dash, var(--r-common-stroke-dash));
  }
  &:focus-visible, &:active {
    // @default 2px when focused or active
    --R-color-picker-border-width: var(--r-color-picker-border-width, var(--r-common-emphasized-stroke-width));
  }
  &:not(.is-loading) {
    cursor: pointer;
  }
  &:disabled:not(.is-loading) {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &:not(:disabled) {
    text-shadow: var(--r-common-stroke-text-shadow);
  }
}
.r-color-picker__input {
  position: absolute;
  block-size: 0;
  inline-size: 0;
  opacity: 0;
}
</style>
