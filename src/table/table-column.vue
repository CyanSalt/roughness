<script lang="ts" setup>
import '../common/style.scss'
import { useSlots } from 'vue'
import type { RValueOrKey } from '../common/key'
import { useListItem } from '../common/list'
import { columnsInjection } from './utils'

defineOptions({
  name: 'RTableColumn',
  render: () => {},
})

const {
  name,
} = defineProps<{
  /** Column name */
  name: string,
}>()

defineSlots<{
  header?: (props: {}) => any,
  default?: (props: { row: RValueOrKey }) => any,
  footer?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(columnsInjection, () => ({ name, slots }))
</script>
