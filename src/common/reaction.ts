import { useCurrentElement, useFocus, useFocusWithin, useMouseInElement, useMousePressed } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import { useDark } from './theme'

export interface ReactionState {
  hover: boolean,
  focus: boolean,
  'focus-within': boolean,
  active: boolean,
  dark: boolean,
}

export interface ReactionProps {
  /** States that trigger graphics redrawing */
  reactions?: (keyof ReactionState)[],
}

export function useReactionState(
  element?: MaybeRef<HTMLElement | null | undefined>,
) {
  const currentElement = element ?? useCurrentElement<HTMLElement>()
  const { isOutside } = useMouseInElement(currentElement)
  const { focused } = useFocus(currentElement)
  const { focused: focusedWithin } = useFocusWithin(currentElement)
  const { pressed } = useMousePressed({ target: currentElement })
  const dark = useDark()
  return (reactions: (keyof ReactionState)[]) => Object.fromEntries(reactions.map(reaction => {
    switch (reaction) {
      case 'hover':
        return [reaction, !isOutside.value]
      case 'focus':
        return [reaction, focused.value]
      case 'focus-within':
        return [reaction, focusedWithin.value]
      case 'active':
        return [reaction, pressed.value]
      case 'dark':
        return [reaction, dark.value]
      default:
        return [reaction, undefined]
    }
  })) as Partial<ReactionState>
}
