<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { DirectiveBinding } from 'vue'
import { toRef, watch, watchEffect } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize, measureSVGSize, measureSVGSizeAsArray } from '../graphics/utils'

defineOptions({
  name: 'RInput',
})

const {
  disabled = false,
  lines = 1,
  modelValue,
  modelModifiers = (() => ({})) as never,
  placeholder,
  readonly = false,
  reactions = (() => ['hover', 'focus', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  disabled?: boolean,
  lines?: number,
  modelValue?: string | number,
  modelModifiers?: DirectiveBinding['modifiers'],
  placeholder?: string,
  readonly?: boolean,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

const modelValueText: string | undefined = $computed(() => {
  return typeof modelValue === 'number' ? String(modelValue) : modelValue
})

// eslint-disable-next-line vue/no-ref-object-destructure
let internalModelValue = $ref(modelValueText)

watchEffect(() => {
  internalModelValue = modelValueText
})

watch($$(internalModelValue), currentValue => {
  const value = currentValue !== undefined && modelModifiers.number
    ? Number(currentValue)
    : currentValue
  emit('update:modelValue', value)
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-input-border-width') ?? 0
  const strokeLineDash = measureSVGSizeAsArray(svg, '--r-input-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  if (lines > 1) {
    const lineHeight = measureSVGSize(svg, 'line-height') ?? 0
    for (let offset = lineHeight - padding; offset < height; offset += lineHeight) {
      const line = rc.line(padding, offset, width - padding, offset, {
        stroke: 'var(--r-input-border-color)',
        strokeWidth,
        strokeLineDash,
      })
      svg.appendChild(line)
    }
  } else {
    const line = rc.line(padding, height - padding, width - padding, height - padding, {
      stroke: 'var(--r-input-border-color)',
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
    :style="{ '--r-input-lines': lines > 1 ? lines : undefined }"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <textarea
      v-if="lines > 1"
      v-model="internalModelValue"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      class="r-input__input"
    ></textarea>
    <input
      v-else
      v-model="internalModelValue"
      :type="modelModifiers.number ? 'number' : 'text'"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      class="r-input__input"
    >
  </label>
</template>

<style lang="scss" scoped>
.r-input {
  --r-input-border-color: var(--r-common-text-color);
  --r-input-border-width: 1px;
  --r-input-border-dash: none;
  --r-input-line-height: calc(var(--r-common-box-padding-block) * 2 + var(--r-common-line-height));
  display: inline-flex;
  width: 210px;
  &:has(> .r-input__input:hover:not(:read-only, :disabled)) {
    --r-input-border-dash: 8px;
  }
  &:has(> .r-input__input:focus),
  &:active {
    --r-input-border-width: 2px;
  }
  :deep(> .r-graphics) {
    line-height: var(--r-input-line-height);
  }
  &.is-multiline {
    display: flex;
    width: auto;
  }
}
.r-input__input {
  appearance: none;
  width: 100%;
  padding-inline: var(--r-common-box-padding-inline);
  line-height: var(--r-input-line-height);
  text-decoration-thickness: calc(var(--r-input-border-width) + 1px);
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &:not(:read-only) {
    cursor: pointer;
  }
  &::placeholder {
    color: var(--r-common-placeholder-color);
  }
}
textarea.r-input__input {
  height: calc(var(--r-input-lines) * var(--r-input-line-height));
  background: none;
  resize: none;
}
</style>
