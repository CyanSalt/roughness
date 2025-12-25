<script lang="ts" setup>
import '../common/style.scss'
import { startCase } from 'lodash-es'
import type { RoughSVG } from 'roughjs/bin/svg'
import { computed } from 'vue'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RTabAnchor',
})

const {
  active = false,
  side = 'top',
  value,
} = defineProps<{
  /**
   * Whether the anchor is active.
   * @private
   */
  active?: boolean,
  /**
   * Which side of the content the anchor will show on.
   * @private
   */
  side?: 'top' | 'bottom' | 'left' | 'right',
  /**
   * Tab item value.
   * @private
   */
  value: RValueOrKey,
}>()

const emit = defineEmits<{
  /** Callback function triggered when the anchor is activated. */
  (event: 'activate', value: RValueOrKey): void,
}>()

defineSlots<{
  /** Content of the anchor. */
  default?: (props: {}) => any,
}>()

const content = computed(() => {
  return startCase(keyOf(value))
})

function activate() {
  emit('activate', value)
}

const { timestamp, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp.value
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-tab-anchor-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-tab-anchor-border-dash')
    ?.map(item => item ?? 0) ?? undefined
  const epsilon = 2
  let startX: number
  let startY: number
  let endX: number
  let endY: number
  switch (side) {
    case 'bottom':
      startX = epsilon
      startY = epsilon
      endX = width - epsilon
      endY = epsilon
      break
    case 'left':
      startX = width - epsilon
      startY = epsilon
      endX = width - epsilon
      endY = height - epsilon
      break
    case 'right':
      startX = epsilon
      startY = epsilon
      endX = epsilon
      endY = height - epsilon
      break
    case 'top':
    default:
      startX = epsilon
      startY = height - epsilon
      endX = width - epsilon
      endY = height - epsilon
      break
  }
  const line = rc.line(
    startX,
    startY,
    endX,
    endY,
    {
      stroke: 'var(--R-tab-anchor-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(line)
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "tab-anchor",
      "description": "Root of the tab anchor."
    }
  ]
}
</defs>

<template>
  <li
    :class="['r-tab-anchor', { 'is-active': active }]"
    role="tab"
    :aria-selected="active"
    @transitionrun="listener"
  >
    <RGraphics selector="tab-anchor" @draw="draw" />
    <button type="button" class="r-tab-anchor__button" @click="activate">
      <slot>{{ content }}</slot>
    </button>
  </li>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-tab-anchor-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-tab-anchor-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-tab-anchor-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

.r-tab-anchor {
  // Color of the tab anchor text and border.
  --R-tab-anchor-color: var(--r-tab-anchor-color, var(--r-common-color));
  // Width of the tab anchor border.
  --R-tab-anchor-border-width: var(--r-tab-anchor-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-tab-anchor-border-dash: var(--r-tab-anchor-border-dash, none);
  cursor: pointer;
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-tab-anchor-border-width: border-top-width,
      --R-tab-anchor-border-dash: border-spacing,
    ));
  }
  &:hover {
    // @default 8px when hovered
    --R-tab-anchor-border-dash: var(--r-tab-anchor-border-dash, var(--r-common-stroke-dash));
  }
  &:has(.r-tab-anchor__button:focus-visible), &:active {
    // @default 2px when focused or active
    --R-tab-anchor-border-width: var(--r-tab-anchor-border-width, var(--r-common-emphasized-stroke-width));
  }
  &.is-active {
    // @default var(--r-common-primary-color) if active
    --R-tab-anchor-color: var(--r-tab-anchor-color, var(--r-common-primary-color));
  }
}
@layer roughness__base {
  .r-tab-anchor__button {
    @include reset.button;
  }
}
.r-tab-anchor__button {
  display: inline-block;
  padding-block: var(--r-common-box-padding-block);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--R-tab-anchor-color);
}
</style>
