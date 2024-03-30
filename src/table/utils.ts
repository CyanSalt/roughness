import type { InjectionKey, Ref } from 'vue'
import type { ComponentSlots } from '../common/renderable'
import type RTableColumn from './table-column.vue'

export interface TableColumnData {
  name: string,
  slots: ComponentSlots<typeof RTableColumn>,
}

export const columnsInjection: InjectionKey<Ref<TableColumnData[]>> = Symbol('RTable#columns')
