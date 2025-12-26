<script lang="ts" setup>
import '../common/style.scss'
import { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { computed } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import { sentenceCase, useLocal } from '../common/utils'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
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
  modelModifiers = {},
  name: userName,
  placeholder: userPlaceholder,
  type,
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
} & InputProps>()

const emit = defineEmits<{
  /** Callback function triggered when the value is changed. */
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const name = useName(() => userName)

const placeholder = computed(() => {
  return userPlaceholder ?? (typeof name.value === 'string' ? sentenceCase(`enter-${name.value}`) : undefined)
})

const internalModelValue = useLocal({
  get: () => {
    return typeof modelValue === 'number' ? String(modelValue) : modelValue
  },
  set: value => {
    const currentValue = value !== undefined && modelModifiers.number
      ? Number(value)
      : value
    emit('update:modelValue', currentValue)
  },
})

const { timestamp, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
  void timestamp.value
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-input-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-input-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const epsilon = 2
  if (lines > 1) {
    const lineHeight = getLengthProperty(svg, 'line-height') ?? 0
    for (let offset = lineHeight - epsilon; offset < height; offset += lineHeight) {
      const line = rc.line(epsilon, offset, width - epsilon, offset, {
        stroke: 'var(--R-input-border-color)',
        strokeWidth,
        strokeLineDash,
        ...overridden,
      })
      svg.appendChild(line)
    }
  } else {
    const line = rc.line(epsilon, height - epsilon, width - epsilon, height - epsilon, {
      stroke: 'var(--R-input-border-color)',
      strokeWidth,
      strokeLineDash,
      ...overridden,
    })
    svg.appendChild(line)
  }
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "input",
      "description": "Root of the input."
    }
  ]
}
</defs>

<template>
  <label
    :class="['r-input', { 'is-multiline': lines > 1 }]"
    :style="{ '--R-input-lines': lines > 1 ? lines : undefined }"
    @transitionrun="listener"
  >
    <RGraphics selector="input" @draw="draw" />
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

@property --R-input-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-input-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-input-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

@property --R-input-inline-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-input {
  // Color of the input border.
  --R-input-border-color: var(--r-input-border-color, var(--r-common-color));
  // Width of the input border.
  --R-input-border-width: var(--r-input-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-input-border-dash: var(--r-input-border-dash, none);
  // Size of the input.
  --R-input-inline-size: var(--r-input-inline-size, 210px);
  --r-element-line-height: calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height));
  display: inline-flex;
  inline-size: 210px;
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-input-border-width: border-top-width,
      --R-input-border-dash: border-spacing,
    ));
  }
  &:has(> .r-input__input:hover:not(:read-only, :disabled)) {
    // @default 8px when hovered
    --R-input-border-dash: var(--r-input-border-dash, var(--r-common-stroke-dash));
  }
  &:has(> .r-input__input:focus-visible:not(:disabled)),
  &:active:not(:has(> .r-input__input:disabled)) {
    // @default 2px when focused or active
    --R-input-border-width: var(--r-input-border-width, var(--r-common-emphasized-stroke-width));
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
