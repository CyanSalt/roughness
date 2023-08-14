<script lang="ts" setup>
import '../common/style.scss'
import type { ColorProps } from '../common/utils'
import RText from '../text/index.vue'

defineOptions({
  name: 'RLink',
})

const {
  tag = 'a',
  type = 'primary',
} = defineProps<{
  tag?: 'a' | 'button' | (string & {}),
  type?: ColorProps['type'],
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()
</script>

<template>
  <RText :tag="tag" :type="type" class="r-link">
    <slot></slot>
  </RText>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@layer base {
  a.r-link {
    @include reset.a;
  }
  button.r-link {
    @include reset.button;
  }
}
.r-link {
  --r-link-underline-width: 2px;
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
  color: var(--r-element-color);
}
</style>
