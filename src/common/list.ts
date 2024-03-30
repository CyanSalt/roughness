import type { InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { inject, ref, toValue, watchEffect } from 'vue'

export function useListItem<T>(injection: InjectionKey<Ref<T[]>>, source: MaybeRefOrGetter<T>) {
  const list = $(inject(injection, ref()))
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
}
