<script lang="ts" setup generic="T extends string[] | number, U extends string[] | number">
import '../common/style.scss'
import { useMutationObserver } from '@vueuse/core'
import { startCase } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { Ref } from 'vue'
import { onMounted, reactive, toRef } from 'vue'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import type { GraphicsProps } from '../graphics/utils'
import { getSVGSize } from '../graphics/utils'

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

defineSlots<{
  'header:*'?: (props: { column: T extends string[] ? string : number }) => any,
  'body:*.*'?: (props: { row: U extends string[] ? string : number, column: T extends string[] ? string : number }) => any,
  'footer:*'?: (props: { column: T extends string[] ? string : number }) => any,
  default?: (props: {}) => any,
} & Record<`header:${string}` | `body:${string}` | `footer:${string}`, (props: {}) => any>>()

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
  return useMutationObserver(section, (mutations) => {
    if (mutations.length) {
      calculateDimensions()
    }
  }, {
    characterData: true,
    childList: true,
    subtree: true,
  })
}

observeDimensions($$(head))
observeDimensions($$(body))
observeDimensions($$(foot))

onMounted(() => {
  calculateDimensions()
})

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { width, height } = getSVGSize(svg)
  const { x, y } = dimensions
  const options: Options = {
    stroke: 'var(--r-table-border-color)',
  }
  const padding = 2
  // Outline
  const rect = rc.rectangle(
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
    options,
  )
  svg.appendChild(rect)
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
        <th v-for="column in columns" :key="column">
          <slot :name="`header:${column as string | number}`">
            <slot name="header:*" :column="column">{{ startCase(column) }}</slot>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody ref="body">
      <tr v-for="row in rows" :key="row">
        <td v-for="column in columns" :key="column">
          <slot :name="`body:${row as string | number}.${column as string | number}`">
            <slot :name="`body:*.${column as string | number}`" :row="row">
              <slot :name="`body:${row as string | number}.*`" :column="column">
                <slot name="body:*.*" :row="row" :column="column"></slot>
              </slot>
            </slot>
          </slot>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="footer" ref="foot">
      <tr>
        <th v-for="column in columns" :key="column">
          <slot :name="`footer:${column as string | number}`">
            <slot name="footer:*" :column="column"></slot>
          </slot>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss" scoped>
.r-table {
  --r-table-border-color: var(--r-common-text-color);
  td, th {
    padding-block: var(--r-common-box-padding-block);
    padding-inline: var(--r-common-box-padding-inline);
    color: var(--r-button-color);
    font-size: var(--r-common-font-size);
  }
}
</style>
