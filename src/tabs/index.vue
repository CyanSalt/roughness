<script lang="ts" setup>
import '../common/style.scss'
import { provide, reactive, watchEffect } from 'vue'
import type { RValueOrKey } from '../common/key'
import { keyOf } from '../common/key'
import { effectRef } from '../common/utils'
import type { GraphicsProps } from '../graphics/utils'
import RSpace from '../space/index.vue'
import RTabAnchor from './tab-anchor.vue'
import type { TabItemData } from './utils'
import { itemsInjection } from './utils'

defineOptions({
  name: 'RTabs',
})

const {
  anchorSide = 'top',
  content = true,
  modelValue,
  reactions,
  graphicsOptions,
} = defineProps<{
  /**
   * Which side of the content the anchors will show on
   * @default 'top'
   */
  anchorSide?: 'top' | 'bottom' | 'left' | 'right',
  /**
   * Whether to display the tabs content
   * @default true
   */
  content?: boolean,
  /** Value of the active tab item in tabs */
  modelValue?: RValueOrKey | undefined,
} & GraphicsProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof modelValue): void,
}>()

defineSlots<{
  default?: (props: {}) => any,
}>()

const items = $ref<TabItemData[]>([])

provide(itemsInjection, $$(items))

let internalModelValue = $(effectRef({
  get: () => modelValue,
  set: value => {
    emit('update:modelValue', value)
  },
})) as typeof modelValue

watchEffect(() => {
  if (!items.length) {
    internalModelValue = undefined
  } else if (!internalModelValue || !items.some(item => item.value === internalModelValue)) {
    internalModelValue = items[0].value
  }
})

const renderedValues = reactive(new Set()) as Set<RValueOrKey>

watchEffect(() => {
  if (internalModelValue && !renderedValues.has(internalModelValue)) {
    renderedValues.add(internalModelValue)
  }
})

const renderedItems = $computed(() => {
  return items.filter(item => renderedValues.has(item.value))
})

function activate(tab: RValueOrKey) {
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
        v-for="tab in items"
        :key="keyOf(tab.value)"
        :active="tab.value === internalModelValue"
        :side="anchorSide"
        :value="tab.value"
        :reactions="reactions"
        :graphics-options="graphicsOptions"
        @activate="activate"
      >
        <component :is="tab.slots.anchor" v-if="tab.slots.anchor"></component>
      </RTabAnchor>
    </RSpace>
    <template v-if="content">
      <div
        v-for="tab in renderedItems"
        :key="keyOf(tab.value)"
        :class="['r-tabs__content', { 'is-active': internalModelValue === tab.value }]"
        role="tabpanel"
        :aria-expanded="internalModelValue === tab.value"
      >
        <component :is="tab.slots.default"></component>
      </div>
    </template>
    <slot></slot>
  </RSpace>
</template>

<style lang="scss">
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
