import { useMutationObserver } from '@vueuse/core'
import { computed, customRef } from 'vue'

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
  primaryColor: string,
  infoColor: string,
  successColor: string,
  warningColor: string,
  errorColor: string,
}

export const lightColors = {
  textColor: '#44413c',
  backgroundColor: '#ffffff',
  primaryColor: '#0247fe',
  infoColor: '#2b4057',
  successColor: '#11887b',
  warningColor: '#9d6016',
  errorColor: '#ac3235',
}

export const darkColors = {
  textColor: '#f4f4f0',
  backgroundColor: '#31343a',
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
