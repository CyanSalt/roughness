import type { InjectionKey } from 'vue'
import type { ComponentSlots } from '../common/renderable'
import type RTableColumn from './table-column.vue'

interface TableColumnData {
  name: string,
  slots: ComponentSlots<typeof RTableColumn>,
}

export const columnsInjection: InjectionKey<TableColumnData[]> = Symbol('RTable#columns')
