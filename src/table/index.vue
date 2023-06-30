<script lang="ts" setup>
import { useMutationObserver } from '@vueuse/core'
import { startCase } from 'lodash-es'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'
import type { Ref } from 'vue'
import { onMounted, reactive, toRef } from 'vue'
import type { ReactionProps } from '../common/utils'
import { useReactionState } from '../common/utils'
import RGraphics from '../graphics/index.vue'
import { getSVGSize } from '../graphics/utils'

defineOptions({
  name: 'RTable',
})

const {
  columns,
  header = true,
  rows,
  reactions = (() => []) as never,
} = defineProps<{
  columns: string[],
  header?: boolean,
  rows: string[],
} & ReactionProps>()

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

const getReactionState = useReactionState(toRef(() => reactions))

function draw(rc: RoughSVG, svg: SVGSVGElement) {
  getReactionState()
  const { x, y } = dimensions
  const padding = 2
  const options: Options = {
    stroke: 'var(--r-table-border-color)',
  }
  const { width, height } = getSVGSize(svg)
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
  for (const value of y.slice(0, -1)) {
    offsetY += value
    const line = rc.line(padding, offsetY, width - padding * 2, offsetY, options)
    svg.appendChild(line)
  }
  // Column lines
  let offsetX = 0
  for (const value of x.slice(0, -1)) {
    offsetX += value
    const line = rc.line(offsetX, padding, offsetX, height - padding * 2, options)
    svg.appendChild(line)
  }
}
</script>

<template>
  <table class="r-table">
    <RGraphics @draw="draw" />
    <thead v-if="header" ref="head">
      <tr>
        <th v-for="column in columns" :key="column">
          <slot :name="`head:${column}`">
            <slot name="head:*" :column="column">{{ startCase(column) }}</slot>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody ref="body">
      <tr v-for="row in rows" :key="row">
        <td v-for="column in columns" :key="column">
          <slot :name="`body:${row}.${column}`">
            <slot :name="`body:*.${column}`" :row="row">
              <slot :name="`body:${row}.*`" :column="column">
                <slot name="body:*.*" :row="row" :column="column"></slot>
              </slot>
            </slot>
          </slot>
        </td>
      </tr>
    </tbody>
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
