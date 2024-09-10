<script lang="ts" setup>
import { useSlots } from 'vue'
import type { ListItemProps } from '../../../src'
import { RKey, useListItem } from '../../../src'
import { propsInjection } from './context'

defineOptions({
  name: 'RProp',
  render: () => {},
})

const { name, rIndex } = defineProps<{
  /** Prop name */
  name: string,
} & ListItemProps>()

defineSlots<{
  name?: (props: {}) => any,
  type?: (props: {}) => any,
  'default-value'?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(propsInjection, () => ({
  name,
  slots,
  [RKey]: name,
  rIndex,
}))
</script>
