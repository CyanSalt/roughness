import type { Plugin } from 'vue'
import { RCard, RDetails, RLink, RTable } from '../../../src'

export const markdownPlugin: Plugin = {
  install(app) {
    app.component('RCard', RCard)
    app.component('RDetails', RDetails)
    app.component('RLink', RLink)
    app.component('RTable', RTable)
  },
}
