import type { InjectionKey } from 'vue'
import type { ComponentSlots, RValue } from '../../../src'
import type REvent from './REvent.vue'
import type RGraphicsSelector from './RGraphicsSelector.vue'
import type RProp from './RProp.vue'
import type RSlot from './RSlot.vue'
import type RStyle from './RStyle.vue'

export interface PropData extends RValue {
  name: string,
  slots: ComponentSlots<typeof RProp>,
}

export const propsInjection: InjectionKey<PropData[]> = Symbol('RPropsTable#props')

export interface EventData extends RValue {
  name: string,
  slots: ComponentSlots<typeof REvent>,
}

export const eventsInjection: InjectionKey<EventData[]> = Symbol('REventsTable#events')

export interface SlotData extends RValue {
  name: string,
  slots: ComponentSlots<typeof RSlot>,
}

export const slotsInjection: InjectionKey<SlotData[]> = Symbol('RSlotsTable#slots')

export interface StyleData extends RValue {
  name: string,
  slots: ComponentSlots<typeof RStyle>,
}

export const stylesInjection: InjectionKey<StyleData[]> = Symbol('RStylesTable#styles')

export interface GraphicsSelectorData extends RValue {
  name: string,
  slots: ComponentSlots<typeof RGraphicsSelector>,
}

export const graphicsSelectorsInjection: InjectionKey<GraphicsSelectorData[]> = Symbol('RGraphicsSelectorsTable#graphicsSelectors')
