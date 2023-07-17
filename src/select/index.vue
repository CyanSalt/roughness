<script lang="ts" setup>
import '../common/style.scss'
import { vOnClickOutside } from '@vueuse/components'
import type { RoughSVG } from 'roughjs/bin/svg'
import { provide, reactive, toRef, watch, watchEffect } from 'vue'
import RCheckboxGroup from '../checkbox/checkbox-group.vue'
import type { CheckboxValue } from '../checkbox/utils'
import { labelsInjection } from '../checkbox/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize, measureSVGSize } from '../graphics/utils'

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
  graphicsOptions,
} = defineProps<{
  disabled?: boolean,
  modelValue?: CheckboxValue[] | CheckboxValue | undefined,
  multiple?: boolean,
  placeholder?: string,
  readonly?: boolean,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const defaultModelValue: typeof modelValue = $computed<typeof modelValue>(() => {
  return multiple ? (
    Array.isArray(modelValue) ? modelValue : (modelValue === undefined ? [] : [modelValue])
  ) : (
    Array.isArray(modelValue) ? modelValue[0] : modelValue
  )
})

// eslint-disable-next-line vue/no-ref-object-destructure
let internalModelValue = $ref(defaultModelValue)

watchEffect(() => {
  internalModelValue = defaultModelValue
})

watch($$(internalModelValue), currentValue => {
  emit('update:modelValue', currentValue)
})

const labels = reactive(new Map<CheckboxValue, string>())

const displayText = $computed(() => {
  const text = Array.isArray(internalModelValue)
    ? internalModelValue.map(value => labels.get(value) ?? value)
    : (internalModelValue !== undefined ? labels.get(internalModelValue) ?? internalModelValue : internalModelValue)
  return Array.isArray(text) ? text.join(', ') : text
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
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-select-border-width') ?? 0
  const padding = 2
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
  const arrowMargin = height / 4
  const linearPath = rc.linearPath([
    [width - arrowMargin - arrowSize * 7 / 8, arrowMargin + arrowSize * 3 / 8],
    [width - arrowMargin - arrowSize / 2, height - arrowMargin - arrowSize / 4],
    [width - arrowMargin - arrowSize / 8, arrowMargin + arrowSize * 3 / 8],
  ], {
    stroke: 'var(--r-select-border-color)',
    strokeWidth,
  })
  svg.appendChild(linearPath)
}

function drawDropdown(rc: RoughSVG, svg: SVGSVGElement) {
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-select-dropdown-border-width') ?? 0
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke: 'var(--r-select-border-color)',
    strokeWidth,
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
  })
  svg.appendChild(rectangle)
}

provide(labelsInjection, labels)
</script>

<template>
  <label v-on-click-outside.bubble="close" :class="['r-select', { 'is-readonly': readonly }]">
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <input
      ref="input"
      :value="displayText"
      :disabled="disabled"
      readonly
      :placeholder="placeholder"
      class="r-select__input"
      @click="toggle"
      @keydown.enter="toggle"
      @keydown.escape="close"
    >
    <div v-show="state" class="r-select__dropdown">
      <RGraphics :options="graphicsOptions" @draw="drawDropdown" />
      <RCheckboxGroup
        v-model="internalModelValue"
        :multiple="multiple"
        vertical
        :wrap="false"
        overflow
        class="r-select__group"
        @update:model-value="update"
      >
        <slot></slot>
      </RCheckboxGroup>
    </div>
  </label>
</template>

<style lang="scss" scoped>
@use '../common/_reset';

.r-select {
  --r-select-border-color: var(--r-common-text-color);
  --r-select-border-width: 1px;
  --r-select-dropdown-border-width: 1px;
  --r-select-dropdown-padding-block: 12px;
  --r-select-dropdown-padding-inline: 12px;
  position: relative;
  display: inline-flex;
  width: 210px;
  &:has(> .r-select__input:focus) {
    --r-select-border-width: 2px;
  }
}
:where(.r-select__input) {
  @include reset.input;
}
.r-select__input {
  width: 100%;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline) calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height));
  color: var(--r-common-text-color);
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  .r-select:not(.is-readonly) > & {
    cursor: pointer;
  }
  &::placeholder {
    color: var(--r-common-placeholder-color);
  }
}
.r-select__dropdown {
  position: absolute;
  inset-block-end: 0;
  inset-inline: 0;
  z-index: 1;
  transform: translateY(100%);
}
.r-select__group {
  max-block-size: calc(var(--r-select-dropdown-padding-block) * 2 + var(--r-common-line-height) * 5 + var(--r-space-gap-size) * 4);
  padding-block: var(--r-select-dropdown-padding-block);
  padding-inline: var(--r-select-dropdown-padding-inline);
}
</style>
