import type { Plugin } from 'vue'
import { RCard, RDetails, RLink } from '../../../src'

export const markdownPlugin: Plugin = {
  install(app) {
    app.component('RCard', RCard)
    app.component('RDetails', RDetails)
    app.component('RLink', RLink)
  },
}
