<script lang="ts" setup>
import '../common/style.scss'
import { X } from 'lucide'
import { computed, useSlots, useTemplateRef, watchEffect } from 'vue'
import RCard from '../card/index.vue'
import { useLocal } from '../common/utils'
import { useGraphicsConfig } from '../graphics/utils'
import RIcon from '../icon/index.vue'
import RLink from '../link/index.vue'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RDialog',
})

const {
  closable = true,
  footer: userFooter = undefined,
  header: userHeader = undefined,
  open = true,
  state = 'auto',
} = defineProps<{
  /**
   * Whether to display the close button.
   * @default true
   */
  closable?: boolean,
  /**
   * Whether to display the card footer.
   * Will be enabled automatically when the slot is passed.
   * @ignore
   */
  footer?: boolean,
  /**
   * Whether to display the card header.
   * Will be enabled automatically when any header slot is passed.
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
}>()

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

const internalOpen = useLocal({
  get: () => open,
  set: value => {
    emit('update:open', value)
  },
})

const slots = useSlots()

const header = computed(() => {
  if (userHeader !== undefined) return userHeader
  if (slots.title) return true
  if (slots['header-end'] || closable) return true
  return false
})

const footer = computed(() => {
  if (userFooter !== undefined) return userFooter
  if (slots.footer) return true
  return false
})

const root = useTemplateRef<HTMLDialogElement>('root')

watchEffect(() => {
  if (!root.value) return
  if (internalOpen.value) {
    root.value.showModal()
  } else {
    root.value.close()
  }
})

function clickBackdrop(event: MouseEvent) {
  if (state === 'auto') {
    (event.target as HTMLDialogElement).close()
  }
}

function close() {
  internalOpen.value = false
}

useGraphicsConfig({
  include: 'dialog',
  options: {
    fill: 'var(--r-common-background-color)',
    fillStyle: 'solid',
  },
})
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "dialog",
      "description": "Card of the dialog."
    }
  ]
}
</defs>

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
      graphics-selector="dialog"
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
            color="default"
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

@layer roughness__base {
  .r-dialog {
    @include reset.dialog;
  }
}
.r-dialog {
  max-inline-size: min(90vi, 960px);
  color: var(--r-element-color);
  &::backdrop {
    background-color: var(--r-common-background-color);
    opacity: 0.5;
  }
}
.r-dialog__close {
  display: inline-flex;
}
</style>
