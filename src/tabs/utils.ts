import type { InjectionKey, Ref } from 'vue'
import type { RValueOrKey } from '../common/key'
import type { ComponentSlots } from '../common/renderable'
import type RTabItem from './tab-item.vue'

export interface TabItemData {
  value: RValueOrKey,
  slots: ComponentSlots<typeof RTabItem>,
}

export const itemsInjection: InjectionKey<Ref<TabItemData[]>> = Symbol('RTabs#items')
