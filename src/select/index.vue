<script lang="ts" setup>
import '../common/style.scss'
import { vOnClickOutside } from '@vueuse/components'
import { ChevronDown, Loader, X } from 'lucide'
import type { InputHTMLAttributes, SelectHTMLAttributes } from 'vue'
import { computed, provide, reactive, ref, useTemplateRef } from 'vue'
import RBox from '../box/index.vue'
import RCheckboxGroup from '../checkbox/checkbox-group.vue'
import { labelsInjection } from '../checkbox/utils'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { isTruthyBooleanish, sentenceCase, useLocal } from '../common/utils'
import { useFormItem } from '../form/utils'
import { useGraphicsConfig } from '../graphics/utils'
import RIcon from '../icon/index.vue'

defineOptions({
  name: 'RSelect',
})

interface SelectProps {
  /** @ignore */
  autocomplete?: SelectHTMLAttributes['autocomplete'] & InputHTMLAttributes['autocomplete'],
  /** @ignore */
  autofocus?: SelectHTMLAttributes['autofocus'] & InputHTMLAttributes['autofocus'],
  /** @ignore */
  disabled?: SelectHTMLAttributes['disabled'] & InputHTMLAttributes['disabled'],
  /** @ignore */
  form?: SelectHTMLAttributes['form'] & InputHTMLAttributes['form'],
  /** @ignore */
  multiple?: SelectHTMLAttributes['multiple'] & InputHTMLAttributes['multiple'],
  /** @ignore */
  name?: SelectHTMLAttributes['name'] & InputHTMLAttributes['name'],
  /** @ignore */
  placeholder?: SelectHTMLAttributes['placeholder'],
  /** @ignore */
  required?: SelectHTMLAttributes['required'] & InputHTMLAttributes['required'],
  /** @ignore */
  size?: SelectHTMLAttributes['size'] & InputHTMLAttributes['size'],
}

const {
  clearable = false,
  disabled = false,
  loading = false,
  modelValue,
  multiple = false,
  name: userName,
  placeholder: userPlaceholder,
  ...props
} = defineProps<{
  /** Whether the select is clearable. */
  clearable?: boolean,
  /**
   * Whether the select is loading.
   * It will be non-interactive in loading state.
   */
  loading?: boolean,
  /** Key(s) or data of the selected item(s). */
  modelValue?: RValueOrKey[] | RValueOrKey | undefined,
  /** Whether to support selecting multiple items. */
  multiple?: boolean,
} & SelectProps>()

const emit = defineEmits<{
  /** Callback function triggered when the selected item is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  /** Content of the select dropdown. */
  default?: (props: {}) => any,
}>()

const { name, required } = useFormItem(() => userName)

const placeholder = computed(() => {
  return userPlaceholder ?? (typeof name.value === 'string' ? sentenceCase(`select-${name.value}`) : undefined)
})

const defaultModelValue = computed<typeof modelValue>(() => {
  return multiple ? (
    Array.isArray(modelValue) ? modelValue : (modelValue === undefined ? [] : [modelValue])
  ) : (
    Array.isArray(modelValue) ? modelValue[0] : modelValue
  )
})

const internalModelValue = useLocal({
  get: () => defaultModelValue.value,
  set: value => {
    emit('update:modelValue', value)
  },
})

const labels = reactive(new Map<string, string>())

function labelOf(value: RValueOrKey) {
  const key = keyOf(value)
  return labels.get(key) ?? key
}

const displayText = computed(() => {
  const text = Array.isArray(internalModelValue.value)
    ? internalModelValue.value.map(value => labelOf(value))
    : (internalModelValue.value !== undefined ? labelOf(internalModelValue.value) : internalModelValue.value)
  return Array.isArray(text) ? text.join(', ') : text
})

const input = useTemplateRef<HTMLInputElement>('input')

const state = ref(false)

function toggle() {
  if (isTruthyBooleanish(disabled) || loading) return
  state.value = !state.value
}

function close() {
  state.value = false
}

function update() {
  if (!multiple) {
    close()
  }
  if (input.value) {
    input.value.focus()
  }
}

function clear() {
  internalModelValue.value = multiple ? [] : undefined
}

useGraphicsConfig({
  include: ['select.dropdown'],
  options: {
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
  },
})

provide(labelsInjection, labels)
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "select",
      "description": "Box of the select control."
    },
    {
      "name": "select.icon",
      "description": "Icon of the select, including dropdown icon, loading icon and clear icon."
    },
    {
      "name": "select.dropdown",
      "description": "Box of the select dropdown menu."
    }
  ]
}
</defs>

<template>
  <RBox
    v-on-click-outside.bubble="close"
    tag="label"
    graphics-selector="select"
    :class="['r-select', { 'is-loading': loading, 'is-open': state }]"
    role="combobox"
    aria-haspopup="menu"
    :aria-expanded="state"
    :aria-required="required"
    :aria-busy="loading"
  >
    <input
      ref="input"
      :value="displayText"
      :disabled="disabled"
      readonly
      :name="name"
      :placeholder="placeholder"
      v-bind="props"
      class="r-select__input"
      @click="toggle"
      @keydown.enter="toggle"
      @keydown.escape="close"
    >
    <RIcon
      v-if="loading"
      :icon="Loader"
      graphics-selector="select.icon"
      class="r-select__icon r-select__loading-icon"
    />
    <RIcon
      v-else-if="clearable && state"
      :icon="X"
      graphics-selector="select.icon"
      class="r-select__icon"
      role="button"
      @click="clear"
    />
    <RIcon
      v-else
      :icon="ChevronDown"
      graphics-selector="select.icon"
      class="r-select__icon"
    />
    <RBox
      v-show="state"
      tag="div"
      graphics-selector="select.dropdown"
      class="r-select__dropdown"
      role="menu"
    >
      <RCheckboxGroup
        v-model="internalModelValue"
        :multiple="multiple"
        vertical
        :wrap="false"
        class="r-select__group"
        @update:model-value="update"
      >
        <slot></slot>
      </RCheckboxGroup>
    </RBox>
  </RBox>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-select-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-select-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-select-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

@property --R-select-dropdown-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-select-dropdown-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

@property --R-select-dropdown-padding-block {
  syntax: '<length-percentage>+';
  inherits: true;
  initial-value: 0px;
}

@property --R-select-dropdown-padding-inline {
  syntax: '<length-percentage>+';
  inherits: true;
  initial-value: 0px;
}

.r-select {
  // Color of the select control border.
  --R-select-border-color: var(--r-select-border-color, var(--r-common-color));
  // Width of the select control border.
  --R-select-border-width: var(--r-select-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-select-border-dash: var(--r-select-border-dash, none);
  // Width of the select dropdown border.
  --R-select-dropdown-border-width: var(--r-select-dropdown-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the dropdown border.
  --R-select-dropdown-border-dash: var(--r-select-dropdown-border-dash, none);
  // Vertical padding of the select dropdown.
  --R-select-dropdown-padding-block: var(--r-select-dropdown-padding-block, calc(1em - 4px));
  // Horizontal padding of the select dropdown.
  --R-select-dropdown-padding-inline: var(--r-select-dropdown-padding-inline, calc(1em - 4px));
  // Box styles
  --r-box-border-color: var(--R-select-border-color);
  --r-box-border-width: var(--R-select-border-width);
  --r-box-border-dash: var(--R-select-border-dash);
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  inline-size: 210px;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline) calc(var(--r-common-box-padding-inline) - (1em + 4px) / 2);
  &:has(> .r-select__input:focus-visible) {
    // @default 2px when focused
    --R-select-border-width: var(--r-select-border-width, var(--r-common-emphasized-stroke-width));
  }
  &:not(.is-loading) {
    cursor: pointer;
  }
  &:has(.r-select__input:disabled) {
    cursor: not-allowed;
  }
  &.is-open {
    z-index: var(--r-common-overlay-z-index);
  }
}
.r-select__icon {
  --R-icon-stroke-width: var(--R-select-border-width);
  --r-element-font-size: calc(1em + 4px);
  flex: none;
  margin-inline-start: calc(var(--r-common-box-padding-inline) - (1em + 4px) / 2 - 4px);
  &.r-select__loading-icon {
    @include partials.loading-spinner();
  }
}
@layer roughness__base {
  .r-select__input {
    @include reset.input;
  }
}
.r-select__input {
  inline-size: 100%;
  color: var(--r-common-color);
  cursor: inherit;
  &:disabled {
    opacity: 0.8;
    text-decoration-line: line-through;
  }
  &::placeholder {
    color: var(--r-common-placeholder-color);
  }
}
.r-select__dropdown {
  // Box styles
  --r-box-border-color: var(--R-select-border-color);
  --r-box-border-width: var(--R-select-dropdown-border-width);
  --r-box-border-dash: var(--R-select-dropdown-border-dash);
  position: absolute;
  inset-block-end: 0;
  inset-inline: 0;
  transform: translateY(100%);
}
.r-select__group {
  max-block-size: calc(var(--R-select-dropdown-padding-block) * 2 + var(--r-common-line-height) * 5 + var(--r-space-gap-size) * 4);
  padding-block: var(--R-select-dropdown-padding-block);
  padding-inline: var(--R-select-dropdown-padding-inline);
  overflow: auto;
}
</style>
