import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { ComponentProps, ComponentRenderable, SlotsLike } from '../common/renderable'
import { toSlotsLike } from '../common/renderable'
import type RToast from './index.vue'

export interface ToastItemData {
  id: string,
  slots: SlotsLike<typeof RToast>,
  props?: ComponentProps<typeof RToast>,
}

export const itemsInjection: InjectionKey<ToastItemData[]> = Symbol('RToastProvider#items')

let base = 0n
const generateId = () => String(++base)

export function useToast() {
  const items = inject(itemsInjection, undefined)
  return function (
    renderable: ComponentRenderable<typeof RToast>,
    props?: ToastItemData['props'],
  ) {
    if (!items) return
    items.unshift({
      id: generateId(),
      slots: toSlotsLike(renderable),
      props,
    })
  }
}
