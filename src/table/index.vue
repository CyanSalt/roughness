<script lang="ts" setup>
import { useMutationObserver } from '@vueuse/core'
import { startCase } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { Ref } from 'vue'
import { onMounted, reactive } from 'vue'
import RGraphics from '../graphics/index.vue'

defineOptions({
  name: 'RTable',
})

const {
  columns,
  header = true,
  rows,
} = defineProps<{
  columns: string[],
  header?: boolean,
  rows: string[],
}>()

let head = $ref<HTMLTableSectionElement>()
let body = $ref<HTMLTableSectionElement>()

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
  const firstRow = getFirstRow(body) ?? getFirstRow(head) ?? []
  const firstColumn = [
    ...(getFirstColumn(head) ?? []),
    ...(getFirstColumn(body) ?? []),
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

onMounted(() => {
  calculateDimensions()
})

function draw(rc: RoughSVG, svg: SVGSVGElement, { x, y }: TableDimensions) {
  const padding = 2
  const options: Options = {
    stroke: 'var(--r-table-border-color)',
  }
  // Outline
  const rect = rc.rectangle(
    padding,
    padding,
    svg.width.baseVal.value - padding * 2,
    svg.height.baseVal.value - padding * 2,
    options,
  )
  svg.appendChild(rect)
  // Row lines
  let offsetY = 0
  for (const value of y.slice(0, -1)) {
    offsetY += value
    const line = rc.line(padding, offsetY, svg.width.baseVal.value - padding * 2, offsetY, options)
    svg.appendChild(line)
  }
  // Column lines
  let offsetX = 0
  for (const value of x.slice(0, -1)) {
    offsetX += value
    const line = rc.line(offsetX, padding, offsetX, svg.height.baseVal.value - padding * 2, options)
    svg.appendChild(line)
  }
}

const helpers = {
  startCase,
}
</script>

<template>
  <table class="r-table">
    <RGraphics :ctx="dimensions" @draw="draw" />
    <thead v-if="header" ref="head">
      <tr>
        <th v-for="column in columns" :key="column">
          <slot :name="`head:${column}`" :helpers="helpers">
            <slot name="head:*" :column="column" :helpers="helpers"></slot>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody ref="body">
      <tr v-for="row in rows" :key="row">
        <td v-for="column in columns" :key="column">
          <slot :name="`body:${row}.${column}`" :helpers="helpers">
            <slot :name="`body:*.${column}`" :row="row" :helpers="helpers">
              <slot :name="`body:${row}.*`" :column="column" :helpers="helpers">
                <slot name="body:*.*" :row="row" :column="column" :helpers="helpers"></slot>
              </slot>
            </slot>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
:global(:root) {
  --r-table-border-color: var(--r-common-text-color);
}
.r-table {
  td, th {
    padding: var(--r-common-box-padding);
    color: var(--r-button-color);
    font-size: var(--r-common-font-size);
  }
}
</style>
