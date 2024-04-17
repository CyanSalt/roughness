<script lang="ts" setup>
import '../common/style.scss'
import { startCase } from 'lodash-es'
import type { RoughSVG } from 'roughjs/bin/svg'
import { inject, provide, ref } from 'vue'
import RGraphics from '../graphics/index.vue'
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
  graphicsOptions,
} = defineProps<{
  /** Whether the label of the form item is displayed as an inline box. */
  labelInline?: boolean,
  /** Field name of the form model. */
  name?: string,
  /** Whether the field is required. */
  required?: boolean,
} & GraphicsProps>()

defineSlots<{
  /** Label of the form item. */
  label?: (props: {}) => any,
  /** Content of the form item. */
  default?: (props: {}) => any,
  /** Footnote of the form item. */
  message?: (props: {}) => any,
}>()

const label = $computed(() => {
  return typeof name === 'string' ? startCase(name) : undefined
})

const formLabelInline = $(inject(labelInlineInjection, ref()))

const labelInline = $computed(() => {
  return userLabelInline ?? formLabelInline ?? true
})


function draw(rc: RoughSVG, svg: SVGSVGElement) {
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const circle = rc.circle(width / 2, height / 2, Math.min(width, height) - padding * 2, {
    strokeWidth: 0,
    fill: 'var(--R-form-item-required-marker-color)',
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

<style lang="scss">
.r-form-item__label {
  // Size of the label when `label-inline` is `true`.
  // @type {<length>}
  --R-form-item-label-inline-size: var(--r-form-item-label-inline-size, 105px);
  // Size of the marker when `required` is `true`.
  // @type {<length>}
  --R-form-item-required-marker-size: var(--r-form-item-required-marker-size, 4px);
  // Color of the marker when `required` is `true`.
  // @type {<color>}
  --R-form-item-required-marker-color: var(--r-form-item-required-marker-color, var(--r-common-error-color));
  position: relative;
  box-sizing: border-box;
  padding-block-start: var(--r-common-box-padding-block);
  padding-inline-end: var(--r-common-box-padding-inline);
  .r-form-item.is-label-inline > & {
    inline-size: var(--R-form-item-label-inline-size);
    padding-block-end: var(--r-common-box-padding-block);
    text-align: end;
  }
}
.r-form-item__required-marker {
  position: absolute;
  inset-block-start: calc(var(--r-common-box-padding-block) + var(--r-common-line-height) / 2);
  inset-inline-end: calc(var(--r-common-box-padding-inline) / 2);
  display: inline-block;
  block-size: calc(var(--R-form-item-required-marker-size) + 4px);
  inline-size: calc(var(--R-form-item-required-marker-size) + 4px);
  transform: translate(50%, -50%);
}
.r-form-item__content {
  min-block-size: calc(var(--r-common-line-height) + var(--r-common-box-padding-block) * 2);
}
</style>
