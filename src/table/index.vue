<script lang="ts" setup>
import '../common/style.scss'
import { useResizeObserver } from '@vueuse/core'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { Ref } from 'vue'
import { computed, onMounted, reactive, useTemplateRef } from 'vue'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { RListRenderer, useList } from '../common/list'
import { getLengthProperty, useTransitionListener } from '../common/property'
import RGraphics from '../graphics/index.vue'
import { getFilledSizeOptions, getSVGSize } from '../graphics/utils'
import RTableCell from './table-cell.vue'
import RTableHeaderCell from './table-header-cell.vue'
import { columnsInjection } from './utils'

defineOptions({
  name: 'RTable',
})

const {
  footer: userFooter = undefined,
  header = true,
  rows,
} = defineProps<{
  /**
   * Whether to display the table footer.
   * Will be enabled automatically when the slot of any column is passed.
   */
  footer?: boolean,
  /**
   * Whether to display the table header.
   * @default true
   */
  header?: boolean,
  /**
   * Row keys or data.
   * See [List Rendering]{@link https://roughness.vercel.app/guide/specs#list-rendering}.
   */
  rows: RValueOrKey[],
}>()

defineSlots<{
  /** Content for the table. You can also add `<caption>` or `<colgroup>` in addition to one or more TableColumn. */
  default?: (props: {}) => any,
}>()

const columns = useList(columnsInjection)

const footer = computed(() => {
  if (userFooter !== undefined) return userFooter
  if (columns.value.some(column => column.slots.footer)) return true
  return false
})

const head = useTemplateRef<HTMLTableSectionElement>('head')
const body = useTemplateRef<HTMLTableSectionElement>('body')
const foot = useTemplateRef<HTMLTableSectionElement>('foot')

interface TableDimensions {
  x: number[],
  y: number[],
}

let dimensions = reactive<TableDimensions>({
  x: [],
  y: [],
})

function getFirstRow(section: HTMLTableSectionElement | null | undefined) {
  return section?.children?.[0]?.matches('tr')
    ? Array.from(section.children[0].children).filter(el => el.matches('td, th'))
    : null
}

function getFirstColumn(section: HTMLTableSectionElement | null | undefined) {
  return section?.children
    ? Array.from(section.children).filter(el => el.matches('tr')).flatMap(el => {
      return el.children[0]?.matches('td, th') ? [el.children[0]] : []
    })
    : null
}

function calculateDimensions() {
  const firstRow = getFirstRow(body.value) ?? getFirstRow(head.value) ?? getFirstRow(foot.value) ?? []
  const firstColumn = [
    ...(getFirstColumn(head.value) ?? []),
    ...(getFirstColumn(body.value) ?? []),
    ...(getFirstColumn(foot.value) ?? []),
  ]
  dimensions.x = firstRow.map(el => el.clientWidth)
  dimensions.y = firstColumn.map(el => el.clientHeight)
}

function observeDimensions(section: Ref<HTMLTableSectionElement | null | undefined>) {
  return useResizeObserver(section, (entries) => {
    if (entries.length) {
      calculateDimensions()
    }
  })
}

observeDimensions(head)
observeDimensions(body)
observeDimensions(foot)

onMounted(() => {
  calculateDimensions()
})

const { track, listener } = useTransitionListener('::before')

function draw(rc: RoughSVG, svg: SVGSVGElement, overridden: Options) {
  track()
  const { width, height } = getSVGSize(svg)
  const strokeWidth = getLengthProperty(svg, '--R-table-border-width') ?? 0
  const { x, y } = dimensions
  const options: Options = {
    strokeWidth,
    stroke: 'var(--R-table-border-color)',
    ...getFilledSizeOptions(strokeWidth),
    ...overridden,
  }
  const epsilon = 2
  // Outline
  const rectangle = rc.rectangle(
    epsilon,
    epsilon,
    width - epsilon * 2,
    height - epsilon * 2,
    options,
  )
  svg.appendChild(rectangle)
  // Row lines
  let offsetY = 0
  for (let i = 0; i < y.length - 1; i += 1) {
    const value = y[i]
    const isSectionDivider = header && i === 0 || footer.value && i === y.length - 2
    offsetY += value
    if (isSectionDivider) {
      const firstLine = rc.line(epsilon, offsetY - 1, width - epsilon, offsetY - 1, options)
      svg.appendChild(firstLine)
      const secondLine = rc.line(epsilon, offsetY + 1, width - epsilon, offsetY + 1, options)
      svg.appendChild(secondLine)
    } else {
      const line = rc.line(epsilon, offsetY, width - epsilon, offsetY, options)
      svg.appendChild(line)
    }
  }
  // Column lines
  let offsetX = 0
  for (const value of x.slice(0, -1)) {
    offsetX += value
    const line = rc.line(offsetX, epsilon, offsetX, height - epsilon, options)
    svg.appendChild(line)
  }
}
</script>

<defs lang="json">
{
  "graphicsSelectors": [
    {
      "name": "table",
      "description": "Root of the table."
    }
  ]
}
</defs>

<template>
  <table class="r-table" @transitionrun="listener">
    <RGraphics selector="table" @draw="draw" />
    <RListRenderer include="RTableColumn">
      <slot></slot>
    </RListRenderer>
    <thead v-if="header" ref="head">
      <tr>
        <RTableHeaderCell
          v-for="column in columns"
          :key="column.name"
          :name="column.name"
          type="header"
        >
          <component :is="column.slots.header" v-if="column.slots.header"></component>
        </RTableHeaderCell>
      </tr>
    </thead>
    <tbody ref="body">
      <tr v-for="row in rows" :key="keyOf(row)">
        <RTableCell v-for="column in columns" :key="column.name" :row="row" :name="column.name">
          <component :is="column.slots.default" v-if="column.slots.default" :row="row"></component>
        </RTableCell>
      </tr>
    </tbody>
    <tfoot v-if="footer" ref="foot">
      <tr>
        <RTableHeaderCell
          v-for="column in columns"
          :key="column.name"
          :name="column.name"
          type="footer"
        >
          <component :is="column.slots.footer" v-if="column.slots.footer"></component>
        </RTableHeaderCell>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss">
@use '../common/_partials';
@use '../common/_reset';

@property --R-table-border-color {
  syntax: '<color>';
  inherits: true;
  initial-value: currentColor;
}

@layer roughness__base {
  .r-table {
    @include reset.table;
  }
}
.r-table {
  // Color of the table border.
  --R-table-border-color: var(--r-table-border-color, var(--r-common-color));
  // Width of the table border.
  --R-table-border-width: var(--r-table-border-width, var(--r-common-stroke-width));
  &::before {
    border-top-style: solid;
    @include partials.transition-runner((
      --R-table-border-width: border-top-width,
    ));
  }
}
</style>
