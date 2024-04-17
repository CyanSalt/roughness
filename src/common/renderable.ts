import { isObjectLike } from 'lodash-es'
import type { RenderFunction, VNodeChild } from 'vue'

export type ComponentProps<
  // Original tsc cannot derive components as constructor types
  // T extends abstract new (...args: any[]) => { $props: any },
  T,
> = T extends abstract new (...args: any[]) => { $props: infer U } ? {
  -readonly [P in keyof U]: U[P];
} : never

export type ComponentSlots<
  // Original tsc cannot derive components as constructor types
  // T extends abstract new (...args: any[]) => { $slots: any },
  T,
> = T extends abstract new (...args: any[]) => { $slots: infer U } ? U : never

type ComponentRenderableSlot = Exclude<VNodeChild, object> | RenderFunction

function toRenderFunction(slot: ComponentRenderableSlot) {
  return typeof slot === 'function' ? slot : () => slot
}

type ComponentRenderableSlots<T> = Record<keyof ComponentSlots<T>, ComponentRenderableSlot>

export type ComponentRenderable<T> = ComponentRenderableSlot | ComponentRenderableSlots<T>

function isComponentRenderableSlots<T>(renderable: ComponentRenderable<T>): renderable is ComponentRenderableSlots<T> {
  return isObjectLike(renderable)
}

export type SlotsLike<T> = Record<keyof ComponentSlots<T>, RenderFunction>

export function toSlotsLike<T>(renderable: ComponentRenderable<T>) {
  return isComponentRenderableSlots(renderable)
    ? Object.fromEntries(
      Object.entries<ComponentRenderableSlot>(renderable).map(
        ([name, slot]) => [name, toRenderFunction(slot)],
      ),
    ) as SlotsLike<T>
    : { default: toRenderFunction(renderable) } as SlotsLike<T>
}
