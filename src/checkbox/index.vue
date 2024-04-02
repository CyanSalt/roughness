<script lang="ts" setup>
import '../common/style.scss'
import { startCase } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, ref, watchEffect } from 'vue'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { getLengthProperty } from '../common/property'
import { useReactionState } from '../common/reaction'
import { effectRef } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'
import { disabledInjection, labelsInjection, modelInjection, multipleInjection } from './utils'

defineOptions({
  name: 'RCheckbox',
})

const {
  checked = false,
  disabled: userDisabled,
  indeterminate = false,
  label: userLabel,
  value,
  reactions = (() => ['focus-within', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  /** Checked state of the checkbox */
  checked?: boolean,
  disabled?: boolean,
  /**
   * Indeterminate state of the checkbox
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes}
   */
  indeterminate?: boolean,
  /** Item label when checked and displayed */
  label?: string,
  /**
   * Item key or data when checked in the CheckboxGroup
   * {@link https://roughness.vercel.app/guide/specs#list-rendering}
   */
  value?: RValueOrKey,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:checked', value: typeof checked): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

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

let internalChecked = $(effectRef({
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
      } else if (currentValue) {
        model = value
      }
    }
    emit('update:checked', currentValue)
  },
}))

const disabled = $computed(() => {
  return Boolean(userDisabled || disabledByGroup)
})

const getReactionState = useReactionState(() => reactions)

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-checkbox-border-width') ?? 0
  const options: Options = {
    stroke: 'var(--r-checkbox-border-color)',
    strokeWidth,
    fill: indeterminate ? 'var(--r-checkbox-border-color)' : undefined,
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
    const checkedStrokeWidth = getLengthProperty(svg, '--r-checkbox-checked-width') ?? 0
    const linearPath = rc.linearPath([
      [checkedPadding, checkedPadding / 2 + (height - checkedPadding * 2) * 2 / 3],
      [checkedPadding + (width - checkedPadding * 2) / 3, height - checkedPadding * 3 / 2],
      [width - checkedPadding, checkedPadding / 2 + (height - checkedPadding * 2) / 3],
    ], {
      stroke: 'var(--r-checkbox-checked-color)',
      strokeWidth: checkedStrokeWidth,
    })
    svg.appendChild(linearPath)
  }
}
</script>

<template>
  <RSpace tag="label" inline :wrap="false" class="r-checkbox">
    <input
      v-model="internalChecked"
      :type="multiple === false ? 'radio' : 'checkbox'"
      :value="value"
      :disabled="disabled"
      .indeterminate="indeterminate"
      class="r-checkbox__input"
    >
    <span class="r-checkbox__control">
      <RGraphics :options="graphicsOptions" @draw="draw" />
    </span>
    <slot>{{ label }}</slot>
  </RSpace>
</template>

<style lang="scss">
@use '../common/_reset';

.r-checkbox {
  --r-checkbox-border-color: var(--r-common-text-color);
  --r-checkbox-border-width: 1px;
  --r-checkbox-checked-color: var(--r-common-primary-color);
  --r-checkbox-checked-width: 2px;
  --r-checkbox-control-size: var(--r-common-line-height);
  position: relative;
  cursor: pointer;
  &:focus-within,
  &:not(:has(> .r-checkbox__input:disabled)):active {
    --r-checkbox-border-width: 2px;
  }
  &:has(> .r-checkbox__input:disabled) {
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
}
@layer base {
  .r-checkbox__input {
    @include reset.input-checkbox;
  }
}
.r-checkbox__input {
  position: absolute;
}
.r-checkbox__control {
  flex: none;
  block-size: var(--r-checkbox-control-size);
  inline-size: var(--r-checkbox-control-size);
  .r-checkbox__input:disabled + & {
    opacity: 0.8;
  }
}
</style>
