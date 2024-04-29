<script lang="ts" setup>
import '../common/style.scss'
import { vOnClickOutside } from '@vueuse/components'
import { ChevronDown, Loader, X } from 'lucide'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes, SelectHTMLAttributes } from 'vue'
import { provide, reactive } from 'vue'
import RCheckboxGroup from '../checkbox/checkbox-group.vue'
import { labelsInjection } from '../checkbox/utils'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import { sentenceCase, useLocal } from '../common/utils'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
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
  graphicsOptions,
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
} & SelectProps & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when the selected item is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  /** Content of the select dropdown. */
  default?: (props: {}) => any,
}>()

const name = $(useName($$(userName)))

const placeholder = $computed(() => {
  return userPlaceholder ?? (typeof name === 'string' ? sentenceCase(`select-${name}`) : undefined)
})

const defaultModelValue: typeof modelValue = $computed<typeof modelValue>(() => {
  return multiple ? (
    Array.isArray(modelValue) ? modelValue : (modelValue === undefined ? [] : [modelValue])
  ) : (
    Array.isArray(modelValue) ? modelValue[0] : modelValue
  )
})

let internalModelValue = $(useLocal({
  get: () => defaultModelValue,
  set: value => {
    emit('update:modelValue', value)
  },
}))

const labels = reactive(new Map<string, string>())

function labelOf(value: RValueOrKey) {
  const key = keyOf(value)
  return labels.get(key) ?? key
}

const displayText = $computed(() => {
  const text = Array.isArray(internalModelValue)
    ? internalModelValue.map(value => labelOf(value))
    : (internalModelValue !== undefined ? labelOf(internalModelValue) : internalModelValue)
  return Array.isArray(text) ? text.join(', ') : text
})

let input = $ref<HTMLInputElement>()

let state = $ref(false)

function toggle() {
  if (disabled || loading) return
  state = !state
}

function close() {
  state = false
}

function update() {
  if (!multiple) {
    close()
  }
  if (input) {
    input.focus()
  }
}

function clear() {
  internalModelValue = multiple ? [] : undefined
}

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-select-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-select-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--R-select-border-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(rectangle)
}

const {
  timestamp: dropdownTimestamp,
  listener: dropdownListener,
} = $(useTransitionListener('::before'))

function drawDropdown(rc: RoughSVG, svg: SVGSVGElement) {
  void dropdownTimestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-select-dropdown-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-select-dropdown-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke: 'var(--R-select-border-color)',
    strokeWidth,
    strokeLineDash,
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
  })
  svg.appendChild(rectangle)
}

provide(labelsInjection, labels)
</script>

<template>
  <label
    v-on-click-outside.bubble="close"
    :class="['r-select', { 'is-loading': loading, 'is-open': state }]"
    aria-haspopup="menu"
    @transitionrun="listener"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
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
      :graphics-options="graphicsOptions"
      class="r-select__icon r-select__loading-icon"
    />
    <RIcon
      v-else-if="clearable && state"
      :icon="X"
      :graphics-options="graphicsOptions"
      class="r-select__icon"
      role="button"
      @click="clear"
    />
    <RIcon
      v-else
      :icon="ChevronDown"
      :graphics-options="graphicsOptions"
      class="r-select__icon"
    />
    <div
      v-show="state"
      class="r-select__dropdown"
      role="menu"
      @transitionrun="dropdownListener"
    >
      <RGraphics :options="graphicsOptions" @draw="drawDropdown" />
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
    </div>
  </label>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

.r-select {
  // Color of the select control border.
  --R-select-border-color: var(--r-select-border-color, var(--r-common-color));
  // Width of the select control border.
  // @type {<length>}
  --R-select-border-width: var(--r-select-border-width, 1px);
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  // @type {<length>+ | none}
  --R-select-border-dash: var(--r-select-border-dash, none);
  // Width of the select dropdown border.
  // @type {<length>}
  --R-select-dropdown-border-width: var(--r-select-dropdown-border-width, 1px);
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the dropdown border.
  // @type {<length>+ | none}
  --R-select-dropdown-border-dash: var(--r-select-dropdown-border-dash, none);
  // Vertical padding of the select dropdown.
  // @type {<'padding-top'>}
  --R-select-dropdown-padding-block: var(--r-select-dropdown-padding-block, calc(1em - 4px));
  // Horizontal padding of the select dropdown.
  // @type {<'padding-top'>}
  --R-select-dropdown-padding-inline: var(--r-select-dropdown-padding-inline, calc(1em - 4px));
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  inline-size: 210px;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline) calc(var(--r-common-box-padding-inline) - (1em + 4px) / 2);
  &::before {
    @include partials.ghost();
    border-spacing: var(--R-select-border-dash);
    border-top: var(--R-select-border-width) solid;
    transition: border-spacing 1ms, border-top 1ms !important;
  }
  &:has(> .r-select__input:focus) {
    // @default 2px when focused
    --R-select-border-width: var(--r-select-border-width, 2px);
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
  position: absolute;
  inset-block-end: 0;
  inset-inline: 0;
  transform: translateY(100%);
  &::before {
    @include partials.ghost();
    border-spacing: var(--R-select-dropdown-border-dash);
    border-top: var(--R-select-dropdown-border-width) solid;
    transition: border-spacing 1ms, border-top 1ms !important;
  }
}
.r-select__group {
  max-block-size: calc(var(--R-select-dropdown-padding-block) * 2 + var(--r-common-line-height) * 5 + var(--r-space-gap-size) * 4);
  padding-block: var(--R-select-dropdown-padding-block);
  padding-inline: var(--R-select-dropdown-padding-inline);
  overflow: auto;
}
</style>
