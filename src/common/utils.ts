import { useCurrentElement, useFocus, useFocusWithin, useMouseInElement, useMousePressed, useMutationObserver } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import { computed, customRef, unref } from 'vue'

export function useDark() {
  return customRef<boolean>((track, trigger) => {
    let dark = false
    // for SSR
    if (typeof document !== 'undefined') {
      useMutationObserver(document.documentElement, () => {
        dark = document.documentElement.classList.contains('dark')
        trigger()
      }, {
        attributes: true,
        attributeFilter: ['class'],
      })
    }
    return {
      get: () => {
        track()
        return dark
      },
      set: value => {
        document.documentElement.classList.toggle('dark', value)
      },
    }
  })
}

export interface Colors {
  textColor: string,
  backgroundColor: string,
  placeholderColor: string,
  commentColor: string,
  primaryColor: string,
  infoColor: string,
  successColor: string,
  warningColor: string,
  errorColor: string,
}

export const lightColors: Colors = {
  textColor: '#44413c',
  backgroundColor: '#ffffff',
  placeholderColor: '#44413c40',
  commentColor: '#44413c80',
  primaryColor: '#0247fe',
  infoColor: '#2b4057',
  successColor: '#11887b',
  warningColor: '#9d6016',
  errorColor: '#ac3235',
}

export const darkColors: Colors = {
  textColor: '#f4f4f0',
  backgroundColor: '#31343a',
  placeholderColor: '#f4f4f040',
  commentColor: '#f4f4f080',
  primaryColor: '#94c0cc',
  infoColor: '#a6aebb',
  successColor: '#bcdf8a',
  warningColor: '#dfc281',
  errorColor: '#ed7777',
}

export function useColors() {
  const dark = useDark()
  return computed(() => {
    return dark.value ? darkColors : lightColors
  })
}

export interface ColorProps {
  type?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'comment' | (string & {}),
}

export interface SizeProps {
  size?: 'small' | 'large' | (string & {}),
}

export interface ReactionState {
  hover: boolean,
  'hover-at': [number, number] | null,
  focus: boolean,
  'focus-within': boolean,
  active: boolean,
  dark: boolean,
}

export interface ReactionProps {
  reactions?: (keyof ReactionState)[],
}

export function useReactionState(
  reactions: MaybeRef<(keyof ReactionState)[]>,
  element?: MaybeRef<HTMLElement | null | undefined>,
) {
  const currentElement = element ?? useCurrentElement<HTMLElement>()
  const { elementX, elementY, isOutside } = useMouseInElement(currentElement)
  const { focused } = useFocus(currentElement)
  const { focused: focusedWithin } = useFocusWithin(currentElement)
  const { pressed } = useMousePressed({ target: currentElement })
  const dark = useDark()
  return () => Object.fromEntries(unref(reactions).map(reaction => {
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
      default:
        return [reaction, undefined]
    }
  })) as Partial<ReactionState>
}

export type ComponentProps<
  // Original tsc cannot derive components as constructor types
  // T extends abstract new (...args: any[]) => { $props: any },
  T,
> = T extends abstract new (...args: any[]) => { $props: infer U } ? {
  -readonly [P in keyof U]: U[P];
} : never
