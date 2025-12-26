import type { InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, ref, toValue } from 'vue'

export const labelInlineInjection: InjectionKey<Ref<boolean | undefined>> = Symbol('RForm#labelInline')
export const itemInjection: InjectionKey<Ref<{
  name?: string,
  required?: boolean,
}>> = Symbol('RFormItem#item')

export function useFormItem(name: MaybeRefOrGetter<string | undefined>) {
  const item = inject(itemInjection, ref())
  return {
    name: computed(() => toValue(name) ?? item.value?.name),
    required: computed(() => item.value?.required ?? false),
  }
}
