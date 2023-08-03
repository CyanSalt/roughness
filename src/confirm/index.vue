<script lang="ts" setup>
import '../common/style.scss'
import type { ComponentPublicInstance } from 'vue'
import RButton from '../button/index.vue'
import RDialog from '../dialog/index.vue'
import RIcon from '../icon/index.vue'

defineOptions({
  name: 'RConfirm',
})

const emit = defineEmits<{
  (event: 'confirm'): void,
  (event: 'cancel'): void,
}>()

defineSlots<{
  title?: (props: {}) => any,
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
        <RIcon name="x" />
      </RButton>
      <RButton type="primary" value="confirm" class="r-confirm__button">
        <RIcon name="check" />
      </RButton>
    </template>
  </RDialog>
</template>

<style lang="scss" scoped>
.r-confirm__button {
  display: inline-flex;
}
</style>
