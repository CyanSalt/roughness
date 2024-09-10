<script lang="ts" setup>
import '../common/style.scss'
import { useSlots } from 'vue'
import type { RValueOrKey } from '../common/key'
import type { ListItemProps } from '../common/list'
import { useListItem } from '../common/list'
import type { GraphicsProps } from '../graphics/utils'
import { itemsInjection } from './utils'

defineOptions({
  name: 'RTabItem',
  render: () => {},
})

const {
  value,
  graphicsOptions,
  rIndex,
} = defineProps<{
  /**
   * Tab item key or data.
   * See [List Rendering]{@link https://roughness.vercel.app/guide/specs#list-rendering}.
   */
  value: RValueOrKey,
} & GraphicsProps & ListItemProps>()

defineSlots<{
  /** Anchor of the tab item. */
  anchor?: (props: {}) => any,
  /** Content of the tab item. */
  default?: (props: {}) => any,
}>()

const slots = useSlots()

useListItem(itemsInjection, () => ({
  value,
  props: { graphicsOptions },
  slots,
  rIndex,
}))
</script>
