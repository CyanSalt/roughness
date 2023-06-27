import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { RGridGuide } from '../../../src'
import '../../../src/common/style.scss'
import './style.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(RGridGuide),
    })
  },
}
