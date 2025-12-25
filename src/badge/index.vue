<script lang="ts" setup>
import '../common/style.scss'
import RBox from '../box/index.vue'

defineOptions({
  name: 'RBadge',
})

defineSlots<{
  /** Content of the badge marker. */
  marker?: (props: {}) => any,
  /** Decorated content of the badge. */
  default?: (props: {}) => any,
}>()
</script>

<template>
  <span class="r-badge">
    <RBox tag="sup" round graphics-selector="badge.marker" class="r-badge__marker">
      <span class="r-badge__marker-content"><slot name="marker"></slot></span>
    </RBox>
    <slot></slot>
  </span>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-badge-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-badge-padding-block {
  syntax: '<length-percentage>+';
  inherits: true;
  initial-value: 0px;
}

@property --R-badge-padding-inline {
  syntax: '<length-percentage>+';
  inherits: true;
  initial-value: 0px;
}

@property --R-badge-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

.r-badge {
  // Color of the badge marker.
  --R-badge-color: var(--r-badge-color, var(--r-common-error-color));
  // Vertical padding of the badge marker.
  --R-badge-padding-block: var(--r-badge-padding-block, calc((1em - 4px) / 2 - 4px));
  // Horizontal padding of the badge marker.
  --R-badge-padding-inline: var(--r-badge-padding-inline, calc((1em - 4px) - 4px));
  // Width of the badge marker border.
  --R-badge-border-width: var(--r-badge-border-width, var(--r-common-stroke-width));
  // Box styles
  --r-box-border-color: var(--R-badge-color);
  --r-box-border-width: var(--R-badge-border-width);
  position: relative;
}
.r-badge__marker {
  --r-element-font-size: calc(1em - 4px);
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  padding-block: var(--R-badge-padding-block);
  padding-inline: var(--R-badge-padding-inline);
  color: var(--R-badge-color);
  transform: translate(75%, -25%);
  &:has(> .r-badge__marker-content:empty) {
    padding-inline: var(--R-badge-padding-block);
  }
}
.r-badge__marker-content {
  font-size: inherit;
}
</style>
