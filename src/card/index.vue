<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { useSlots } from 'vue'
import { getLengthProperty, getLengthPropertyAsArray, useTransitionListener } from '../common/property'
import type { ColorProps } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'
import RText from '../text/index.vue'

defineOptions({
  name: 'RCard',
})

const {
  footer: userFooter = undefined,
  header: userHeader = undefined,
  tag = 'article',
  type,
  graphicsOptions,
} = defineProps<{
  /**
   * Whether to display the card footer.
   * Will be enabled automatically when the slot is passed.
   */
  footer?: boolean,
  /**
   * Whether to display the card header.
   * Will be enabled automatically when any header slot is passed.
   */
  header?: boolean,
  /**
   * HTML tag for rendering the card.
   * @default 'article'
   */
  tag?: string,
} & ColorProps & GraphicsProps>()

defineSlots<{
  /**
   * Content of the card title. When a reasonable `type` is specified, the uppercase form of `type` is displayed by default.
   * Only available if the `header` is `true`.
   */
  title?: (props: {}) => any,
  /**
   * Content of the card header after title.
   * Only available if the `header` is `true`.
   */
  'header-end'?: (props: {}) => any,
  /** Content of the card. */
  default?: (props: {}) => any,
  /**
   * Content of the card footer.
   * Only available if the `footer` is `true`.
   */
  footer?: (props: {}) => any,
}>()

const COLORED_TYPES = ['primary', 'info', 'success', 'warning', 'error', 'comment']

const slots = useSlots()

const defaultTitle = $computed(() => {
  return COLORED_TYPES.includes(type!) ? type!.toUpperCase() : undefined
})

const header = $computed(() => {
  if (userHeader !== undefined) return userHeader
  if (slots.title || defaultTitle) return true
  if (slots['header-end']) return true
  return false
})

const footer = $computed(() => {
  if (userFooter !== undefined) return userFooter
  if (slots.footer) return true
  return false
})

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-card-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--R-card-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--R-card-border-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(rectangle)
}
</script>

<template>
  <RSpace
    :tag="tag"
    vertical
    :wrap="false"
    :class="['r-card', type]"
    @transitionrun="listener"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <RSpace
      v-if="header"
      tag="header"
      justify="space-between"
      align="center"
      class="r-card__header"
    >
      <RText tag="strong" class="r-card__title">
        <slot name="title">{{ defaultTitle }}</slot>
      </RText>
      <slot name="header-end"></slot>
    </RSpace>
    <section class="r-card__body">
      <slot></slot>
    </section>
    <RSpace
      v-if="footer"
      tag="footer"
      justify="end"
      align="center"
      class="r-card__footer"
    >
      <slot name="footer"></slot>
    </RSpace>
  </RSpace>
</template>

<style lang="scss">
@use '../common/_partials';

@property --R-card-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-card-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@property --R-card-border-width {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}

@property --R-card-border-dash {
  syntax: '<length>+ | none';
  inherits: true;
  initial-value: none;
}

@property --R-card-padding-block {
  syntax: '<length-percenatage>+';
  inherits: true;
  initial-value: 0px;
}

@property --R-card-padding-inline {
  syntax: '<length-percenatage>+';
  inherits: true;
  initial-value: 0px;
}

.r-card {
  // Color of the card text.
  --R-card-color: var(--r-card-color, var(--r-element-color));
  // Color of the card border.
  --R-card-border-color: var(--r-card-border-color, var(--R-card-color));
  // Width of the card border.
  --R-card-border-width: var(--r-card-border-width, var(--r-common-stroke-width));
  // List of comma and/or whitespace separated the lengths of alternating dashes and gaps of the element border.
  // An odd number of values will be repeated to yield an even number of values. Thus, `8` is equivalent to `8 8`.
  // See [`stroke-dasharray`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray).
  --R-card-border-dash: var(--r-card-border-dash, none);
  // Vertical padding of the card.
  --R-card-padding-block: var(--r-card-padding-block, calc(var(--r-common-box-padding-block) * 2));
  // Horizontal padding of the card.
  --R-card-padding-inline: var(--r-card-padding-inline, var(--r-common-box-padding-inline));
  padding-block: var(--R-card-padding-block);
  padding-inline: var(--R-card-padding-inline);
  color: var(--R-card-color);
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-card-border-width: border-top-width,
      --R-card-border-dash: border-spacing,
    ));
  }
  &.primary {
    --r-element-color: var(--r-common-primary-color);
  }
  &.info {
    --r-element-color: var(--r-common-info-color);
  }
  &.success {
    --r-element-color: var(--r-common-success-color);
  }
  &.warning {
    --r-element-color: var(--r-common-warning-color);
  }
  &.error {
    --r-element-color: var(--r-common-error-color);
  }
  &.comment {
    --r-element-color: var(--r-common-comment-color);
  }
}
.r-card__header, .r-card__footer {
  flex: none;
}
.r-card__title {
  --r-element-font-size: calc(1em + 4px);
}
.r-card__body {
  flex: auto;
}
</style>
