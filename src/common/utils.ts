import { startCase } from 'lodash-es'
import type { ComputedGetter, ComputedSetter, Ref, WritableComputedOptions } from 'vue'
import { ref, watch, watchEffect } from 'vue'

export interface ColorProps {
  /** Element style type */
  type?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment' | (string & {}),
}

export interface SizeProps {
  /** Element size type */
  size?: 'small' | 'large' | (string & {}),
}

export function sentenceCase(text: string) {
  return startCase(text).toLowerCase().replace(/\w/, matched => matched.toUpperCase())
}

export function effectRef<T>(getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T> | undefined
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  let value = ref(getter()) as Ref<T>
  watchEffect(() => {
    value.value = getter()
  }, { flush: 'post' })
  if (setter) {
    watch(value, setter)
  }
  return value
}
