<script lang="ts" setup>
import '../common/style.scss'

defineOptions({
  name: 'RGridGuide',
})

const {
  responsive = true,
} = defineProps<{
  /**
   * Whether to adjust the size to fit the parent element.
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

@property --R-grid-guide-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-grid-guide-cell-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-grid-guide-section-size {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-grid-guide {
  // Color of the guide lines.
  --R-grid-guide-color: var(--r-grid-guide-color, #f5f5f5);
  // Size of the grid cell.
  --R-grid-guide-cell-size: var(--r-grid-guide-cell-size, var(--r-common-font-size));
  // Size of the grid section.
  --R-grid-guide-section-size: var(--r-grid-guide-section-size, calc(var(--R-grid-guide-cell-size) * 8));
  position: relative;
  background-image:
    linear-gradient(to bottom, var(--R-grid-guide-color) 2px, transparent 2px),
    linear-gradient(to right, var(--R-grid-guide-color) 2px, transparent 2px),
    linear-gradient(to bottom, var(--R-grid-guide-color) 1px, transparent 1px),
    linear-gradient(to right, var(--R-grid-guide-color) 1px, transparent 1px);
  background-position:
    calc(var(--R-grid-guide-section-size) / 2 - 1.5px) calc(var(--R-grid-guide-section-size) / 2 - 1.5px),
    calc(var(--R-grid-guide-section-size) / 2 - 1.5px) calc(var(--R-grid-guide-section-size) / 2 - 1.5px),
    -1px -1px,
    -1px -1px;
  background-size:
    var(--R-grid-guide-section-size) var(--R-grid-guide-section-size),
    var(--R-grid-guide-section-size) var(--R-grid-guide-section-size),
    var(--R-grid-guide-cell-size) var(--R-grid-guide-cell-size),
    var(--R-grid-guide-cell-size) var(--R-grid-guide-cell-size);
  pointer-events: none;
  &.is-responsive {
    position: absolute;
    inset: 0;
    z-index: -1;
    block-size: 100%;
    inline-size: 100%;
  }
  :root.dark & {
    // @default [rgb(255 255 255 / 4%)] in dark theme
    --R-grid-guide-color: var(--r-grid-guide-color, rgb(255 255 255 / 4%));
  }
}
@layer roughness__base {
  :has(> .r-grid-guide.is-responsive) {
    position: relative;
    z-index: 0;
  }
}
</style>
