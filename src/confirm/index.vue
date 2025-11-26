<script lang="ts" setup>
import '../common/style.scss'
import { Check, X } from 'lucide'
import type { ComponentPublicInstance } from 'vue'
import { useSlots, useTemplateRef } from 'vue'
import RButton from '../button/index.vue'
import RDialog from '../dialog/index.vue'
import RIcon from '../icon/index.vue'

defineOptions({
  name: 'RConfirm',
})

const {
  closable = false,
  state = 'manual',
} = defineProps<{
  /**
   * Whether to display the close button.
   * @default false
   * @ignore
   */
  closable?: boolean,
  /**
   * When specified as `auto`, the dialog can be closed by clicking the backdrop.
   * @default 'auto'
   * @ignore
   */
  state?: 'auto' | 'manual',
}>()

const emit = defineEmits<{
  /** Callback function triggered when the confirm button is clicked. */
  (event: 'confirm'): void,
  /** Callback function triggered when the confirm is closed for reasons other than the confirm button. */
  (event: 'cancel'): void,
}>()

defineSlots<{
  /** Title of the confirm. */
  title?: (props: {}) => any,
  /** Content of the confirm. */
  default?: (props: {}) => any,
}>()

const slots = useSlots()

let root = $(useTemplateRef<ComponentPublicInstance>('root'))

function toggle(open: boolean) {
  if (!open) {
    const el = root?.$el as HTMLDialogElement | undefined
    if (el?.returnValue === 'confirm') {
      emit('confirm')
    } else {
      emit('cancel')
    }
  }
}
</script>

<template>
  <RDialog
    ref="root"
    :closable="closable"
    :state="state"
    class="r-confirm"
    @update:open="toggle"
  >
    <template v-if="slots.title" #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <RButton class="r-confirm__button">
        <RIcon :icon="X" />
      </RButton>
      <RButton type="primary" value="confirm" class="r-confirm__button">
        <RIcon :icon="Check" />
      </RButton>
    </template>
  </RDialog>
</template>

<style lang="scss">
.r-confirm__button {
  display: inline-flex;
}
</style>
