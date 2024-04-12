<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { DirectiveBinding, InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { inject, ref } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import { effectRef, sentenceCase } from '../common/utils'
import { nameInjection } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

interface InputProps {
  accept?: InputHTMLAttributes['accept'],
  alt?: InputHTMLAttributes['alt'],
  autocomplete?: InputHTMLAttributes['autocomplete'],
  autofocus?: InputHTMLAttributes['autofocus'],
  capture?: InputHTMLAttributes['capture'],
  checked?: InputHTMLAttributes['checked'],
  crossorigin?: InputHTMLAttributes['crossorigin'],
  disabled?: InputHTMLAttributes['disabled'],
  form?: InputHTMLAttributes['form'],
  formaction?: InputHTMLAttributes['formaction'],
  formenctype?: InputHTMLAttributes['formenctype'],
  formmethod?: InputHTMLAttributes['formmethod'],
  formnovalidate?: InputHTMLAttributes['formnovalidate'],
  formtarget?: InputHTMLAttributes['formtarget'],
  height?: InputHTMLAttributes['height'],
  indeterminate?: InputHTMLAttributes['indeterminate'],
  list?: InputHTMLAttributes['list'],
  max?: InputHTMLAttributes['max'],
  maxlength?: InputHTMLAttributes['maxlength'],
  min?: InputHTMLAttributes['min'],
  minlength?: InputHTMLAttributes['minlength'],
  multiple?: InputHTMLAttributes['multiple'],
  pattern?: InputHTMLAttributes['pattern'],
  readonly?: InputHTMLAttributes['readonly'],
  required?: InputHTMLAttributes['required'],
  size?: InputHTMLAttributes['size'],
  src?: InputHTMLAttributes['src'],
  step?: InputHTMLAttributes['step'],
  width?: InputHTMLAttributes['width'],
}

defineOptions({
  name: 'RInput',
})

const {
  lines = 1,
  modelValue,
  modelModifiers = (() => ({})) as never,
  name: userName,
  placeholder: userPlaceholder,
  type,
  graphicsOptions,
  ...props
} = defineProps<{
  /**
   * Line count of the input
   * @default 1
   */
  lines?: number,
  /** Value of the input text */
  modelValue?: string | number,
  modelModifiers?: DirectiveBinding['modifiers'],
  name?: InputHTMLAttributes['name'],
  placeholder?: InputHTMLAttributes['placeholder'],
  type?: InputHTMLAttributes['type'],
} & InputProps & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const formItemName = $(inject(nameInjection, ref()))

const name = $computed(() => {
  return userName ?? formItemName
})

const placeholder = $computed(() => {
  return userPlaceholder ?? (typeof name === 'string' ? sentenceCase(`enter-${name}`) : undefined)
})

let internalModelValue = $(effectRef({
  get: () => {
    return typeof modelValue === 'number' ? String(modelValue) : modelValue
  },
  set: value => {
    const currentValue = value !== undefined && modelModifiers.number
      ? Number(value)
      : value
    emit('update:modelValue', currentValue)
  },
}))

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-input-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--r-input-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  if (lines > 1) {
    const lineHeight = getLengthProperty(svg, 'line-height') ?? 0
    for (let offset = lineHeight - padding; offset < height; offset += lineHeight) {
      const line = rc.line(padding, offset, width - padding, offset, {
        stroke: 'var(--r-input-border-color)',
        strokeWidth,
        strokeLineDash,
      })
      svg.appendChild(line)
    }
  } else {
    const line = rc.line(padding, height - padding, width - padding, height - padding, {
      stroke: 'var(--r-input-border-color)',
      strokeWidth,
      strokeLineDash,
    })
    svg.appendChild(line)
  }
}
</script>

<template>
  <label
    :class="['r-input', { 'is-multiline': lines > 1 }]"
    :style="{ '--r-input-lines': lines > 1 ? lines : undefined }"
    @transitionrun="listener"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <textarea
      v-if="lines > 1"
      v-model="internalModelValue"
      :name="name"
      :placeholder="placeholder"
      v-bind="(props as TextareaHTMLAttributes)"
      class="r-input__input"
    ></textarea>
    <input
      v-else
      v-model="internalModelValue"
      :type="modelModifiers.number ? 'number' : type"
      :name="name"
      :placeholder="placeholder"
      v-bind="props"
      class="r-input__input"
    >
  </label>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

.r-input {
  --r-input-border-color: var(--r-common-color);
  --r-input-border-width: 1px;
  --r-input-border-dash: none;
  --r-element-line-height: calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height));
  display: inline-flex;
  inline-size: 210px;
  &::before {
    @include partials.ghost();
    border-spacing: var(--r-input-border-dash);
    border-top: var(--r-input-border-width) solid;
    transition: border-spacing 1ms, border-top 1ms, line-height 1ms !important;
  }
  &:has(> .r-input__input:hover:not(:read-only, :disabled)) {
    --r-input-border-dash: 8px;
  }
  &:has(> .r-input__input:focus),
  &:active {
    --r-input-border-width: 2px;
  }
  &.is-multiline {
    display: flex;
    inline-size: auto;
  }
}
@layer base {
  .r-input__input {
    @include reset.input;
  }
  textarea.r-input__input {
    @include reset.textarea;
  }
}
.r-input__input {
  inline-size: 100%;
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--r-common-color);
  text-decoration-thickness: calc(var(--r-input-border-width) + 1px);
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &::placeholder {
    color: var(--r-common-placeholder-color);
  }
}
textarea.r-input__input {
  height: calc(var(--r-input-lines) * var(--r-element-line-height));
}
</style>
