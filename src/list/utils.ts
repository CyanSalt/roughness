import type { InjectionKey, Ref } from 'vue'

export type ListStyle = 'disc' | 'circle' | 'square' | 'auto'

export const listStyleInjection: InjectionKey<Ref<ListStyle>> = Symbol('RCheckboxGroup#multiple')
