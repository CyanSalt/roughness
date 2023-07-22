import type { InjectionKey, Ref } from 'vue'

export const labelInlineInjection: InjectionKey<Ref<boolean | undefined>> = Symbol('RForm#labelInline')
export const nameInjection: InjectionKey<Ref<string | undefined>> = Symbol('RFormItem#name')
