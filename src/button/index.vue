<script lang="ts" setup>
import '../common/style.scss'
import { computed } from 'vue'
import RBox from '../box/index.vue'
import { isTruthyBooleanish } from '../common/utils'
import RLoading from '../loading/index.vue'

defineOptions({
  name: 'RButton',
})

const {
  block = false,
  disabled: userDisabled,
  loading = false,
  tag = 'button',
} = defineProps<{
  /** Whether the button is displayed as block. */
  block?: boolean,
  /** @ignore */
  disabled?: HTMLButtonElement['disabled'],
  /**
   * Whether the button is loading. It will be non-interactive in loading state.
   */
  loading?: boolean,
  /**
   * HTML tag for rendering the button.
   * @default 'button'
   */
  tag?: 'button' | 'a' | (string & {}),
}>()

defineSlots<{
  /** Content of the button. */
  default?: (props: {}) => any,
}>()

const type = computed(() => {
  return tag === 'button' ? 'button' : undefined
})

const disabled = computed(() => {
  return isTruthyBooleanish(userDisabled) || loading
})
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "button",
      "description": "Box of the button."
    }
  ]
}
</defs>

<template>
  <RBox
    :tag="tag"
    :type="type"
    :disabled="disabled"
    graphics-selector="button"
    :class="['r-button', { 'is-block': block, 'is-loading': loading }]"
  >
    <slot></slot>
    <RLoading v-if="loading" class="r-button__loading" />
  </RBox>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-button-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-button-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-button-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-button-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

@layer roughness__base {
  .r-button {
    @include reset.button;
  }
  a.r-button {
    text-decoration: none;
  }
}
.r-button {
  // Color of the button text.
  --R-button-color: var(--r-button-color, var(--r-element-color));
  // Color of the button border.
  --R-button-border-color: var(--r-button-border-color, var(--R-button-color));
  // Width of the button border.
  --R-button-border-width: var(--r-button-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-button-border-dash: var(--r-button-border-dash, none);
  // Box styles
  --r-box-border-color: var(--R-button-border-color);
  --r-box-border-width: var(--R-button-border-width);
  --r-box-border-dash: var(--R-button-border-dash);
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-button-color);
  white-space: nowrap;
  text-align: center;
  text-decoration-thickness: calc(var(--R-button-border-width) + 1px);
  &:hover:not(:disabled) {
    // @default 8px when hovered
    --R-button-border-dash: var(--r-button-border-dash, var(--r-common-stroke-dash));
  }
  &:focus-visible:not(:disabled), &:active:not(:disabled) {
    // @default 2px when focused or active
    --R-button-border-width: var(--r-button-border-width, var(--r-common-emphasized-stroke-width));
  }
  &:not(.is-loading) {
    cursor: pointer;
  }
  &:disabled:not(.is-loading) {
    opacity: 0.8;
    cursor: not-allowed;
    text-decoration-line: line-through;
  }
  &.is-filled:disabled {
    text-shadow: none;
  }
  &.is-block {
    display: block;
  }
}
</style>
