<script lang="ts" setup generic="T extends string[] | number">
import type { RefValue } from '@vue-macros/reactivity-transform/macros'
import { startCase } from 'lodash-es'
import { watch, watchEffect } from 'vue'
import type { GraphicsProps } from '../graphics/utils'
import RSpace from '../space/index.vue'
import RTabAnchor from './tab-anchor.vue'

type Tab = T extends string[] ? string : number

defineOptions({
  name: 'RTabs',
})

const {
  content = true,
  modelValue,
  tabs,
  reactions,
  graphicsOptions,
} = defineProps<{
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

let internalModelValue = $ref(modelValue) as typeof modelValue

watchEffect(() => {
  internalModelValue = modelValue
})

watch($$(internalModelValue as RefValue<typeof modelValue>), currentValue => {
  emit('update:modelValue', currentValue)
})

watchEffect(() => {
  if (typeof tabs === 'number') {
    if (tabs === 0) {
      internalModelValue = undefined
    } else if (!internalModelValue || internalModelValue as number <= 0) {
      internalModelValue = 1 as Tab
    } else if (internalModelValue as number > tabs) {
      internalModelValue = tabs as number as Tab
    }
  } else {
    if (!tabs.length) {
      internalModelValue = undefined
    } else if (!internalModelValue || !tabs.includes(internalModelValue as string)) {
      internalModelValue = tabs[0] as Tab
    }
  }
})

function activate(tab: Tab) {
  internalModelValue = tab
}
</script>

<template>
  <RSpace vertical :wrap="false" class="r-tabs">
    <RSpace class="r-tabs__anchors" role="tablist">
      <RTabAnchor
        v-for="tab in tabs"
        :key="tab"
        :active="tab === internalModelValue"
        :tab="tab"
        :reactions="reactions"
        :graphics-options="graphicsOptions"
        @activate="activate"
      >
        <slot :name="`anchor:${tab as Tab}`" :tab="tab">
          <slot name="anchor:*" :tab="tab">{{ startCase(tab) }}</slot>
        </slot>
      </RTabAnchor>
    </RSpace>
    <div v-if="content" class="r-tabs__content" role="tabpanel" aria-expanded="true">
      <slot v-if="internalModelValue" :name="`content:${internalModelValue}`" :tab="(internalModelValue as Tab)">
        <slot name="content:*" :tab="(internalModelValue as Tab)"></slot>
      </slot>
      <slot v-else name="content:*" :tab="(internalModelValue as Tab)"></slot>
    </div>
  </RSpace>
</template>

<style lang="scss" scoped>
.r-tabs__anchors {
  margin-block: 0;
  padding-inline: 0;
  list-style-type: none;
}
</style>
