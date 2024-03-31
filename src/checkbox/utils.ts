import type { InjectionKey, Ref } from 'vue'
import type { RValueOrKey } from '../common/key'

export const multipleInjection: InjectionKey<Ref<boolean>> = Symbol('RCheckboxGroup#multiple')
export const modelInjection: InjectionKey<Ref<RValueOrKey[] | RValueOrKey | undefined>> = Symbol('RCheckboxGroup#model')
export const disabledInjection: InjectionKey<Ref<boolean>> = Symbol('RCheckboxGroup#disabled')
export const labelsInjection: InjectionKey<Map<string, string>> = Symbol('RCheckbox#labels')
