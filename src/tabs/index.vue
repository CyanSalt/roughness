<script lang="ts" setup generic="T extends (string | number | RValue)[] | number">
import '../common/style.scss'
import { startCase } from 'lodash-es'
import { reactive, watchEffect } from 'vue'
import type { RValue } from '../common/utils'
import { effectRef, keyOf } from '../common/utils'
import type { GraphicsProps } from '../graphics/utils'
import RSpace from '../space/index.vue'
import RTabAnchor from './tab-anchor.vue'

type Tab = T extends (infer U)[] ? U : number

defineOptions({
  name: 'RTabs',
})

const {
  anchorSide = 'top',
  content = true,
  modelValue,
  tabs,
  reactions,
  graphicsOptions,
} = defineProps<{
  anchorSide?: 'top' | 'bottom' | 'left' | 'right',
  content?: boolean,
  modelValue?: Tab | undefined,
  tabs: T,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<Record<
  `anchor:${string}` | `content:${string}`,
  (props: { tab: Tab }) => any
>>()

let internalModelValue = $(effectRef({
  get: () => modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
})) as typeof modelValue

watchEffect(() => {
  if (typeof tabs === 'number') {
    if (tabs === 0) {
      internalModelValue = undefined
    } else if (!internalModelValue || internalModelValue as number <= 0) {
      internalModelValue = 1 as Tab
    } else if (internalModelValue as number > tabs) {
      internalModelValue = tabs as Tab
    }
  } else {
    if (!tabs.length) {
      internalModelValue = undefined
    } else if (!internalModelValue || !tabs.includes(internalModelValue)) {
      internalModelValue = tabs[0] as Tab
    }
  }
})

const renderedTabs = reactive<Set<Tab>>(new Set())

watchEffect(() => {
  if (internalModelValue && !renderedTabs.has(internalModelValue)) {
    renderedTabs.add(internalModelValue)
  }
})

function activate(tab: Tab) {
  internalModelValue = tab
}
</script>

<template>
  <RSpace
    :vertical="!(anchorSide === 'left' || anchorSide === 'right')"
    :reverse="anchorSide === 'bottom' || anchorSide === 'right'"
    :wrap="false"
    class="r-tabs"
  >
    <RSpace
      :vertical="anchorSide === 'left' || anchorSide === 'right'"
      class="r-tabs__anchors"
      role="tablist"
    >
      <RTabAnchor
        v-for="tab in tabs"
        :key="keyOf(tab)"
        :active="tab === internalModelValue"
        :side="anchorSide"
        :tab="tab"
        :reactions="reactions"
        :graphics-options="graphicsOptions"
        @activate="activate"
      >
        <slot :name="`anchor:${keyOf(tab)}`" :tab="tab">
          <slot name="anchor:*" :tab="tab">{{ startCase(keyOf(tab)) }}</slot>
        </slot>
      </RTabAnchor>
    </RSpace>
    <template v-if="content">
      <div
        v-for="tab in renderedTabs"
        :key="keyOf(tab)"
        :class="['r-tabs__content', { 'is-active': internalModelValue === tab }]"
        role="tabpanel"
        :aria-expanded="internalModelValue === tab"
      >
        <slot :name="`content:${keyOf(tab)}`" :tab="tab">
          <slot name="content:*" :tab="tab"></slot>
        </slot>
      </div>
    </template>
  </RSpace>
</template>

<style lang="scss" scoped>
.r-tabs__anchors {
  margin-block: 0;
  padding-inline: 0;
  list-style-type: none;
}
.r-tabs__content {
  &:not(.is-active) {
    display: none;
  }
}
</style>
