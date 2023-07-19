import type { InjectionKey, Ref } from 'vue'

export type CheckboxValue = string | number

export const multipleInjection: InjectionKey<Ref<boolean>> = Symbol('RCheckboxGroup#multiple')
export const modelInjection: InjectionKey<Ref<CheckboxValue[] | CheckboxValue | undefined>> = Symbol('RCheckboxGroup#model')
export const disabledInjection: InjectionKey<Ref<boolean>> = Symbol('RCheckboxGroup#disabled')
export const labelsInjection: InjectionKey<Map<CheckboxValue, string>> = Symbol('RCheckbox#labels')
