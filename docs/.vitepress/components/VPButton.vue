<script lang="ts" setup>
import { EXTERNAL_URL_RE } from 'vitepress/dist/client/shared'
import { RButton } from '../../../src'

const { tag, size: vpSize = 'medium', theme = 'brand', text, href } = defineProps<{
  tag?: string,
  size?: 'medium' | 'big',
  theme?: 'brand' | 'alt' | 'sponsor',
  text: string,
  href?: string,
}>()

const size = $computed(() => {
  switch (vpSize) {
    case 'big': return 'large'
    default: return undefined
  }
})

const type = $computed(() => {
  switch (theme) {
    case 'brand': return 'primary'
    default: return undefined
  }
})

const isExternal = $computed(() => href && EXTERNAL_URL_RE.test(href))
</script>

<template>
  <RButton
    :tag="tag"
    :type="type"
    :size="size"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="VPButton"
  >{{ text }}</RButton>
</template>
