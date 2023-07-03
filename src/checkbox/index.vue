<script lang="ts" setup>
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, ref, toRef, watch, watchEffect } from 'vue'
import type { ReactionProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import { getSVGSize } from '../graphics/utils'
import type { CheckboxValue } from './utils'
import { modelInjection, multipleInjection } from './utils'
import { Options } from 'roughjs/bin/core'

defineOptions({
  name: 'RCheckbox',
})

const {
  checked = false,
  reactions = (() => ['focus-within', 'active']) as never,
  value,
} = defineProps<{
  checked?: boolean,
  value?: CheckboxValue,
} & ReactionProps>()

const emit = defineEmits<{
  (event: 'update:checked', value: typeof checked): void
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const multiple = $(inject(multipleInjection, ref()))
let model = $(inject(modelInjection, ref()))

let internalChecked = $ref(checked)

watchEffect(() => {
  if (typeof multiple === 'boolean') {
    internalChecked = multiple
      ? (model as CheckboxValue[]).includes(value!)
      : model === value
  } else {
    internalChecked = checked
  }
})

watch($$(internalChecked), currentValue => {
  if (typeof multiple === 'boolean') {
    if (multiple) {
      const currentChecked = (model as CheckboxValue[]).includes(value!)
      if (currentValue && !currentChecked) {
        model = (model as CheckboxValue[]).concat(value!)
      } else if (!currentValue && currentChecked) {
        model = (model as CheckboxValue[]).filter(item => item !== value)
      }
    } else if (currentValue) {
      model = value
    }
  }
  emit('update:checked', currentValue)
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const style = getComputedStyle(svg)
  const borderWidth = style.getPropertyValue('--r-checkbox-border-width')
  const checkedWidth = style.getPropertyValue('--r-checkbox-checked-width')
  const strokeWidth = parseInt(borderWidth, 10) || 0
  const padding = 2
  const options: Options = {
    stroke: 'var(--r-checkbox-border-color)',
    strokeWidth,
  }
  if (multiple === false) {
    const ellipse = rc.ellipse(width / 2 , height / 2, width - padding * 2, height - padding * 2, options)
    svg.appendChild(ellipse)
  } else {
    const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, options)
    svg.appendChild(rectangle)
  }
  if (internalChecked) {
    const checkedStrokeWidth = parseInt(checkedWidth, 10) || 0
    const linearPath = rc.linearPath([
      [padding, Math.round(height / 2)],
      [Math.round(width / 2),  height - padding * 2],
      [width - padding * 2, padding],
    ], {
      stroke: 'var(--r-checkbox-checked-color)',
      strokeWidth: checkedStrokeWidth,
    })
    svg.appendChild(linearPath)
  }
}
</script>

<template>
  <label class="r-checkbox">
    <input
      v-model="internalChecked"
      :type="multiple === false ? 'radio' : 'checkbox'"
      :value="value"
      class="r-checkbox__model"
    >
    <span class="r-checkbox__control">
      <RGraphics @draw="draw"/>
    </span>
    <slot></slot>
  </label>
</template>

<style lang="scss" scoped>
.r-checkbox {
  --r-checkbox-border-color: var(--r-common-text-color);
  --r-checkbox-border-width: 1;
  --r-checkbox-checked-color: var(--r-common-primary-color);
  --r-checkbox-checked-width: 2;
  --r-checkbox-control-size: var(--r-common-line-height);
  display: inline-flex;
  cursor: pointer;
  &:focus-within,
  &:active {
    --r-checkbox-border-width: 2;
  }
}
.r-checkbox__model {
  appearance: none;
  margin: 0;
}
.r-checkbox__control {
  display: inline-block;
  flex: none;
  width: var(--r-checkbox-control-size);
  height: var(--r-checkbox-control-size);
  margin-right: calc(var(--r-checkbox-control-size) / 4);
}
</style>
