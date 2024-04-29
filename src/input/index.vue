<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import { sentenceCase, useLocal } from '../common/utils'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RInput',
})

interface InputProps {
  /** @ignore */
  accept?: InputHTMLAttributes['accept'],
  /** @ignore */
  alt?: InputHTMLAttributes['alt'],
  /** @ignore */
  autocomplete?: InputHTMLAttributes['autocomplete'],
  /** @ignore */
  autofocus?: InputHTMLAttributes['autofocus'],
  /** @ignore */
  capture?: InputHTMLAttributes['capture'],
  /** @ignore */
  checked?: InputHTMLAttributes['checked'],
  /** @ignore */
  crossorigin?: InputHTMLAttributes['crossorigin'],
  /** @ignore */
  disabled?: InputHTMLAttributes['disabled'],
  /** @ignore */
  enterkeyhint?: InputHTMLAttributes['enterKeyHint'],
  /** @ignore */
  form?: InputHTMLAttributes['form'],
  /** @ignore */
  formaction?: InputHTMLAttributes['formaction'],
  /** @ignore */
  formenctype?: InputHTMLAttributes['formenctype'],
  /** @ignore */
  formmethod?: InputHTMLAttributes['formmethod'],
  /** @ignore */
  formnovalidate?: InputHTMLAttributes['formnovalidate'],
  /** @ignore */
  formtarget?: InputHTMLAttributes['formtarget'],
  /** @ignore */
  height?: InputHTMLAttributes['height'],
  /** @ignore */
  indeterminate?: InputHTMLAttributes['indeterminate'],
  /** @ignore */
  list?: InputHTMLAttributes['list'],
  /** @ignore */
  max?: InputHTMLAttributes['max'],
  /** @ignore */
  maxlength?: InputHTMLAttributes['maxlength'],
  /** @ignore */
  min?: InputHTMLAttributes['min'],
  /** @ignore */
  minlength?: InputHTMLAttributes['minlength'],
  /** @ignore */
  multiple?: InputHTMLAttributes['multiple'],
  /** @ignore */
  name?: InputHTMLAttributes['name'],
  /** @ignore */
  pattern?: InputHTMLAttributes['pattern'],
  /** @ignore */
  placeholder?: InputHTMLAttributes['placeholder'],
  /** @ignore */
  readonly?: InputHTMLAttributes['readonly'],
  /** @ignore */
  required?: InputHTMLAttributes['required'],
  /** @ignore */
  size?: InputHTMLAttributes['size'],
  /** @ignore */
  src?: InputHTMLAttributes['src'],
  /** @ignore */
  step?: InputHTMLAttributes['step'],
  /** @ignore */
  type?: InputHTMLAttributes['type'],
  /** @ignore */
  width?: InputHTMLAttributes['width'],
}

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
   * Line count of the input.
   * @default 1
   */
  lines?: number,
  /** Value of the input text. */
  modelValue?: string | number,
  /**
   * Modifiers for `v-model` directive.
   * See [Handling `v-model` modifiers]{@link https://vuejs.org/guide/components/v-model.html#handling-v-model-modifiers}.
   */
  modelModifiers?: { number?: boolean },
} & InputProps & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when the value is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const name = $(useName($$(userName)))

const placeholder = $computed(() => {
  return userPlaceholder ?? (typeof name === 'string' ? sentenceCase(`enter-${name}`) : undefined)
})

let internalModelValue = $(useLocal({
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
  const strokeWidth = getLengthProperty(svg, '--R-input-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-input-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  if (lines > 1) {
    const lineHeight = getLengthProperty(svg, 'line-height') ?? 0
    for (let offset = lineHeight - padding; offset < height; offset += lineHeight) {
      const line = rc.line(padding, offset, width - padding, offset, {
        stroke: 'var(--R-input-border-color)',
        strokeWidth,
        strokeLineDash,
      })
      svg.appendChild(line)
    }
  } else {
    const line = rc.line(padding, height - padding, width - padding, height - padding, {
      stroke: 'var(--R-input-border-color)',
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
    :style="{ '--R-input-lines': lines > 1 ? lines : undefined }"
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
  // Color of the input border.
  --R-input-border-color: var(--r-input-border-color, var(--r-common-color));
  // Width of the input border.
  // @type {<length>}
  --R-input-border-width: var(--r-input-border-width, 1px);
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  // @type {<length>+ | none}
  --R-input-border-dash: var(--r-input-border-dash, none);
  // Size of the input.
  // @type {<length>}
  --R-input-inline-size: var(--r-input-inline-size, 210px);
  --r-element-line-height: calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height));
  display: inline-flex;
  inline-size: 210px;
  &::before {
    @include partials.ghost();
    border-spacing: var(--R-input-border-dash);
    border-top: var(--R-input-border-width) solid;
    transition: border-spacing 1ms, border-top 1ms, line-height 1ms !important;
  }
  &:has(> .r-input__input:hover:not(:read-only, :disabled)) {
    // @default 8px when hovered
    --R-input-border-dash: var(--r-input-border-dash, 8px);
  }
  &:has(> .r-input__input:focus),
  &:active {
    // @default 2px when focused or active
    --R-input-border-width: var(--r-input-border-width, 2px);
  }
  &:has(> .r-input__input:user-invalid) {
    // @default var(--r-common-error-color) if invalid
    --R-input-border-color: var(--r-input-border-color, var(--r-common-error-color));
  }
  &.is-multiline {
    display: flex;
    inline-size: auto;
  }
}
@layer roughness__base {
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
  text-decoration-thickness: calc(var(--R-input-border-width) + 1px);
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
  height: calc(var(--R-input-lines) * var(--r-element-line-height));
}
</style>
