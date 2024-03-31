<script lang="ts" setup>
import '../common/style.scss'
import { vOnClickOutside } from '@vueuse/components'
import { ChevronDown, Loader, X } from 'lucide'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { SelectHTMLAttributes } from 'vue'
import { inject, provide, reactive, ref } from 'vue'
import RCheckboxGroup from '../checkbox/checkbox-group.vue'
import { labelsInjection } from '../checkbox/utils'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { getLengthProperty, getLengthPropertyAsArray } from '../common/property'
import { useReactionState } from '../common/reaction'
import { effectRef, sentenceCase } from '../common/utils'
import { nameInjection } from '../form/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
import RIcon from '../icon/index.vue'

defineOptions({
  name: 'RSelect',
})

const {
  clearable = false,
  disabled = false,
  loading = false,
  modelValue,
  multiple = false,
  name: userName,
  placeholder: userPlaceholder,
  reactions = (() => ['focus']) as never,
  graphicsOptions,
} = defineProps<{
  /** Whether the select is clearable */
  clearable?: boolean,
  disabled?: boolean,
  /**
   * Whether the select is loading.
   * It will be non-interactive in loading state
   */
  loading?: boolean,
  /** Key(s) or data of the selected item(s) */
  modelValue?: RValueOrKey[] | RValueOrKey | undefined,
  /** Whether to support selecting multiple items */
  multiple?: boolean,
  name?: SelectHTMLAttributes['name'],
  placeholder?: SelectHTMLAttributes['placeholder'],
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const formItemName = $(inject(nameInjection, ref()))

const name = $computed(() => {
  return userName ?? formItemName
})

const placeholder = $computed(() => {
  return userPlaceholder ?? (typeof name === 'string' ? sentenceCase(`select-${name}`) : undefined)
})

const defaultModelValue: typeof modelValue = $computed<typeof modelValue>(() => {
  return multiple ? (
    Array.isArray(modelValue) ? modelValue : (modelValue === undefined ? [] : [modelValue])
  ) : (
    Array.isArray(modelValue) ? modelValue[0] : modelValue
  )
})

let internalModelValue = $(effectRef({
  get: () => defaultModelValue,
  set: value => {
    emit('update:modelValue', value)
  },
}))

const labels = reactive(new Map<string, string>())

function labelOf(value: RValueOrKey) {
  const key = keyOf(value)
  return labels.get(key) ?? key
}

const displayText = $computed(() => {
  const text = Array.isArray(internalModelValue)
    ? internalModelValue.map(value => labelOf(value))
    : (internalModelValue !== undefined ? labelOf(internalModelValue) : internalModelValue)
  return Array.isArray(text) ? text.join(', ') : text
})

let input = $ref<HTMLInputElement>()

let state = $ref(false)

function toggle() {
  if (disabled || loading) return
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

function clear() {
  internalModelValue = multiple ? [] : undefined
}

const getReactionState = useReactionState(() => reactions, $$(input))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-select-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--r-select-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--r-select-border-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(rectangle)
}

function drawDropdown(rc: RoughSVG, svg: SVGSVGElement) {
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-select-dropdown-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--r-select-dropdown-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke: 'var(--r-select-border-color)',
    strokeWidth,
    strokeLineDash,
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
  })
  svg.appendChild(rectangle)
}

provide(labelsInjection, labels)
</script>

<template>
  <label v-on-click-outside.bubble="close" :class="['r-select', { 'is-loading': loading, 'is-open': state }]">
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <input
      ref="input"
      :value="displayText"
      :disabled="disabled"
      readonly
      :name="name"
      :placeholder="placeholder"
      class="r-select__input"
      @click="toggle"
      @keydown.enter="toggle"
      @keydown.escape="close"
    >
    <RIcon
      v-if="loading"
      :icon="Loader"
      :graphics-options="graphicsOptions"
      class="r-select__icon"
    />
    <RIcon
      v-else-if="clearable && state"
      :icon="X"
      :graphics-options="graphicsOptions"
      class="r-select__icon"
      role="button"
      @click="clear"
    />
    <RIcon
      v-else
      :icon="ChevronDown"
      :graphics-options="graphicsOptions"
      class="r-select__icon"
    />
    <div v-show="state" class="r-select__dropdown">
      <RGraphics :options="graphicsOptions" @draw="drawDropdown" />
      <RCheckboxGroup
        v-model="internalModelValue"
        :multiple="multiple"
        vertical
        :wrap="false"
        class="r-select__group"
        @update:model-value="update"
      >
        <slot></slot>
      </RCheckboxGroup>
    </div>
  </label>
</template>

<style lang="scss">
@use '../common/_reset';

.r-select {
  --r-select-border-color: var(--r-common-text-color);
  --r-select-border-width: 1px;
  --r-select-border-dash: none;
  --r-select-dropdown-border-width: 1px;
  --r-select-dropdown-border-dash: none;
  --r-select-dropdown-padding-block: calc(1em - 4px);
  --r-select-dropdown-padding-inline: calc(1em - 4px);
  position: relative;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  width: 210px;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline) calc(var(--r-common-box-padding-inline) - (1em + 4px) / 2);
  &:has(> .r-select__input:focus) {
    --r-select-border-width: 2px;
  }
  &:not(.is-loading) {
    cursor: pointer;
  }
  &:has(.r-select__input:disabled) {
    cursor: not-allowed;
  }
  &.is-open {
    z-index: 1;
  }
}
.r-select__icon {
  --r-icon-line-width: var(--r-select-border-width);
  --r-element-font-size: calc(1em + 4px);
  flex: none;
  margin-inline-start: calc(var(--r-common-box-padding-inline) - (1em + 4px) / 2 - 4px);
}
@layer base {
  .r-select__input {
    @include reset.input;
  }
}
.r-select__input {
  width: 100%;
  color: var(--r-common-text-color);
  cursor: inherit;
  &:disabled {
    opacity: 0.8;
    text-decoration-line: line-through;
  }
  &::placeholder {
    color: var(--r-common-placeholder-color);
  }
}
.r-select__dropdown {
  position: absolute;
  inset-block-end: 0;
  inset-inline: 0;
  transform: translateY(100%);
}
.r-select__group {
  max-block-size: calc(var(--r-select-dropdown-padding-block) * 2 + var(--r-common-line-height) * 5 + var(--r-space-gap-size) * 4);
  padding-block: var(--r-select-dropdown-padding-block);
  padding-inline: var(--r-select-dropdown-padding-inline);
  overflow: auto;
}
</style>
