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

.r-link {
  --r-link-color: var(--r-common-text-color);
  --r-link-underline-width: 1;
  color: var(--r-link-color);
  font-size: var(--r-common-font-size);
  line-height: var(--r-common-line-height);
  text-decoration: none;
  cursor: pointer;
  &[href], &:hover {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: calc(var(--r-link-underline-width) * 1px + 1px);
  }
  &:focus, &:active {
    --r-link-underline-width: 2;
  }
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
