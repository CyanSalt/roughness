import { useCurrentElement, useFocus, useFocusWithin, useMouseInElement, useMousePressed, useMutationObserver } from '@vueuse/core'
import { startCase } from 'lodash-es'
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
  textColor: '#383a42',
  backgroundColor: '#fafafa',
  placeholderColor: '#383a4240',
  commentColor: '#383a4280',
  primaryColor: '#4078f2',
  infoColor: '#0184bc',
  successColor: '#50a14f',
  warningColor: '#c18401',
  errorColor: '#ca1243',
}

export const darkColors: Colors = {
  textColor: '#abb2bf',
  backgroundColor: '#282c34',
  placeholderColor: '#abb2bf60',
  commentColor: '#abb2bf80',
  primaryColor: '#61aff0',
  infoColor: '#56b6c2',
  successColor: '#98c379',
  warningColor: '#e5c07b',
  errorColor: '#be5046',
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

export function sentenceCase(text: string) {
  return startCase(text).toLowerCase().replace(/\w/, matched => matched.toUpperCase())
}

export const RKey = Symbol('RKey')

export interface RValue {
  [RKey]: string | number,
}

export function keyOf(value: unknown) {
  return String(
    typeof value === 'string' || typeof value === 'number'
      ? value
      : (value as RValue)[RKey],
  )
}
