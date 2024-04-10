import type { InjectionKey, MaybeRefOrGetter } from 'vue'
import { inject, provide, reactive, toValue, watchEffect } from 'vue'

export function useList<T>(injection: InjectionKey<T[]>) {
  const list = reactive<T[]>([])
  provide(injection, list as T[])
  return list
}

export function useListItem<T>(injection: InjectionKey<T[]>, source: MaybeRefOrGetter<T>) {
  const list = inject(injection, undefined)
  watchEffect(onInvalidate => {
    if (!list) return
    const item = toValue(source)
    list.push(item)
    onInvalidate(() => {
      const index = list.indexOf(item)
      if (index !== -1) {
        list.splice(index, 1)
      }
    })
  })
  return list
}
