<script lang="ts" setup>
import '../common/style.scss'
import { startCase } from 'lodash-es'
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, provide, ref, toRef } from 'vue'
import { useReactionState } from '../common/utils'
import { RGraphics } from '../components'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'
import { labelInlineInjection, nameInjection } from './utils'

defineOptions({
  name: 'RFormItem',
})

const {
  labelInline: userLabelInline = undefined,
  name,
  required = false,
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  labelInline?: boolean,
  name?: string,
  required?: boolean,
} & GraphicsProps>()

defineSlots<{
  message?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const label = $computed(() => {
  return typeof name === 'string' ? startCase(name) : undefined
})

const formLabelInline = $(inject(labelInlineInjection, ref()))

const labelInline = $computed(() => {
  return userLabelInline ?? formLabelInline ?? true
})


const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const circle = rc.circle(width / 2, height / 2, Math.min(width, height) - padding * 2, {
    strokeWidth: 0,
    fill: 'var(--r-form-item-required-marker-color)',
    fillStyle: 'solid',
  })
  svg.appendChild(circle)
}

provide(nameInjection, $$(name))
</script>

<template>
  <RSpace
    :vertical="!labelInline"
    align="start"
    :wrap="false"
    :class="['r-form-item', { 'is-label-inline': labelInline }]"
    role="group"
  >
    <label class="r-form-item__label">
      <span v-if="required" class="r-form-item__required-marker">
        <RGraphics :options="graphicsOptions" @draw="draw" />
      </span>
      <slot name="label">{{ label }}</slot>
    </label>
    <RSpace vertical :wrap="false" class="r-form-item__container">
      <RSpace vertical justify="center" class="r-form-item__content">
        <slot></slot>
      </RSpace>
      <slot name="message"></slot>
    </RSpace>
  </RSpace>
</template>

<style lang="scss" scoped>
.r-form-item__label {
  --r-form-item-required-marker-size: 4px;
  --r-form-item-required-marker-color: var(--r-common-error-color);
  position: relative;
  box-sizing: border-box;
  padding-block-start: var(--r-common-box-padding-block);
  padding-inline-end: var(--r-common-box-padding-inline);
  .r-form-item.is-label-inline > & {
    block-size: 105px;
    padding-block-end: var(--r-common-box-padding-block);
    text-align: end;
  }
}
.r-form-item__required-marker {
  position: absolute;
  inset-block-start: calc(var(--r-common-box-padding-block) + var(--r-common-line-height) / 2);
  inset-inline-end: calc(var(--r-common-box-padding-inline) / 2);
  display: inline-block;
  block-size: calc(var(--r-form-item-required-marker-size) + 4px);
  inline-size: calc(var(--r-form-item-required-marker-size) + 4px);
  transform: translate(50%, -50%);
}
.r-form-item__content {
  min-block-size: calc(var(--r-common-line-height) + var(--r-common-box-padding-block) * 2);
}
</style>
