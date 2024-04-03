import type { InjectionKey } from 'vue'
import type { RValueOrKey } from '../common/key'
import type { ComponentSlots } from '../common/renderable'
import type { GraphicsProps } from '../graphics/utils'
import type RTabItem from './tab-item.vue'

interface TabItemData {
  value: RValueOrKey,
  props: GraphicsProps,
  slots: ComponentSlots<typeof RTabItem>,
}

export const itemsInjection: InjectionKey<TabItemData[]> = Symbol('RTabs#items')
