<script lang="ts" setup>
import '../common/style.scss'
import { useSlots } from 'vue'
import type { RValueOrKey } from '../common/key'
import type { ListItemProps } from '../common/list'
import { useListItem } from '../common/list'
import { columnsInjection } from './utils'

defineOptions({
  name: 'RTableColumn',
  render: () => {},
})

const {
  name,
  rIndex,
} = defineProps<{
  /** Column name. */
  name: string,
} & ListItemProps>()

defineSlots<{
  /** Header cell in the column. Defaults to `startCase(keyOf(column))`. */
  header?: (props: {}) => any,
  /** Body cell in each row of the column. Defaults to `row[name]` if `row` is an object. */
  default?: (props: { row: RValueOrKey }) => any,
  /** Footer cell in the column. */
  footer?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(columnsInjection, () => ({
  name,
  slots,
  rIndex,
}))
</script>
