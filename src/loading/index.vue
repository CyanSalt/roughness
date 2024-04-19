<script lang="ts" setup>
import { Loader } from 'lucide'
import '../common/style.scss'
import RIcon from '../icon/index.vue'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RLoading',
})
</script>

<template>
  <RSpace justify="center" align="center" class="r-loading">
    <RIcon :icon="Loader" class="r-loading__icon" />
  </RSpace>
</template>

<style lang="scss">
@use '../common/partials';

.r-loading {
  position: absolute;
  inset: 0;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background-color: var(--r-common-background-color);
    opacity: 0.2;
  }
}
@layer roughness__base {
  :has(> .r-loading) {
    position: relative;
  }
}
.r-loading__icon {
  @include partials.loading-spinner();
  position: relative;
  z-index: var(--r-common-overlay-z-index);
}
</style>
