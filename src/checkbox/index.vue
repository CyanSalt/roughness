<script lang="ts" setup>
import '../common/style.scss'
import { startCase } from 'lodash-es'
import { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { InputHTMLAttributes } from 'vue'
import { computed, inject, ref, watchEffect } from 'vue'
import RBox from '../box/index.vue'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { getLengthProperty, useTransitionListener } from '../common/property'
import { isTruthyBooleanish, useLocal } from '../common/utils'
import { useName } from '../form/utils'
import { getSVGSize } from '../graphics/utils'
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
} & InputProps>()

const emit = defineEmits<{
  /** Callback function triggered when checked state of the checkbox is changed. */
  (event: 'update:checked', value: typeof checked): void,
}>()

defineSlots<{
  /** Label of the checkbox. */
  default?: (props: {}) => any,
}>()

const name = useName(() => userName)

const multiple = inject(multipleInjection, ref())
const model = inject(modelInjection, ref())
const disabledByGroup = inject(disabledInjection, ref())
const labels = inject(labelsInjection, undefined)

const label = computed(() => {
  return userLabel ?? (typeof value === 'undefined' ? value : startCase(keyOf(value)))
})

watchEffect(onInvalidate => {
  if (labels && value !== undefined && label.value !== undefined) {
    const key = keyOf(value)
    labels.set(key, label.value)
    onInvalidate(() => {
      labels.delete(key)
    })
  }
})

const internalChecked = useLocal({
  get: () => {
    return typeof multiple.value === 'boolean' ? (
      Array.isArray(model.value)
        ? model.value.includes(value!)
        : model.value === value
    ) : checked
  },
  set: currentValue => {
    if (typeof multiple.value === 'boolean') {
      if (multiple.value) {
        const currentChecked = Array.isArray(model.value)
          ? model.value.includes(value!)
          : model.value === value
        if (currentValue && !currentChecked) {
          model.value = Array.isArray(model.value) ? model.value.concat(value!) : [value!]
        } else if (!currentValue && currentChecked) {
          model.value = Array.isArray(model.value) ? model.value.filter(item => item !== value) : []
        }
      } else if (currentValue as unknown === value) {
        model.value = value
      }
    }
    emit('update:checked', currentValue)
  },
})

const disabled = computed(() => {
  return isTruthyBooleanish(userDisabled) || Boolean(disabledByGroup.value)
})

const { timestamp, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
  void timestamp.value
  if (internalChecked.value) {
    const { width, height } = getSVGSize(svg)
    const epsilon = 2
    // actual padding: [checkedPadding / 2, checkedPadding, checkedPadding * 3 / 2, checkedPadding]
    const checkedPadding = epsilon + 2
    const checkedStrokeWidth = getLengthProperty(svg, '--R-checkbox-checked-width') ?? 0
    const linearPath = rc.linearPath([
      [checkedPadding, checkedPadding / 2 + (height - checkedPadding * 2) * 2 / 3],
      [checkedPadding + (width - checkedPadding * 2) / 3, height - checkedPadding * 3 / 2],
      [width - checkedPadding, checkedPadding / 2 + (height - checkedPadding * 2) / 3],
    ], {
      stroke: 'var(--R-checkbox-checked-color)',
      strokeWidth: checkedStrokeWidth,
      ...overridden,
    })
    svg.appendChild(linearPath)
  }
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "checkbox.control",
      "description": "Box of the checkbox control."
    }
  ]
}
</defs>

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
    <RBox
      :round="multiple === false"
      :filled="indeterminate"
      graphics-selector="checkbox.control"
      class="r-checkbox__control"
      @draw="draw"
    />
    <slot>{{ label }}</slot>
  </RSpace>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-checkbox-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-checkbox-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-checkbox-checked-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-checkbox-checked-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-checkbox-control-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-checkbox {
  // Color of the checkbox control border.
  --R-checkbox-border-color: var(--r-checkbox-border-color, var(--r-common-color));
  // Width of the checkbox control border.
  --R-checkbox-border-width: var(--r-checkbox-border-width, var(--r-common-stroke-width));
  // Color of the checkbox checked line.
  --R-checkbox-checked-color: var(--r-checkbox-checked-color, var(--r-common-primary-color));
  // Width of the checkbox checked line.
  --R-checkbox-checked-width: var(--r-checkbox-checked-width, var(--r-common-text-stroke-width));
  // Size of the checkbox control.
  --R-checkbox-control-size: var(--r-checkbox-control-size, var(--r-common-line-height));
  position: relative;
  cursor: pointer;
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-checkbox-checked-width: border-top-width,
    ));
  }
  &:has(> .r-checkbox__input:focus-visible),
  &:not(:has(> .r-checkbox__input:disabled)):active {
    // @default 2px when focused or active
    --R-checkbox-border-width: var(--r-checkbox-border-width, var(--r-common-emphasized-stroke-width));
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
  --r-box-border-width: var(--R-checkbox-border-width);
  --r-box-border-color: var(--R-checkbox-border-color);
  flex: none;
  block-size: var(--R-checkbox-control-size);
  inline-size: var(--R-checkbox-control-size);
  .r-checkbox__input:disabled + & {
    opacity: 0.8;
  }
}
</style>
