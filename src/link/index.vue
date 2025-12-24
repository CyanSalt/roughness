<script lang="ts" setup>
import '../common/style.scss'
import type { ColorProps } from '../common/utils'
import RText from '../text/index.vue'

defineOptions({
  name: 'RLink',
})

const {
  tag = 'a',
  color = 'primary',
} = defineProps<{
  /** HTML tag for rendering the link. */
  tag?: 'a' | 'button' | (string & {}),
} & ColorProps>()

defineSlots<{
  /** Content of the link. */
  default?: (props: {}) => any,
}>()
</script>

<template>
  <RText :tag="tag" :color="color" class="r-link">
    <slot></slot>
  </RText>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-link-underline-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@layer roughness__base {
  a.r-link {
    @include reset.a;
  }
  button.r-link {
    @include reset.button;
  }
}
.r-link {
  // Width of the link underline. Only visible when hovered, or with the `href` attribute.
  --R-link-underline-width: var(--r-link-underline-width, var(--r-common-text-stroke-width));
  cursor: pointer;
  &[href], &:hover {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: var(--R-link-underline-width);
  }
  &:focus-visible, &:active {
    // @default 3px when focused or active
    --R-link-underline-width: var(--r-link-underline-width, calc(var(--r-common-text-stroke-width) + 1px));
  }
}
button.r-link {
  color: var(--r-element-color);
}
</style>
