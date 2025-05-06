import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { RConfirmProvider, RGridGuide, RToastProvider } from '../../../src'
import REvent from '../components/REvent.vue'
import REventsTable from '../components/REventsTable.vue'
import RProp from '../components/RProp.vue'
import RPropsTable from '../components/RPropsTable.vue'
import RSlot from '../components/RSlot.vue'
import RSlotsTable from '../components/RSlotsTable.vue'
import RStyle from '../components/RStyle.vue'
import RStylesTable from '../components/RStylesTable.vue'
import RUsage from '../components/RUsage.vue'
import '../../../src/common/style.scss'
import { markdownPlugin } from '../markdown/roughness-runtime'

import './style.scss'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(RConfirmProvider, () => [
      h(RToastProvider, () => [
        h(DefaultTheme.Layout, null, {
          'layout-bottom': () => h(RGridGuide),
        }),
      ]),
    ])
  },
  enhanceApp({ app }) {
    app.use(markdownPlugin)
    app.component('RUsage', RUsage)
    app.component('RProp', RProp)
    app.component('RPropsTable', RPropsTable)
    app.component('REvent', REvent)
    app.component('REventsTable', REventsTable)
    app.component('RSlot', RSlot)
    app.component('RSlotsTable', RSlotsTable)
    app.component('RStyle', RStyle)
    app.component('RStylesTable', RStylesTable)
  },
}
