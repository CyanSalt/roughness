import { useCurrentElement, useFocus, useFocusWithin, useInterval, useMouseInElement, useMousePressed } from '@vueuse/core'
import type { MaybeRef, MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { useDark } from './theme'

export interface ReactionState {
  hover: boolean,
  'hover-at': [number, number] | null,
  focus: boolean,
  'focus-within': boolean,
  active: boolean,
  dark: boolean,
  time: number,
}

export interface ReactionProps {
  /** States that trigger graphics redrawing */
  reactions?: (keyof ReactionState)[],
}

export function useReactionState(
  reactions: MaybeRefOrGetter<(keyof ReactionState)[]>,
  element?: MaybeRef<HTMLElement | null | undefined>,
) {
  const currentElement = element ?? useCurrentElement<HTMLElement>()
  const { elementX, elementY, isOutside } = useMouseInElement(currentElement)
  const { focused } = useFocus(currentElement)
  const { focused: focusedWithin } = useFocusWithin(currentElement)
  const { pressed } = useMousePressed({ target: currentElement })
  const counter = useInterval(200)
  const dark = useDark()
  return () => Object.fromEntries(toValue(reactions).map(reaction => {
    switch (reaction) {
      case 'hover':
        return [reaction, !isOutside.value]
      case 'hover-at':
        return [reaction, isOutside.value ? null : [elementX.value, elementY.value]]
      case 'focus':
        return [reaction, focused.value]
      case 'focus-within':
        return [reaction, focusedWithin.value]
      case 'active':
        return [reaction, pressed.value]
      case 'dark':
        return [reaction, dark.value]
      case 'time':
        return [reaction, counter.value]
      default:
        return [reaction, undefined]
    }
  })) as Partial<ReactionState>
}
