import { useMutationObserver } from '@vueuse/core'
import { computed, customRef } from 'vue'

export function useDark() {
  return customRef<boolean>((track, trigger) => {
    let dark = false
    // for SSR
    if (typeof document !== 'undefined') {
      dark = document.documentElement.classList.contains('dark')
      useMutationObserver(document.documentElement, entries => {
        dark = (entries[0].target as HTMLElement).classList.contains('dark')
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
