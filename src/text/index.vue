<script lang="ts" setup>
defineOptions({
  name: 'RText',
})

const {
  tag = 'span',
  type = 'default',
} = defineProps<{
  tag?: string,
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error' | string,
}>()
</script>

<template>
  <component :is="tag" :class="['r-text', type]">
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
:global(:root) {
  --r-text-color: var(--r-common-text-color);
}
.r-text {
  color: var(--r-text-color);
  &.primary {
    --r-text-color: var(--r-common-primary-color);
  }
  &.info {
    --r-text-color: var(--r-common-info-color);
  }
  &.success {
    --r-text-color: var(--r-common-success-color);
  }
  &.warning {
    --r-text-color: var(--r-common-warning-color);
  }
  &.error {
    --r-text-color: var(--r-common-error-color);
  }
}
div.r-text, span.r-text {
  font-size: var(--r-common-font-size);
  line-height: var(--r-common-line-height);
}
</style>
