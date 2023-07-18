<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef } from 'vue'
import type { ColorProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize, measureSVGSize, measureSVGSizeAsArray } from '../graphics/utils'
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
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  footer?: boolean,
  header?: boolean,
  tag?: string,
} & ColorProps & GraphicsProps>()

defineSlots<{
  title?: (props: {}) => any,
  'header-end'?: (props: {}) => any,
  footer?: (props: {}) => any,
  default?: (props: {}) => any,
}>()

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = measureSVGSize(svg, '--r-card-border-width') ?? 0
  const strokeLineDash = measureSVGSizeAsArray(svg, '--r-card-border-dash')
    ?.map(value => value ?? 0) ?? undefined
  const padding = 2
  const rect = rc.rectangle(
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
  svg.appendChild(rect)
}
</script>

<template>
  <RSpace :tag="tag" vertical :wrap="false" :class="['r-card', type]">
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <RSpace
      v-if="header"
      tag="header"
      justify="space-between"
      align="center"
      class="r-card__header"
    >
      <RText tag="strong" :type="type" size="large" class="r-card__title">
        <slot name="title"></slot>
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

<style lang="scss" scoped>
.r-card {
  --r-card-color: var(--r-common-text-color);
  --r-card-border-color: var(--r-card-color);
  --r-card-border-width: 1px;
  --r-card-border-dash: none;
  --r-card-padding-block: calc(var(--r-common-box-padding-block) * 2);
  --r-card-padding-inline: var(--r-common-box-padding-inline);
  padding-block: var(--r-card-padding-block);
  padding-inline: var(--r-card-padding-inline);
  color: var(--r-card-color);
  &.primary {
    --r-card-color: var(--r-common-primary-color);
  }
  &.info {
    --r-card-color: var(--r-common-info-color);
  }
  &.success {
    --r-card-color: var(--r-common-success-color);
  }
  &.warning {
    --r-card-color: var(--r-common-warning-color);
  }
  &.error {
    --r-card-color: var(--r-common-error-color);
  }
  &.comment {
    --r-card-color: var(--r-common-comment-color);
  }
}
.r-card__header, .r-card__footer {
  flex: none;
}
.r-card__body {
  flex: auto;
}
</style>
