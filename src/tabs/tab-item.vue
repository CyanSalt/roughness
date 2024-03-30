<script lang="ts" setup>
import '../common/style.scss'
import { useSlots } from 'vue'
import type { RValueOrKey } from '../common/key'
import { useListItem } from '../common/list'
import { itemsInjection } from './utils'

defineOptions({
  name: 'RTabItem',
  render: () => {},
})

const {
  value,
} = defineProps<{
  /**
   * Tab item key or data
   * {@link https://roughness.vercel.app/guide/specs#list-rendering}
   */
  value: RValueOrKey,
}>()

defineSlots<{
  anchor?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(itemsInjection, () => ({ value, slots }))
</script>
