<script lang="ts" setup>
import { useSlots } from 'vue'
import { RKey, useListItem } from '../../../src'
import { eventsInjection } from './context'

defineOptions({
  name: 'REvent',
  render: () => {},
})

const { name } = defineProps<{
  /** Slot name */
  name: string,
}>()

defineSlots<{
  name?: (props: {}) => any,
  type?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(eventsInjection, () => ({ name, slots, [RKey]: name }))
</script>
