<script lang="ts" setup>
import '../common/style.scss'
import { watchEffect } from 'vue'
import RCard from '../card/index.vue'
import { effectRef } from '../common/utils'
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
  reactions,
  graphicsOptions,
} = defineProps<{
  closable?: boolean,
  footer?: boolean,
  header?: boolean,
  open?: boolean,
  state?: 'auto' | 'manual',
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:open', value: typeof open): void,
}>()

defineSlots<{
  title?: (props: {}) => any,
  default?: (props: {}) => any,
  footer?: (props: {}) => any,
}>()

let internalOpen = $(effectRef({
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
      :reactions="reactions"
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
            <RIcon name="x" size="large" />
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

<style lang="scss" scoped>
@use '../common/_reset';

:where(.r-dialog) {
  @include reset.dialog;
}
.r-dialog {
  max-width: min(90vw, 960px);
  color: var(--r-element-color);
  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
  }
}
.r-dialog__close {
  display: inline-flex;
}
</style>
