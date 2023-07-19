<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, ref, toRef, watch, watchEffect } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize, measureSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'
import type { CheckboxValue } from './utils'
import { disabledInjection, labelsInjection, modelInjection, multipleInjection } from './utils'

defineOptions({
  name: 'RCheckbox',
})

const {
  checked = false,
  disabled: userDisabled,
  indeterminate = false,
  label,
  value,
  reactions = (() => ['focus-within', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  checked?: boolean,
  disabled?: boolean,
  indeterminate?: boolean,
  label?: string,
  value?: CheckboxValue,
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
const labels = inject(labelsInjection, new Map<CheckboxValue, string>())

watchEffect(onInvalidate => {
  if (value !== undefined && label !== undefined) {
    labels.set(value, label)
    onInvalidate(() => {
      labels.delete(value)
    })
  }
})

let internalChecked = $ref(checked)

watchEffect(() => {
  if (typeof multiple === 'boolean') {
    internalChecked = Array.isArray(model)
      ? model.includes(value!)
      : model === value
  } else {
    internalChecked = checked
  }
})

watch($$(internalChecked), currentValue => {
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
})

const disabled = $computed(() => {
  return Boolean(userDisabled || disabledByGroup)
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-checkbox-border-width') ?? 0
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
    const checkedStrokeWidth = measureSVGSize(svg, '--r-checkbox-checked-width') ?? 0
    const linearPath = rc.linearPath([
      [padding, height / 2],
      [width / 2, height - padding],
      [width - padding, padding],
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

<style lang="scss" scoped>
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
:where(.r-checkbox__input) {
  @include reset.input-checkbox;
}
.r-checkbox__input {
  position: absolute;
}
.r-checkbox__control {
  flex: none;
  width: var(--r-checkbox-control-size);
  height: var(--r-checkbox-control-size);
  .r-checkbox__input:disabled + & {
    opacity: 0.8;
  }
}
</style>
