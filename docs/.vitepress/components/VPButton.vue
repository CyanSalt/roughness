<script lang="ts" setup>
import { EXTERNAL_URL_RE } from 'vitepress/dist/client/shared'
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

const isExternal = $computed(() => href && EXTERNAL_URL_RE.test(href))
</script>

<template>
  <RButton
    :tag="tag"
    :type="type"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noreferrer' : undefined"
    :class="['VPButton', size]"
  >{{ text }}</RButton>
</template>

<style lang="scss" scoped>
.VPButton.medium {
  font-size: 14px;
}
.VPButton.big {
  font-size: 16px;
}
</style>
