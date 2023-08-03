import type { InjectionKey, RenderFunction } from 'vue'
import { inject } from 'vue'
import type { ComponentProps } from '../common/utils'
import type RToast from './index.vue'

export interface ToastItem {
  id: string,
  render: RenderFunction,
  props?: ComponentProps<typeof RToast>,
}

export const itemsInjection: InjectionKey<ToastItem[]> = Symbol('RToastProvider#items')

let base = 0n
const generateId = () => String(++base)

export function useToast() {
  const items = inject(itemsInjection, [])
  return function (
    slot: string | number | boolean | null | undefined | RenderFunction,
    props?: ToastItem['props'],
  ) {
    items.unshift({
      id: generateId(),
      render: typeof slot === 'function' ? slot : () => slot,
      props,
    })
  }
}
