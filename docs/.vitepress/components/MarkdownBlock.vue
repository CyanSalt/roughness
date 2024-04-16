<script lang="ts" setup>
import markdownit from 'markdown-it'
import { computed } from 'vue'

const {
  source = '',
  inline = false,
} = defineProps<{
  /** Markdown source code */
  source?: string,
  /** Whether to render markdown into single paragraph content */
  inline?: boolean,
}>()

const md = markdownit({ html: true })

const markdown = computed(() => {
  if (!source) return source
  return inline ? md.renderInline(source) : md.render(source)
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html, vue/no-v-text-v-html-on-component -->
  <component :is="inline ? 'span' : 'div'" class="markdown-block" v-html="markdown"></component>
</template>
