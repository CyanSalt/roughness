<script lang="ts" setup>
import { RButton } from '../../../src'

const { tag, size = 'medium', theme = 'brand', text, href } = defineProps<{
  tag?: string,
  size?: 'medium' | 'big',
  theme?: 'brand' | 'alt' | 'sponsor',
  text: string,
  href?: string,
}>()

const type = $computed(() => {
  switch (theme) {
    case 'brand': return 'primary'
    default: return 'default'
  }
})
</script>

<template>
  <RButton :tag="tag" :type="type" :href="href" :class="['VPButton', size]">{{ text }}</RButton>
</template>

<style lang="scss" scoped>
.VPButton.medium {
  padding: 0 20px;
  font-size: 14px;
  line-height: 38px;
}
.VPButton.big {
  padding: 0 24px;
  font-size: 16px;
  line-height: 46px;
}
</style>
