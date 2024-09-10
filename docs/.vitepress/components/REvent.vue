<script lang="ts" setup>
import { useSlots } from 'vue'
import type { ListItemProps } from '../../../src'
import { RKey, useListItem } from '../../../src'
import { eventsInjection } from './context'

defineOptions({
  name: 'REvent',
  render: () => {},
})

const { name, rIndex } = defineProps<{
  /** Slot name */
  name: string,
} & ListItemProps>()

defineSlots<{
  name?: (props: {}) => any,
  type?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(eventsInjection, () => ({
  name,
  slots,
  [RKey]: name,
  rIndex,
}))
</script>
