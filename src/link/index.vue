<script lang="ts" setup>
import '../common/style.scss'
import RText from '../text/index.vue'

defineOptions({
  name: 'RLink',
})

const {
  tag = 'a',
} = defineProps<{
  // FIXME: type issue of volar
  tag?: 'a' | 'button' | string,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()
</script>

<template>
  <RText :tag="tag" class="r-link">
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
button.r-link {
  appearance: none;
}
</style>
