import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import type { ComponentProps, ComponentRenderable, ComponentSlots } from '../common/renderable'
import { getComponentRenderFunctions } from '../common/renderable'
import type RConfirm from './index.vue'

type ResolveFunction = (value: boolean | PromiseLike<boolean>) => void

export interface ConfirmItemData {
  id: string,
  props?: ComponentProps<typeof RConfirm>,
  slots: ComponentSlots<typeof RConfirm>,
  resolve: ResolveFunction,
}

export const itemsInjection: InjectionKey<ConfirmItemData[]> = Symbol('RConfirmProvider#items')

let base = 0n
const generateId = () => String(++base)

export function useConfirm() {
  const items = inject(itemsInjection, undefined)
  return function (
    renderable: ComponentRenderable<typeof RConfirm>,
    props?: ConfirmItemData['props'],
  ) {
    if (!items) return
    let resolve: (value: boolean | PromiseLike<boolean>) => void
    const promise = new Promise<boolean>(resolvePromise => {
      resolve = resolvePromise
    })
    items.unshift({
      id: generateId(),
      props,
      slots: getComponentRenderFunctions(renderable),
      resolve: resolve!,
    })
    return promise
  }
}
