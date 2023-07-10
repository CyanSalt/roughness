<script lang="ts" setup>
import RDialog from '../dialog/index.vue'

defineOptions({
  name: 'RDrawer',
})

const {
  direction = 'right',
} = defineProps<{
  direction?: 'left' | 'right' | 'top' | 'bottom',
}>()

defineSlots<{
  title?: (props: {}) => any,
  default?: (props: {}) => any,
  footer?: (props: {}) => any,
}>()
</script>

<template>
  <RDialog :class="['r-drawer', direction]">
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </RDialog>
</template>

<style lang="scss" scoped>
.r-drawer {
  &.left {
    right: 50%;
    width: auto;
    height: auto;
    max-height: none;
    :deep(.r-card) {
      height: 100%;
    }
  }
  &.right {
    left: auto;
    width: auto;
    height: auto;
    max-height: none;
    :deep(.r-card) {
      height: 100%;
    }
  }
  &.top {
    bottom: auto;
    width: auto;
    max-width: none;
    max-height: min(90vh, 960px);
  }
  &.bottom {
    top: auto;
    width: auto;
    max-width: none;
    max-height: min(90vh, 960px);
  }
}
</style>
