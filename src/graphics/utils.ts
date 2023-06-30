import type { Options } from 'roughjs/bin/core'
import type { InjectionKey, Ref } from 'vue'

export const configInjection: InjectionKey<Ref<Options | undefined>> = Symbol('RGraphicsConfig')
