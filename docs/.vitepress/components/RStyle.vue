<script lang="ts" setup>
import { useSlots } from 'vue'
import { RKey, useListItem } from '../../../src'
import { stylesInjection } from './context'

defineOptions({
  name: 'RStyle',
  render: () => {},
})

const { name } = defineProps<{
  /** Prop name */
  name: string,
}>()

defineSlots<{
  name?: (props: {}) => any,
  type?: (props: {}) => any,
  'default-value'?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(stylesInjection, () => ({ name, slots, [RKey]: name }))
</script>
