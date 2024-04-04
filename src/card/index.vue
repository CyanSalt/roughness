<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
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
  footer = false,
  header = true,
  tag = 'article',
  type,
  graphicsOptions,
} = defineProps<{
  /** Whether to display the card footer */
  footer?: boolean,
  /** Whether to display the card header */
  header?: boolean,
  /**
   * HTML tag for rendering the card
   * @default 'article'
   */
  tag?: string,
} & ColorProps & GraphicsProps>()

defineSlots<{
  title?: (props: {}) => any,
  'header-end'?: (props: {}) => any,
  footer?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const COLORED_TYPES = ['primary', 'info', 'success', 'warning', 'error', 'comment']

const { timestamp, listener } = $(useTransitionListener('::before'))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  void timestamp
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--r-card-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--r-card-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--r-card-border-color)',
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
        <slot name="title">
          <template v-if="COLORED_TYPES.includes(type!)">{{ type!.toUpperCase() }}</template>
        </slot>
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

.r-card {
  --r-card-color: var(--r-element-color);
  --r-card-border-color: var(--r-card-color);
  --r-card-border-width: 1px;
  --r-card-border-dash: none;
  --r-card-padding-block: calc(var(--r-common-box-padding-block) * 2);
  --r-card-padding-inline: var(--r-common-box-padding-inline);
  padding-block: var(--r-card-padding-block);
  padding-inline: var(--r-card-padding-inline);
  color: var(--r-card-color);
  &::before {
    @include partials.ghost();
    border-spacing: var(--r-card-border-dash);
    border-top: var(--r-card-border-width) solid;
    transition: border-spacing 1ms, border-top 1ms !important;
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
