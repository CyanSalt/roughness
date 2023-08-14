<script lang="ts" setup>
import '../common/style.scss'
import RIcon from '../icon/index.vue'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RLoading',
})
</script>

<template>
  <RSpace justify="center" align="center" class="r-loading">
    <RIcon name="loader" class="r-loading__icon" />
  </RSpace>
</template>

<style lang="scss">
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
@layer base {
  :has(> .r-loading) {
    position: relative;
  }
}
.r-loading__icon {
  position: relative;
  z-index: 1;
}
</style>
