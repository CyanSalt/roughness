import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { RConfirmProvider, RGridGuide, RToastProvider } from '../../../src'
import '../../../src/common/style.scss'
import './style.scss'

export default {
  ...DefaultTheme,
  Layout() {
    return h(RConfirmProvider, () => [
      h(RToastProvider, () => [
        h(DefaultTheme.Layout, null, {
          'layout-top': () => h(RGridGuide),
        }),
      ]),
    ])
  },
}
