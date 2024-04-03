<script lang="ts" setup>
import '../common/style.scss'
import { useSlots } from 'vue'
import type { RValueOrKey } from '../common/key'
import { useListItem } from '../common/list'
import type { GraphicsEmits, GraphicsProps } from '../graphics/utils'
import { itemsInjection } from './utils'

defineOptions({
  name: 'RTabItem',
  render: () => {},
})

const {
  value,
  reactions,
  graphicsOptions,
} = defineProps<{
  /**
   * Tab item key or data
   * {@link https://roughness.vercel.app/guide/specs#list-rendering}
   */
  value: RValueOrKey,
} & GraphicsProps>()

const emit = defineEmits<{
} & GraphicsEmits>()

defineSlots<{
  anchor?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(itemsInjection, () => ({ value, props: { reactions, graphicsOptions }, emit, slots }))
</script>
