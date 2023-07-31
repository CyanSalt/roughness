<script lang="ts" setup>
import '../common/style.scss'
import type { RoughSVG } from 'roughjs/bin/svg'
import { toRef } from 'vue'
import type { ColorProps, SizeProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getFilledSizeOptions, getLengthProperty, getLengthPropertyAsArray, getSVGSize } from '../graphics/utils'
import RSpace from '../space/index.vue'

defineOptions({
  name: 'RProgress',
})

const {
  max = 1,
  min = 0,
  value,
  type,
  size,
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  min?: number,
  max?: number,
  value: number,
} & ColorProps & SizeProps & GraphicsProps>()

const ratio = $computed(() => {
  return (value - min) / (max - min) || 0
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const strokeWidth = getLengthProperty(svg, '--r-progress-border-width') ?? 0
  const strokeLineDash = getLengthPropertyAsArray(svg, '--r-progress-border-dash')
    ?.map(item => item ?? 0) ?? undefined
  const { width, height } = getSVGSize(svg)
  const padding = 2
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    {
      stroke: 'var(--r-progress-border-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(rectangle)
  const line = rc.line(
    (width - padding * 2) * ratio,
    padding,
    (width - padding * 2) * ratio,
    height - padding * 2,
    {
      stroke: 'var(--r-progress-color)',
      strokeWidth,
      strokeLineDash,
    },
  )
  svg.appendChild(line)
  const barRect = rc.rectangle(
    padding,
    padding,
    (width - padding * 2) * ratio,
    height - padding * 2,
    {
      strokeWidth: 0,
      fill: 'var(--r-progress-color)',
      ...getFilledSizeOptions(0),
    },
  )
  svg.appendChild(barRect)
}
</script>

<template>
  <RSpace
    inline
    align="center"
    :class="['r-progress', type, size]"
    role="progressbar"
  >
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <span class="r-progress__content">
      <slot></slot>
    </span>
  </RSpace>
</template>

<style lang="scss" scoped>
@use '../common/_partials';

.r-progress {
  --r-progress-color: var(--r-element-color);
  --r-progress-block-size: var(--r-common-line-height);
  --r-progress-inline-size: calc(var(--r-progress-block-size) * 10);
  --r-progress-border-color: var(--r-common-text-color);
  --r-progress-border-width: 1px;
  --r-progress-border-dash: none;
  display: inline-block;
  block-size: var(--r-progress-block-size);
  inline-size: var(--r-progress-inline-size);
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
  &.small {
    --r-element-font-size: var(--r-common-small-font-size);
  }
  &.large {
    --r-element-font-size: var(--r-common-large-font-size);
  }
}
.r-progress__content {
  --r-element-font-size: calc(1em - 2px);
  @include partials.stroke(var(--r-common-background-color), 3px);
  padding-inline: var(--r-common-box-padding-inline);
  color: var(--r-progress-color);
}
</style>
