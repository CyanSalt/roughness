import { startCase } from 'lodash-es'
import type { ComputedGetter, ComputedSetter, Ref, WritableComputedOptions } from 'vue'
import { ref, watch, watchEffect } from 'vue'

export interface ColorProps {
  /**
   * Element style type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
   * See also [Color Styles]{@link https://roughness.vercel.app/guide/theme.html#color-styles}.
   */
  color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment' | (string & {}),
}

export interface SizeProps {
  /**
   * Element size type. It's actually just a class name, so you can also pass in another value and declare custom styles for it.
   */
  size?: 'small' | 'large' | (string & {}),
}

export function sentenceCase(text: string) {
  return startCase(text).toLowerCase().replace(/^\w/, matched => matched.toUpperCase())
}

export function useLocal<T>(getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T> | undefined
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  let value = ref() as Ref<T>
  let sealed = false
  watchEffect(() => {
    sealed = true
    value.value = getter()
    sealed = false
  }, { flush: 'sync' })
  if (setter) {
    watch(value, updated => {
      if (!sealed) {
        setter(updated)
      }
    }, { flush: 'sync' })
  }
  return value
}

export function isTruthyBooleanish(value: boolean | string | null | undefined) {
  // '', '1', 'true', true, 'disabled' -> true
  // 'false', false, undefined, null -> false
  return value !== undefined
    && value !== null
    && value !== false
    && value !== 'false'
}
