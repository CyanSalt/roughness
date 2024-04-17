<script lang="ts" setup>
import '../common/style.scss'
import { X } from 'lucide'
import { watchEffect } from 'vue'
import RCard from '../card/index.vue'
import { useModel } from '../common/utils'
import type { GraphicsProps } from '../graphics/utils'
import RIcon from '../icon/index.vue'
import RLink from '../link/index.vue'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RDialog',
})

const {
  closable = true,
  footer = true,
  header = true,
  open = true,
  state = 'auto',
  graphicsOptions,
} = defineProps<{
  /**
   * Whether to display the close button.
   * @default true
   */
  closable?: boolean,
  /**
   * Whether to display the card footer.
   * @default true
   * @ignore
   */
  footer?: boolean,
  /**
   * Whether to display the card header.
   * @default true
   * @ignore
   */
  header?: boolean,
  /**
   * Whether to display the dialog modal.
   * @default true
   */
  open?: boolean,
  /**
   * When specified as `auto`, the dialog can be closed by clicking the backdrop.
   * @default 'auto'
   */
  state?: 'auto' | 'manual',
} & GraphicsProps>()

const emit = defineEmits<{
  /** Callback function triggered when visibility of the dialog is changed. */
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  /** @ignore */
  title?: (props: {}) => any,
  /** @ignore */
  default?: (props: {}) => any,
  /** @ignore */
  footer?: (props: {}) => any,
}>()

let internalOpen = $(useModel({
  get: () => open,
  set: value => {
    emit('update:open', value)
  },
}))

let root = $ref<HTMLDialogElement>()

watchEffect(() => {
  if (!root) return
  if (internalOpen) {
    root.showModal()
  } else {
    root.close()
  }
})

function clickBackdrop(event: MouseEvent) {
  if (state === 'auto') {
    (event.target as HTMLDialogElement).close()
  }
}

function close() {
  internalOpen = false
}

const nestingGraphicsOptions = $computed(() => {
  return {
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
    ...graphicsOptions,
  }
})
</script>

<template>
  <dialog
    ref="root"
    class="r-dialog"
    @click.self="clickBackdrop"
    @close="close"
  >
    <RCard
      :header="header"
      :footer="footer"
      :graphics-options="nestingGraphicsOptions"
      tag="form"
      method="dialog"
      class="r-dialog__card"
    >
      <template #header-end>
        <RSpace :wrap="false">
          <slot name="header-end"></slot>
          <RLink
            v-if="closable"
            tag="button"
            type="default"
            size="large"
            class="r-dialog__close"
          >
            <RIcon :icon="X" size="large" />
          </RLink>
        </RSpace>
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

<style lang="scss">
@use '../common/_reset';

@layer base {
  .r-dialog {
    @include reset.dialog;
  }
}
.r-dialog {
  max-inline-size: min(90vi, 960px);
  color: var(--r-element-color);
  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
  }
}
.r-dialog__close {
  display: inline-flex;
}
</style>
