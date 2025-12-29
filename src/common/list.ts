import type { InjectionKey, MaybeRefOrGetter, VNode, VNodeArrayChildren } from 'vue'
import { computed, defineComponent, inject, isVNode, provide, reactive, toValue, watchEffect } from 'vue'

export interface ListItemProps {
  /**
   * List item index
   * @internal
   */
  rIndex?: number,
}

export function useList<T>(injection: InjectionKey<T[]>) {
  const list = reactive<T[]>([])
  provide(injection, list as T[])
  return computed(() => {
    // Avoid holes in list
    const flags = list.map(() => true)
    return list.filter((_, index) => flags[index])
  })
}

export function useListItem<T extends ListItemProps>(injection: InjectionKey<T[]>, source: MaybeRefOrGetter<T>) {
  const list = inject(injection, undefined)
  watchEffect(onInvalidate => {
    if (!list) return
    const item = toValue(source)
    if (typeof item.rIndex === 'number') {
      list[item.rIndex] = item
    } else {
      list.push(item)
    }
    onInvalidate(() => {
      const index = list.indexOf(item)
      if (index !== -1) {
        list.splice(index, 1)
      }
    })
  })
  return list
}

function filterVNodes(nodes: VNodeArrayChildren, filter: (node: VNode) => unknown): VNode[] {
  return nodes.flatMap(node => {
    if (Array.isArray(node)) {
      return filterVNodes(node, filter)
    } else if (isVNode(node)) {
      if (filter(node)) {
        return [node]
      }
      const children = node.children
      if (Array.isArray(children)) {
        return filterVNodes(children, filter)
      }
      const subtree = node.component?.subTree
      if (subtree) {
        return filterVNodes([subtree], filter)
      }
    }
    return []
  })
}

export const RListRenderer = defineComponent((props, { slots }) => {
  return () => {
    const include = props.include
    const nodes = slots.default?.({})
    if (!nodes) return nodes
    let componentIndex = -1
    const filtered = filterVNodes(nodes, node => !include || node.type && node.type['name'] === include)
    for (const node of filtered) {
      componentIndex += 1
      node.props ??= {}
      node.props.rIndex = componentIndex
    }
    return nodes
  }
}, {
  props: {
    include: {
      type: String,
    },
  },
})
