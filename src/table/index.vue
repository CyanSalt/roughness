<script lang="ts" setup generic="
  T extends (string | number | RValue)[] | number,
  U extends (string | number | RValue)[] | number
"
>
import '../common/style.scss'
import { useResizeObserver } from '@vueuse/core'
import { isObjectLike, startCase } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { Ref } from 'vue'
import { onMounted, reactive } from 'vue'
import type { RValue } from '../common/key'
import { keyOf } from '../common/key'
import { useReactionState } from '../common/reaction'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

type Column = T extends (infer V)[] ? V : number
type Row = U extends (infer V)[] ? V : number

defineOptions({
  name: 'RTable',
})

const {
  columns,
  footer = false,
  header = true,
  rows,
  reactions = (() => []) as never,
  graphicsOptions,
} = defineProps<{
  columns: T,
  footer?: boolean,
  header?: boolean,
  rows: U,
} & GraphicsProps>()

defineSlots<Record<
  `header:${string}` | `footer:${string}`,
  (props: { column: Column }) => any
> & Record<
  `body:${string}:${string}`,
  (props: { row: Row, column: Column }) => any
>>()

let head = $ref<HTMLTableSectionElement>()
let body = $ref<HTMLTableSectionElement>()
let foot = $ref<HTMLTableSectionElement>()

interface TableDimensions {
  x: number[],
  y: number[],
}

let dimensions = reactive<TableDimensions>({
  x: [],
  y: [],
})

function getFirstRow(section: HTMLTableSectionElement | undefined) {
  return section?.children?.[0]?.matches('tr')
    ? Array.from(section.children[0].children).filter(el => el.matches('td, th'))
    : null
}

function getFirstColumn(section: HTMLTableSectionElement | undefined) {
  return section?.children
    ? Array.from(section.children).filter(el => el.matches('tr')).flatMap(el => {
      return el.children[0]?.matches('td, th') ? [el.children[0]] : []
    })
    : null
}

function calculateDimensions() {
  const firstRow = getFirstRow(body) ?? getFirstRow(head) ?? getFirstRow(foot) ?? []
  const firstColumn = [
    ...(getFirstColumn(head) ?? []),
    ...(getFirstColumn(body) ?? []),
    ...(getFirstColumn(foot) ?? []),
  ]
  dimensions.x = firstRow.map(el => el.clientWidth)
  dimensions.y = firstColumn.map(el => el.clientHeight)
}

function observeDimensions(section: Ref<HTMLTableSectionElement | undefined>) {
  return useResizeObserver(section, (entries) => {
    if (entries.length) {
      calculateDimensions()
    }
  })
}

observeDimensions($$(head))
observeDimensions($$(body))
observeDimensions($$(foot))

onMounted(() => {
  calculateDimensions()
})

const getReactionState = useReactionState(() => reactions)

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const { x, y } = dimensions
  const options: Options = {
    stroke: 'var(--r-table-border-color)',
  }
  const padding = 2
  // Outline
  const rectangle = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    options,
  )
  svg.appendChild(rectangle)
  // Row lines
  let offsetY = 0
  for (let i = 0; i < y.length - 1; i += 1) {
    const value = y[i]
    const isSectionDivider = header && i === 0 || footer && i === y.length - 2
    offsetY += value
    if (isSectionDivider) {
      const firstLine = rc.line(padding, offsetY - 1, width - padding, offsetY - 1, options)
      svg.appendChild(firstLine)
      const secondLine = rc.line(padding, offsetY + 1, width - padding, offsetY + 1, options)
      svg.appendChild(secondLine)
    } else {
      const line = rc.line(padding, offsetY, width - padding, offsetY, options)
      svg.appendChild(line)
    }
  }
  // Column lines
  let offsetX = 0
  for (const value of x.slice(0, -1)) {
    offsetX += value
    const line = rc.line(offsetX, padding, offsetX, height - padding, options)
    svg.appendChild(line)
  }
}
</script>

<template>
  <table class="r-table">
    <RGraphics :options="graphicsOptions" @draw="draw" />
    <slot></slot>
    <thead v-if="header" ref="head">
      <tr>
        <th v-for="column in columns" :key="keyOf(column)">
          <slot :name="`header:${keyOf(column)}`" :column="column">
            <slot name="header:*" :column="column">{{ startCase(keyOf(column)) }}</slot>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody ref="body">
      <tr v-for="row in rows" :key="keyOf(row)">
        <td v-for="column in columns" :key="keyOf(column)">
          <slot :name="`body:${keyOf(row)}:${keyOf(column)}`" :row="row" :column="column">
            <slot :name="`body:*:${keyOf(column)}`" :row="row" :column="column">
              <slot :name="`body:${keyOf(row)}:*`" :row="row" :column="column">
                <slot name="body:*:*" :row="row" :column="column">{{
                  isObjectLike(row) ? row[keyOf(column)] : undefined
                }}</slot>
              </slot>
            </slot>
          </slot>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="footer" ref="foot">
      <tr>
        <th v-for="column in columns" :key="keyOf(column)">
          <slot :name="`footer:${keyOf(column)}`" :column="column">
            <slot name="footer:*" :column="column"></slot>
          </slot>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss" scoped>
@use '../common/_reset';

@layer base {
  .r-table {
    @include reset.table;
  }
}
.r-table {
  --r-table-border-color: var(--r-common-text-color);
  td, th {
    padding-block: var(--r-common-box-padding-block);
    padding-inline: var(--r-common-box-padding-inline);
  }
}
</style>
