<script lang="ts" setup>
import '../common/style.scss'

defineOptions({
  name: 'RGridGuide',
})

const {
  responsive = true,
} = defineProps<{
  /**
   * Whether to adjust the size to fit the parent element
   * @default true
   */
  responsive?: boolean,
}>()
</script>

<template>
  <div
    :class="['r-grid-guide', { 'is-responsive': responsive }]"
    aria-hidden="true"
  ></div>
</template>

<style lang="scss">
@use '../common/_partials';

.r-grid-guide {
  --r-grid-guide-color: #f5f5f5;
  --r-grid-guide-cell-size: var(--r-common-font-size);
  --r-grid-guide-section-size: calc(var(--r-grid-guide-cell-size) * 8);
  position: relative;
  background-image:
    linear-gradient(to bottom, var(--r-grid-guide-color) 2px, transparent 2px),
    linear-gradient(to right, var(--r-grid-guide-color) 2px, transparent 2px),
    linear-gradient(to bottom, var(--r-grid-guide-color) 1px, transparent 1px),
    linear-gradient(to right, var(--r-grid-guide-color) 1px, transparent 1px);
  background-position:
    calc(var(--r-grid-guide-section-size) / 2 - 1.5px) calc(var(--r-grid-guide-section-size) / 2 - 1.5px),
    calc(var(--r-grid-guide-section-size) / 2 - 1.5px) calc(var(--r-grid-guide-section-size) / 2 - 1.5px),
    -1px -1px,
    -1px -1px;
  background-size:
    var(--r-grid-guide-section-size) var(--r-grid-guide-section-size),
    var(--r-grid-guide-section-size) var(--r-grid-guide-section-size),
    var(--r-grid-guide-cell-size) var(--r-grid-guide-cell-size),
    var(--r-grid-guide-cell-size) var(--r-grid-guide-cell-size);
  pointer-events: none;
  &.is-responsive {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  :root.dark & {
    --r-grid-guide-color: rgb(255 255 255 / 4%);
  }
}
@layer base {
  :has(> .r-grid-guide.is-responsive) {
    position: relative;
    z-index: 0;
  }
}
</style>
