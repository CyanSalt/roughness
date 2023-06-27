import type { Plugin } from 'vue'
import * as components from './components'

export default {
  install(app) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  },
} satisfies Plugin<unknown[]>
