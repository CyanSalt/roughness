<script lang="ts" setup>
import RText from '../text/index.vue'

defineOptions({
  name: 'RLink',
})

defineProps<{}>()

defineSlots<{
  default?: (props: {}) => any,
}>()
</script>

<template>
  <RText tag="a" class="r-link">
    <slot></slot>
  </RText>
</template>

<style lang="scss" scoped>
@use '../common/_partials';

.r-link {
  --r-link-underline-width: 2px;
  text-decoration: none;
  cursor: pointer;
  &[href], &:hover {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: var(--r-link-underline-width);
  }
  &:focus, &:active {
    --r-link-underline-width: 3px;
  }
}
</style>
