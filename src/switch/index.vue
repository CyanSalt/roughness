<script lang="ts" setup>
import '../common/style.scss'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef, watch, watchEffect } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getSVGSize, measureSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RSwitch',
})

const {
  disabled = false,
  modelValue,
  reactions = (() => ['focus-within', 'active']) as never,
  graphicsOptions,
} = defineProps<{
  disabled?: boolean,
  modelValue?: boolean,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

let internalModelValue = $ref(modelValue)

watchEffect(() => {
  internalModelValue = modelValue
})

watch($$(internalModelValue), currentValue => {
  emit('update:modelValue', currentValue)
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-switch-border-width') ?? 0
  const padding = 2
  const rectangle = rc.rectangle(padding, padding, width - padding * 2, height - padding * 2, {
    stroke: 'var(--r-switch-border-color)',
    strokeWidth,
    fill: internalModelValue ? 'var(--r-switch-track-color)' : undefined,
    ...getFilledSizeOptions(strokeWidth),
  })
  svg.appendChild(rectangle)
  const handleOptions: Options = {
    stroke: 'var(--r-switch-border-color)',
    fill: 'var(--r-switch-handle-color)',
    fillStyle: 'solid',
  }
  const handleSize = (height - 2 * padding) * 3 / 4
  const handleMargin = (height - handleSize) / 2
  if (internalModelValue) {
    const handleRectangle = rc.rectangle(
      width - handleMargin - handleSize,
      handleMargin,
      handleSize,
      handleSize,
      handleOptions,
    )
    svg.appendChild(handleRectangle)
  } else {
    const handleRectangle = rc.rectangle(
      handleMargin,
      handleMargin,
      handleSize,
      handleSize,
      handleOptions,
    )
    svg.appendChild(handleRectangle)
  }
}
</script>

<template>
  <RSpace tag="label" inline class="r-switch">
    <input
      v-model="internalModelValue"
      :disabled="disabled"
      type="checkbox"
      class="r-switch__input"
    >
    <span class="r-switch__control">
      <RGraphics :options="graphicsOptions" @draw="draw" />
    </span>
    <slot></slot>
  </RSpace>
</template>

<style lang="scss" scoped>
.r-switch {
  --r-switch-border-color: var(--r-common-text-color);
  --r-switch-border-width: 1px;
  --r-switch-control-size: var(--r-common-line-height);
  --r-switch-track-color: var(--r-common-primary-color);
  --r-switch-handle-color: var(--r-common-background-color);
  position: relative;
  cursor: pointer;
  &:focus-within,
  &:not(:has(> .r-checkbox__input:disabled)):active {
    --r-switch-border-width: 2px;
  }
  &:has(> .r-checkbox__input:disabled) {
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
}
.r-switch__input {
  appearance: none;
  position: absolute;
  margin: 0;
}
.r-switch__control {
  flex: none;
  width: calc(var(--r-switch-control-size) * 2);
  height: var(--r-switch-control-size);
  .r-switch__input:disabled + & {
    opacity: 0.8;
  }
}
</style>
