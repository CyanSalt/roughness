import type { InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, ref, toValue } from 'vue'

export const labelInlineInjection: InjectionKey<Ref<boolean | undefined>> = Symbol('RForm#labelInline')
export const nameInjection: InjectionKey<Ref<string | undefined>> = Symbol('RFormItem#name')

export function useName(refOrGetter: MaybeRefOrGetter<string | undefined>) {
  const name = inject(nameInjection, ref())
  return computed(() => {
    return toValue(refOrGetter) ?? name.value
  })
}
