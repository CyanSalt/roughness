import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { ComponentProps, ComponentRenderable, ComponentRenderFunctions } from '../common/renderable'
import { getComponentRenderFunctions } from '../common/renderable'
import type RToast from './index.vue'

export interface ToastItem {
  id: string,
  slots: ComponentRenderFunctions<typeof RToast>,
  props?: ComponentProps<typeof RToast>,
}

export const itemsInjection: InjectionKey<ToastItem[]> = Symbol('RToastProvider#items')

let base = 0n
const generateId = () => String(++base)

export function useToast() {
  const items = inject(itemsInjection, [])
  return function (
    renderable: ComponentRenderable<typeof RToast>,
    props?: ToastItem['props'],
  ) {
    items.unshift({
      id: generateId(),
      slots: getComponentRenderFunctions(renderable),
      props,
    })
  }
}
