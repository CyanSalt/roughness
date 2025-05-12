<script lang="ts" setup>
import '../common/style.scss'
import { startCase } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes } from 'vue'
import { inject, ref, watchEffect } from 'vue'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { isTruthyBooleanish, useLocal } from '../common/utils'
import { useName } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'
import { disabledInjection, labelsInjection, modelInjection, multipleInjection } from './utils'

defineOptions({
  name: 'RCheckbox',
})

interface InputProps {
  /** @ignore */
  disabled?: InputHTMLAttributes['disabled'],
  /** @ignore */
  form?: InputHTMLAttributes['form'],
  /** @ignore */
  name?: InputHTMLAttributes['name'],
  /** @ignore */
  required?: InputHTMLAttributes['required'],
}

const {
  checked = false,
  disabled: userDisabled,
  indeterminate = false,
  label: userLabel,
  name: userName,
  value,
  graphicsOptions,
  ...props
} = defineProps<{
  /** Checked state of the checkbox. */
  checked?: boolean,
  /**
   * [Indeterminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes) of the checkbox.
   */
  indeterminate?: boolean,
  /**
   * Item label when checked and displayed, e.g. in Select.
   * @default undefined `startCase(keyOf(value))` if value exists.
   */
  label?: string,
  /**
   * Item key or data when checked in the CheckboxGroup.
   * See [List Rendering]{@link https://roughness.vercel.app/guide/specs#list-rendering}.
   */
  value?: RValueOrKey,
} & InputProps & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when checked state of the checkbox is changed. */
  (event: 'update:checked', value: typeof checked): void,
}>()

defineSlots<{
  /** Label of the checkbox. */
  default?: (props: {}) => any,
}>()

const name = $(useName($$(userName)))

const multiple = $(inject(multipleInjection, ref()))
let model = $(inject(modelInjection, ref()))
const disabledByGroup = $(inject(disabledInjection, ref()))
const labels = inject(labelsInjection, undefined)

const label = $computed(() => {
  return userLabel ?? (typeof value === 'undefined' ? value : startCase(keyOf(value)))
})

watchEffect(onInvalidate => {
  if (labels && value !== undefined && label !== undefined) {
    const key = keyOf(value)
    labels.set(key, label)
    onInvalidate(() => {
      labels.delete(key)
    })
  }
})

let internalChecked = $(useLocal({
  get: () => {
    return typeof multiple === 'boolean' ? (
      Array.isArray(model)
        ? model.includes(value!)
        : model === value
    ) : checked
  },
  set: currentValue => {
    if (typeof multiple === 'boolean') {
      if (multiple) {
        const currentChecked = Array.isArray(model)
          ? model.includes(value!)
          : model === value
        if (currentValue && !currentChecked) {
          model = Array.isArray(model) ? model.concat(value!) : [value!]
        } else if (!currentValue && currentChecked) {
          model = Array.isArray(model) ? model.filter(item => item !== value) : []
        }
      } else if (currentValue as unknown === value) {
        model = value
      }
    }
    emit('update:checked', currentValue)
  },
}))

const disabled = $computed(() => {
  return isTruthyBooleanish(userDisabled) || Boolean(disabledByGroup)
})

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-checkbox-border-width') ?? 0
  const options: Options = {
    stroke: 'var(--R-checkbox-border-color)',
    strokeWidth,
    fill: indeterminate ? 'var(--R-checkbox-border-color)' : undefined,
    ...getFilledSizeOptions(strokeWidth),
  }
  const padding = 2
  if (multiple === false) {
    const ellipse = rc.ellipse(width / 2, height / 2, width - padding * 2, height - padding * 2, options)
    svg.appendChild(ellipse)
  } else {
    const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, options)
    svg.appendChild(rectangle)
  }
  if (internalChecked) {
    // actual padding: [checkedPadding / 2, checkedPadding, checkedPadding * 3 / 2, checkedPadding]
    const checkedPadding = padding + 2
    const checkedStrokeWidth = getLengthProperty(svg, '--R-checkbox-checked-width') ?? 0
    const linearPath = rc.linearPath([
      [checkedPadding, checkedPadding / 2 + (height - checkedPadding * 2) * 2 / 3],
      [checkedPadding + (width - checkedPadding * 2) / 3, height - checkedPadding * 3 / 2],
      [width - checkedPadding, checkedPadding / 2 + (height - checkedPadding * 2) / 3],
    ], {
      stroke: 'var(--R-checkbox-checked-color)',
      strokeWidth: checkedStrokeWidth,
    })
    svg.appendChild(linearPath)
  }
}
</script>

<template>
  <RSpace
    tag="label"
    inline
    :wrap="false"
    class="r-checkbox"
    @transitionrun="listener"
  >
    <input
      v-model="internalChecked"
      :type="multiple === false ? 'radio' : 'checkbox'"
      :value="value"
      :disabled="disabled"
      :name="name"
      .indeterminate="indeterminate"
      v-bind="props"
      class="r-checkbox__input"
    >
    <span class="r-checkbox__control">
      <RGraphics :options="graphicsOptions" @draw="draw" />
    </span>
    <slot>{{ label }}</slot>
  </RSpace>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

.r-checkbox {
  // Color of the checkbox control border.
  --R-checkbox-border-color: var(--r-checkbox-border-color, var(--r-common-color));
  // Width of the checkbox control border.
  // @type {<length>}
  --R-checkbox-border-width: var(--r-checkbox-border-width, 1px);
  // Color of the checkbox checked line.
  --R-checkbox-checked-color: var(--r-checkbox-checked-color, var(--r-common-primary-color));
  // Width of the checkbox checked line.
  // @type {<length>}
  --R-checkbox-checked-width: var(--r-checkbox-checked-width, 2px);
  // Size of the checkbox control.
  // @type {<length>}
  --R-checkbox-control-size: var(--r-checkbox-control-size, var(--r-common-line-height));
  position: relative;
  cursor: pointer;
  &::before {
    @include partials.ghost();
    border-top: var(--R-checkbox-border-width) solid;
    border-right: var(--R-checkbox-checked-width) solid;
    transition: border-top 1ms, border-right 1ms !important;
  }
  &:has(> .r-checkbox__input:focus-visible),
  &:not(:has(> .r-checkbox__input:disabled)):active {
    // @default 2px when focused or active
    --R-checkbox-border-width: var(--r-checkbox-border-width, 2px);
  }
  &:has(> .r-checkbox__input:disabled) {
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
}
@layer roughness__base {
  .r-checkbox__input {
    @include reset.input-checkbox;
  }
}
.r-checkbox__input {
  position: absolute;
}
.r-checkbox__control {
  flex: none;
  block-size: var(--R-checkbox-control-size);
  inline-size: var(--R-checkbox-control-size);
  .r-checkbox__input:disabled + & {
    opacity: 0.8;
  }
}
</style>
