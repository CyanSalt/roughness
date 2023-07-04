<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef, watch, watchEffect } from 'vue'
import RCheckboxGroup from '../checkbox/checkbox-group.vue'
import type { CheckboxValue } from '../checkbox/utils'
import RGraphics from '../graphics/index.vue'
import { getSVGSize } from '../graphics/utils'
import { ReactionProps, useReactionState } from '../common/utils'

defineOptions({
  name: 'RSelect',
})

const {
  disabled = false,
  modelValue,
  multiple = false,
  placeholder,
  readonly = false,
  reactions = (() => ['focus']) as never,
} = defineProps<{
  disabled?: boolean,
  modelValue?: CheckboxValue[] | CheckboxValue | undefined,
  multiple?: boolean,
  placeholder?: string,
  readonly?: boolean,
} & ReactionProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

let internalModelValue = $ref(modelValue ?? (multiple ? [] : undefined) as typeof modelValue)

watchEffect(() => {
  internalModelValue = modelValue ?? (multiple ? [] : undefined) as typeof modelValue
})

watch($$(internalModelValue), currentValue => {
  emit('update:modelValue', currentValue)
})

const displayText = $computed(() => {
  return multiple ? (internalModelValue as CheckboxValue[]).join(', ') : internalModelValue
})

let input = $ref<HTMLInputElement>()

let state = $ref(false)

function toggle() {
  if (readonly || disabled) return
  state = !state
}

function close() {
  state = false
}

function update() {
  if (!multiple) {
    close()
  }
  if (input) {
    input.focus()
  }
}

const getReactionState = useReactionState(toRef(() => reactions), $$(input))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const style = getComputedStyle(svg)
  const borderWidth = style.getPropertyValue('--r-select-border-width')
  const strokeWidth = parseInt(borderWidth, 10) || 0
  const padding = 2
  const { width, height } = getSVGSize(svg)
  const rect = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--r-select-border-color)',
      strokeWidth,
    },
  )
  svg.appendChild(rect)
  const arrowSize = height / 2
  const arrowPadding = height / 4
  const linearPath = rc.linearPath([
    [Math.round(width - arrowPadding - arrowSize * 7 / 8), Math.round(arrowPadding + arrowSize * 3 / 8)],
    [Math.round(width - arrowPadding - arrowSize / 2), Math.round(height - arrowPadding - arrowSize / 4)],
    [Math.round(width - arrowPadding - arrowSize / 8), Math.round(arrowPadding + arrowSize * 3 / 8)],
  ], {
    stroke: 'var(--r-select-border-color)',
    strokeWidth,
  })
  svg.appendChild(linearPath)
}

function drawDropdown(rc: RoughSVG, svg: SVGSVGElement) {
  const style = getComputedStyle(svg)
  const borderWidth = style.getPropertyValue('--r-select-dropdown-border-width')
  const strokeWidth = parseInt(borderWidth, 10) || 0
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const linearPath = rc.linearPath([
    [padding, padding],
    [padding, height - padding],
    [width - padding, height - padding],
    [width - padding, padding],
  ], {
    stroke: 'var(--r-select-border-color)',
    strokeWidth,
  })
  svg.appendChild(linearPath)
}
</script>

<template>
  <label v-on-click-outside.bubble="close" :class="['r-select', { 'is-readonly': readonly }]">
    <RGraphics @draw="draw" />
    <input
      ref="input"
      :value="displayText"
      :disabled="disabled"
      readonly
      :placeholder="placeholder"
      class="r-select__input"
      @keydown.enter="toggle"
      @click="toggle"
    >
    <RCheckboxGroup
      v-if="state"
      v-model="internalModelValue"
      :multiple="multiple"
      vertical
      class="r-select__dropdown"
      @update:model-value="update"
    >
      <RGraphics @draw="drawDropdown" />
      <slot></slot>
    </RCheckboxGroup>
  </label>
</template>

<style lang="scss" scoped>
.r-select {
  --r-select-border-color: var(--r-common-text-color);
  --r-select-border-width: 1;
  --r-select-dropdown-border-width: 1;
  position: relative;
  display: inline-block;
  &:has(> .r-select__input:focus) {
    --r-select-border-width: 2;
  }
}
.r-select__input {
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline) calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height));
  font-size: var(--r-common-font-size);
  line-height: var(--r-common-line-height);
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  .r-select:not(.is-readonly) > & {
    cursor: pointer;
  }
}
.r-select__dropdown {
  position: absolute;
  inset-block-end: 0;
  inset-inline: 0;
  z-index: 1;
  padding: 12px;
  background: var(--r-common-background-color);
  transform: translateY(100%);
}
</style>
