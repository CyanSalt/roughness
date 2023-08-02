<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { DirectiveBinding, InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { inject, ref, watch, watchEffect } from 'vue'
import { sentenceCase, useReactionState } from '../common/utils'
import { nameInjection } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getLengthProperty, getLengthPropertyAsArray, getSVGSize } from '../graphics/utils'

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
  reactions = (() => ['hover', 'focus', 'active']) as never,
  graphicsOptions,
  ...props
} = defineProps<{
  lines?: number,
  modelValue?: string | number,
  modelModifiers?: DirectiveBinding['modifiers'],
  name?: string,
  placeholder?: string,
  type?: string,
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

const modelValueText: string | undefined = $computed(() => {
  return typeof modelValue === 'number' ? String(modelValue) : modelValue
})

// eslint-disable-next-line vue/no-ref-object-destructure
let internalModelValue = $ref(modelValueText)

watchEffect(() => {
  internalModelValue = modelValueText
}, { flush: 'post' })

watch($$(internalModelValue), currentValue => {
  const value = currentValue !== undefined && modelModifiers.number
    ? Number(currentValue)
    : currentValue
  emit('update:modelValue', value)
})

const getReactionState = useReactionState(() => reactions)

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
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

<style lang="scss" scoped>
@use '../common/_reset';

.r-input {
  --r-input-border-color: var(--r-common-text-color);
  --r-input-border-width: 1px;
  --r-input-border-dash: none;
  --r-element-line-height: calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height));
  display: inline-flex;
  width: 210px;
  &:has(> .r-input__input:hover:not(:read-only, :disabled)) {
    --r-input-border-dash: 8px;
  }
  &:has(> .r-input__input:focus),
  &:active {
    --r-input-border-width: 2px;
  }
  &.is-multiline {
    display: flex;
    width: auto;
  }
}
:where(.r-input__input) {
  @include reset.input;
}
:where(textarea.r-input__input) {
  @include reset.textarea;
}
.r-input__input {
  width: 100%;
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--r-common-text-color);
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
