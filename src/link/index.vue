<script lang="ts" setup>
defineOptions({
  name: 'RLink',
})

const {
  type = 'default',
} = defineProps<{
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error' | string,
}>()
</script>

<template>
  <a :class="['r-link', type]">
    <slot></slot>
  </a>
</template>

<style lang="scss" scoped>
@use '../common/_partials';

:global(:root) {
  --r-link-color: var(--r-common-fg-color);
}
.r-link {
  color: var(--r-link-color);
  font-size: var(--r-common-font-size);
  line-height: var(--r-common-line-height);
  text-align: center;
  &.primary {
    --r-link-color: var(--r-common-primary-color);
  }
  &.info {
    --r-link-color: var(--r-common-info-color);
  }
  &.success {
    --r-link-color: var(--r-common-success-color);
  }
  &.warning {
    --r-link-color: var(--r-common-warning-color);
  }
  &.error {
    --r-link-color: var(--r-common-error-color);
  }
}
</style>
