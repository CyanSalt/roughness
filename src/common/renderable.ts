import { isObjectLike } from 'lodash-es'
import type { RenderFunction } from 'vue'

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

type ComponentRenderableSlot = string | number | boolean | null | undefined | RenderFunction

type ComponentRenderableSlots<T> = Record<keyof ComponentSlots<T>, ComponentRenderableSlot>

export type ComponentRenderFunctions<T> = Record<keyof ComponentSlots<T>, RenderFunction>

export type ComponentRenderable<T> = ComponentRenderableSlot | ComponentRenderableSlots<T>

function isComponentRenderableSlots<T>(renderable: ComponentRenderable<T>): renderable is ComponentRenderableSlots<T> {
  return isObjectLike(renderable)
}

function getComponentRenderFunction(slot: ComponentRenderableSlot) {
  return typeof slot === 'function' ? slot : () => slot
}

export function getComponentRenderFunctions<T>(renderable: ComponentRenderable<T>) {
  return isComponentRenderableSlots(renderable)
    ? Object.fromEntries(
      Object.entries<ComponentRenderableSlot>(renderable).map(
        ([name, slot]) => [name, getComponentRenderFunction(slot)],
      ),
    ) as ComponentRenderFunctions<T>
    : { default: getComponentRenderFunction(renderable) } as ComponentRenderFunctions<T>
}
