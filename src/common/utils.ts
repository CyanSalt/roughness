import { useMutationObserver } from '@vueuse/core'
import { ref } from 'vue'

export function useDark() {
  let dark = ref(false)
  // for SSR
  if (typeof document !== 'undefined') {
    useMutationObserver(document.documentElement, () => {
      dark.value = document.documentElement.classList.contains('dark')
    }, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }
  return dark
}
