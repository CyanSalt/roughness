<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { DirectiveBinding, InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { toRef, watch, watchEffect } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize, measureSVGSize, measureSVGSizeAsArray } from '../graphics/utils'

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
  name?: InputHTMLAttributes['name'],
  pattern?: InputHTMLAttributes['pattern'],
  placeholder?: InputHTMLAttributes['placeholder'],
  readonly?: InputHTMLAttributes['readonly'],
  required?: InputHTMLAttributes['required'],
  size?: InputHTMLAttributes['size'],
  src?: InputHTMLAttributes['src'],
  step?: InputHTMLAttributes['step'],
  type?: InputHTMLAttributes['type'],
  value?: InputHTMLAttributes['value'],
  width?: InputHTMLAttributes['width'],
}

defineOptions({
  name: 'RInput',
})

const {
  lines = 1,
  modelValue,
  modelModifiers = (() => ({})) as never,
  type,
  reactions = (() => ['hover', 'focus', 'active']) as never,
  graphicsOptions,
  ...props
} = defineProps<{
  lines?: number,
  modelValue?: string | number,
  modelModifiers?: DirectiveBinding['modifiers'],
  type?: string,
} & InputProps & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const modelValueText: string | undefined = $computed(() => {
  return typeof modelValue === 'number' ? String(modelValue) : modelValue
})

// eslint-disable-next-line vue/no-ref-object-destructure
let internalModelValue = $ref(modelValueText)

watchEffect(() => {
  internalModelValue = modelValueText
})

watch($$(internalModelValue), currentValue => {
  const value = currentValue !== undefined && modelModifiers.number
    ? Number(currentValue)
    : currentValue
  emit('update:modelValue', value)
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-input-border-width') ?? 0
  const strokeLineDash = measureSVGSizeAsArray(svg, '--r-input-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  if (lines > 1) {
    const lineHeight = measureSVGSize(svg, 'line-height') ?? 0
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
      v-bind="(props as TextareaHTMLAttributes)"
      class="r-input__input"
    ></textarea>
    <input
      v-else
      v-model="internalModelValue"
      :type="modelModifiers.number ? 'number' : type"
      v-bind="props"
      class="r-input__input"
    >
  </label>
</template>

<style lang="scss" scoped>
.r-input {
  --r-input-border-color: var(--r-common-text-color);
  --r-input-border-width: 1px;
  --r-input-border-dash: none;
  --r-input-line-height: calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height));
  display: inline-flex;
  width: 210px;
  &:has(> .r-input__input:hover:not(:read-only, :disabled)) {
    --r-input-border-dash: 8px;
  }
  &:has(> .r-input__input:focus),
  &:active {
    --r-input-border-width: 2px;
  }
  :deep(> .r-graphics) {
    line-height: var(--r-input-line-height);
  }
  &.is-multiline {
    display: flex;
    width: auto;
  }
}
.r-input__input {
  appearance: none;
  width: 100%;
  padding-inline: var(--r-common-box-padding-inline);
  border: none;
  color: var(--r-common-text-color);
  line-height: var(--r-input-line-height);
  background-color: transparent;
  text-decoration-thickness: calc(var(--r-input-border-width) + 1px);
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &::placeholder {
    color: var(--r-common-comment-color);
  }
}
textarea.r-input__input {
  height: calc(var(--r-input-lines) * var(--r-input-line-height));
  background: none;
  resize: none;
}
</style>
