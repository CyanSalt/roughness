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
  'text-color': string,
  'background-color': string,
  'primary-color': string,
  'info-color': string,
  'success-color': string,
  'warning-color': string,
  'error-color': string,
}

export const lightColors = {
  'text-color': '#44413c',
  'background-color': '#ffffff',
  'primary-color': '#0247fe',
  'info-color': '#2b4057',
  'success-color': '#11887b',
  'warning-color': '#9d6016',
  'error-color': '#ac3235',
}

export const darkColors = {
  'text-color': '#f4f4f0',
  'background-color': '#31343a',
  'primary-color': '#94c0cc',
  'info-color': '#a6aebb',
  'success-color': '#bcdf8a',
  'warning-color': '#dfc281',
  'error-color': '#ed7777',
}

export function useColors() {
  const dark = useDark()
  return computed(() => {
    return dark.value ? darkColors : lightColors
  })
}
