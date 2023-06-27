import { fileURLToPath, URL } from 'node:url'
import reactivityTransform from '@vue-macros/reactivity-transform/vite'
import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

export default defineConfig({
  title: 'Roughness',
  description: pkg.description,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/installation', activeMatch: '^/guide/' },
      { text: 'Components', link: '/components/button', activeMatch: '^/components/' },
    ],
    sidebar: {
      '/components/': [
        {
          text: 'Basic',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Space', link: '/components/space' },
          ],
        },
        {
          text: 'Form',
          items: [],
        },
        {
          text: 'Data',
          items: [],
        },
        {
          text: 'Navigation',
          items: [],
        },
        {
          text: 'Feedback',
          items: [],
        },
        {
          text: 'Configuration',
          items: [],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CyanSalt/roughness' },
    ],
    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2017-present CyanSalt',
    },
    search: {
      provider: 'local',
    },
  },
  vite: {
    plugins: [
      reactivityTransform(),
    ],
    resolve: {
      alias: [
        {
          find: 'roughness',
          replacement: fileURLToPath(
            new URL('../../src', import.meta.url),
          ),
        },
        {
          find: /^.*\/VPButton\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/VPButton.vue', import.meta.url),
          ),
        },
      ],
    },
  },
})
