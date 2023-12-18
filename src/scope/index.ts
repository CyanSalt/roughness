import { defineComponent } from 'vue'

const camelizeRE = /-(\w)/g
function camelize(name: string) {
  return name.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

function normalizeAttrs(attrs: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(attrs).map(([key, value]) => [camelize(key), value]),
  )
}

export default defineComponent((props, context) => {
  return () => context.slots.default?.(normalizeAttrs(context.attrs))
})
