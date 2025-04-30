<script lang="ts" setup>
import type { Spec } from 'comment-parser'
import { RScope, RText } from '../../../src'
import { data } from '../loaders/vue.data'
import type { CSSVar } from '../parser/scss'
import MarkdownBlock from './MarkdownBlock.vue'
import REvent from './REvent.vue'
import REventsTable from './REventsTable.vue'
import RProp from './RProp.vue'
import RPropsTable from './RPropsTable.vue'
import RSlot from './RSlot.vue'
import RSlotsTable from './RSlotsTable.vue'
import RStyle from './RStyle.vue'
import RStylesTable from './RStylesTable.vue'

defineOptions({
  name: 'RUsage',
})

const {
  file,
  props = undefined,
  events = undefined,
  slots = undefined,
  styles = undefined,
} = defineProps<{
  file: string,
  props?: boolean,
  events?: boolean,
  slots?: boolean,
  styles?: boolean,
}>()

defineSlots<{
  title?: (props: { title: string }) => any,
  props?: (props: {}) => any,
  events?: (props: {}) => any,
  slots?: (props: {}) => any,
  styles?: (props: {}) => any,
}>()

const result = $computed(() => {
  return data.find(item => item.file === file)?.result
})

const isPrimary = $computed(() => {
  return file.endsWith('index.vue')
})

function title(text: string) {
  if (isPrimary) return text
  const name = result?.options?.name
  return name ? `${name.replace(/^R(?=[A-Z])/, '')} ${text}` : text
}

function type(tags: Spec[] | undefined) {
  const specs = tags?.filter(tag => tag.tag === 'type')
  return specs && specs.length > 1 ? specs.map(spec => spec?.type) : specs?.[0]?.type
}

function defaultValue(tags: Spec[] | undefined, value?: string) {
  const specs = tags?.filter(tag => tag.tag === 'default')
  if (!specs?.length) return value ? inlineCode(value) : undefined
  return [
    ...specs.map(spec => (spec.name ? `${inlineCode(spec.name)} ${spec.description}` : inlineCode(spec.description))),
    ...(value ? [`${inlineCode(value)} else`] : []),
  ].join(', ')
}

function ignore(tags: Spec[] | undefined) {
  return tags?.some(tag => tag.tag === 'ignore')
}

function concat<T>(arr1: T[] | undefined, arr2: T[] | undefined) {
  return arr1 || arr2 ? [...(arr1 ?? []), ...(arr2 ?? [])] : undefined
}

function filterVars(cssVars: CSSVar[]) {
  return cssVars.filter(cssVar => {
    const matches = cssVar.defaultValue.match(/^var\((?<name>--r-[a-z-]+)\s*,\s*(?<default>.+)\)$/)
    return matches && cssVar.name === `--R-${matches.groups!.name.slice(4)}`
  })
}

function uniqueVars(cssVars: CSSVar[]) {
  const processed = cssVars.reduce((map, cssVar) => {
    if (map.has(cssVar.name)) {
      const existing = map.get(cssVar.name)!
      map.set(cssVar.name, {
        ...existing,
        tags: concat(existing.tags, cssVar.tags),
        description: concat(existing.description, cssVar.description),
      })
    } else {
      map.set(cssVar.name, cssVar)
    }
    return map
  }, new Map<string, CSSVar>())
  return Array.from(processed.values())
}

function publicName(nameOrValue: string) {
  return nameOrValue.replace(/--R-/g, '--r-')
}

function guessType(name: string) {
  if (/-color$/.test(name)) return '<color>'
}

function fallback(value: string) {
  const matches = value.match(/^var\([^,]+,\s*(?<default>.+)\)$/)
  return matches ? publicName(matches.groups!.default) : value
}

function inlineCode(text: string | string[] | undefined) {
  if (!text) return text
  if (Array.isArray(text)) {
    return text.map(item => inlineCode(item)).join('\n\n')
  }
  return `\`${text.replace(/(?!<\\)`/g, '\\`')}\``
}

function paragraph(text: string | undefined) {
  return text?.split('\n')
    .map(line => line || '<br>')
    .join('\n\n')
}
</script>

<template>
  <template v-if="props ?? result?.props?.length">
    <slot name="title" :title="title('Props')">
      <h3>{{ title('Props') }}</h3>
    </slot>
    <RPropsTable>
      <template
        v-for="prop in result?.props ?? []"
        :key="prop.name"
      >
        <RProp v-if="!ignore(prop.tags)" :name="prop.name">
          <template #type>
            <MarkdownBlock inline :source="inlineCode(type(prop.tags) ?? prop.type)" />
          </template>
          <template #default-value>
            <RText v-if="prop.required" type="error">Required</RText>
            <MarkdownBlock v-else-if="prop.defaultValue" inline :source="inlineCode(prop.defaultValue)" />
            <RScope v-else v-slot="{ defaults }" :defaults="defaultValue(prop.tags)" :tags="prop.tags">
              <MarkdownBlock v-if="defaults" inline :source="defaults" />
            </RScope>
          </template>
          <template v-if="prop.description">
            <MarkdownBlock
              v-for="(desc, index) in prop.description"
              :key="index"
              :source="paragraph(desc)"
            />
          </template>
        </RProp>
      </template>
      <slot name="props"></slot>
    </RPropsTable>
  </template>
  <template v-if="events ?? result?.emits?.length">
    <slot name="title" :title="title('Events')">
      <h3>{{ title('Events') }}</h3>
    </slot>
    <REventsTable>
      <template
        v-for="emit in result?.emits ?? []"
        :key="emit.name"
      >
        <REvent v-if="!ignore(emit.tags)" :name="emit.name">
          <template #type>
            <MarkdownBlock inline :source="inlineCode(type(emit.tags) ?? emit.type)" />
          </template>
          <template v-if="emit.description">
            <MarkdownBlock
              v-for="(desc, index) in emit.description"
              :key="index"
              :source="paragraph(desc)"
            />
          </template>
        </REvent>
      </template>
      <slot name="events"></slot>
    </REventsTable>
  </template>
  <template v-if="slots ?? result?.slots?.length">
    <slot name="title" :title="title('Slots')">
      <h3>{{ title('Slots') }}</h3>
    </slot>
    <RSlotsTable>
      <template
        v-for="slot in result?.slots || []"
        :key="slot.name"
      >
        <RSlot v-if="!ignore(slot.tags)" :name="slot.name">
          <template #type>
            <MarkdownBlock inline :source="inlineCode(type(slot.tags) ?? slot.type)" />
          </template>
          <template v-if="slot.description">
            <MarkdownBlock
              v-for="(desc, index) in slot.description"
              :key="index"
              :source="paragraph(desc)"
            />
          </template>
        </RSlot>
      </template>
      <slot name="slots"></slot>
    </RSlotsTable>
  </template>
  <template v-if="styles ?? result?.cssVars?.length">
    <slot name="title" :title="title('Styles')">
      <h3>{{ title('Styles') }}</h3>
    </slot>
    <RStylesTable>
      <template
        v-for="cssVar in uniqueVars(filterVars(result?.cssVars ?? []))"
        :key="cssVar.name"
      >
        <RStyle v-if="!ignore(cssVar.tags)" :name="publicName(cssVar.name)">
          <template #type>
            <MarkdownBlock inline :source="inlineCode(type(cssVar.tags) ?? guessType(cssVar.name))" />
          </template>
          <template #default-value>
            <MarkdownBlock inline :source="defaultValue(cssVar.tags, fallback(cssVar.defaultValue))" />
          </template>
          <template v-if="cssVar.description">
            <MarkdownBlock
              v-for="(desc, index) in cssVar.description"
              :key="index"
              :source="paragraph(desc)"
            />
          </template>
        </RStyle>
      </template>
      <slot name="styles"></slot>
    </RStylesTable>
  </template>
</template>
