<script lang="ts" setup>
import { watch, watchEffect } from 'vue'
import RCard from '../card/index.vue'
import type { ReactionProps } from '../common/utils'
import RIcon from '../icon/index.vue'
import RLink from '../link/index.vue'

defineOptions({
  name: 'RDialog',
})

const {
  closable = true,
  footer = true,
  header = true,
  open = false,
  reactions,
} = defineProps<{
  closable?: boolean,
  footer?: boolean,
  header?: boolean,
  open?: boolean,
} & ReactionProps>()

const emit = defineEmits<{
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  title?: (props: {}) => any,
  default?: (props: {}) => any,
  footer?: (props: {}) => any,
}>()

let internalOpen = $ref(open)

watchEffect(() => {
  internalOpen = open
})

watch($$(internalOpen), currentValue => {
  emit('update:open', currentValue)
})

let root = $ref<HTMLDialogElement>()

watchEffect(() => {
  if (!root) return
  if (internalOpen) {
    root.showModal()
  } else {
    root.close()
  }
})

function close() {
  internalOpen = false
}
</script>

<template>
  <dialog
    ref="root"
    class="r-dialog"
    @close="close"
  >
    <RCard
      :header="header"
      :footer="footer"
      :reactions="reactions"
      tag="form"
      class="r-dialog__card"
    >
      <template v-if="closable" #header-end>
        <RLink
          tag="button"
          size="large"
          formmethod="dialog"
          class="r-dialog__close"
        >
          <RIcon name="x" />
        </RLink>
      </template>
      <template #title>
        <slot name="title"></slot>
      </template>
      <slot></slot>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </RCard>
  </dialog>
</template>

<style lang="scss" scoped>
.r-dialog {
  max-width: min(90vw, 960px);
  padding: 0;
  border: none;
  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
  }
}
.r-dialog__close {
  display: inline-flex;
}
</style>
