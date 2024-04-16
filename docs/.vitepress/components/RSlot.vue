<script lang="ts" setup>
import { useSlots } from 'vue'
import { RKey, useListItem } from '../../../src'
import { slotsInjection } from './context'

defineOptions({
  name: 'RSlot',
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

useListItem(slotsInjection, () => ({ name, slots, [RKey]: name }))
</script>
