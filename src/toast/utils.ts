import type { InjectionKey, Ref, RenderFunction } from 'vue'
import { inject, ref } from 'vue'
import type { ComponentProps } from '../common/utils'
import type RToast from './index.vue'

export interface Toast {
  id: string,
  render: RenderFunction,
  props?: ComponentProps<typeof RToast>,
}

export const toastsInjection: InjectionKey<Ref<Toast[]>> = Symbol('RToastProvider#toasts')

let base = 0n
const generateId = () => String(++base)

export function useToast() {
  const toasts = $(inject(toastsInjection, ref([])))
  return function (
    slot: string | number | boolean | null | undefined | RenderFunction,
    props?: Toast['props'],
  ) {
    toasts.unshift({
      id: generateId(),
      render: typeof slot === 'function' ? slot : () => slot,
      props,
    })
  }
}
