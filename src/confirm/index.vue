<script lang="ts" setup>
import '../common/style.scss'
import { Check, X } from 'lucide'
import type { ComponentPublicInstance } from 'vue'
import RButton from '../button/index.vue'
import RDialog from '../dialog/index.vue'
import RIcon from '../icon/index.vue'

defineOptions({
  name: 'RConfirm',
})

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

let root = $ref<ComponentPublicInstance>()

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
  <RDialog ref="root" class="r-confirm" @update:open="toggle">
    <template #title>
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
