<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core'
import { ref, shallowRef, triggerRef, useTemplateRef, watchEffect } from 'vue'
import { RoughAnnotation } from './utils'

defineOptions({
  name: 'RMark',
})

const {
  annotate,
  annotationConfig,
  open = true,
  tag = 'span',
} = defineProps<{
  /**
   * Function which construct an annotation with an HTML element.
   */
  annotate: (el: HTMLElement, config?: Record<string, unknown>) => RoughAnnotation,
  /**
   * Options for `annotate`
   * See [Configuring the Annotation]{@link https://github.com/rough-stuff/rough-notation?tab=readme-ov-file#configuring-the-annotation}.
   * @default
   * { type: 'highlight' }
   */
  annotationConfig?: Record<string, unknown>,
  /**
   * Whether to display the dialog modal.
   * @default true
   */
  open?: boolean,
  /**
   * HTML tag for rendering the marked element.
   * @default 'span'
   */
  tag?: string,
}>()

defineSlots<{
  /** Content of the marked element. */
  default?: (props: {}) => any,
}>()

const target = useTemplateRef<HTMLElement>('target')

const flag = ref<never>()

useResizeObserver(target, () => {
  triggerRef(flag)
})

const currentAnnotation = shallowRef<RoughAnnotation>()
watchEffect(onInvalidate => {
  if (target.value) {
    void flag.value
    const annotation = annotate(target.value, {
      type: 'highlight',
      ...annotationConfig,
      color: 'var(--R-mark-color)',
    })
    currentAnnotation.value = annotation
    onInvalidate(() => {
      annotation.remove()
    })
  }
})

watchEffect(() => {
  if (currentAnnotation.value) {
    if (open) {
      currentAnnotation.value.show()
    } else {
      currentAnnotation.value.hide()
    }
  }
})
</script>

<template>
  <component :is="tag" class="r-mark">
    <span ref="target" class="r-mark__target">
      <slot></slot>
    </span>
  </component>
</template>

<style lang="scss">
@property --R-mark-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

.r-mark {
  // Color of the mark annotation.
  --R-mark-color: var(--r-mark-color, #ffd54f);
  position: relative;
}
.r-mark__target {
  display: inline-block;
}
</style>
