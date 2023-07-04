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
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'Theme', link: '/guide/theme' },
          { text: 'Chart', link: '/guide/chart' },
        ],
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Basic',
            items: [
              { text: 'Button', link: '/components/button' },
              { text: 'Details', link: '/components/details' },
              { text: 'Graphics', link: '/components/graphics' },
              { text: 'Grid Guide', link: '/components/grid-guide' },
              { text: 'Link', link: '/components/link' },
              { text: 'Space', link: '/components/space' },
              { text: 'Text', link: '/components/text' },
            ],
          },
          {
            text: 'Form',
            items: [
              { text: 'Checkbox', link: '/components/checkbox' },
              { text: 'Select', link: '/components/select' },
              { text: 'Switch', link: '/components/switch' },
            ],
          },
          {
            text: 'Data',
            items: [
              { text: 'Table', link: '/components/table' },
            ],
          },
          {
            text: 'Navigation',
            items: [],
          },
          {
            text: 'Feedback',
            items: [
              { text: 'Alert', link: '/components/alert' },
            ],
          },
        ],
      },
    ],
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
    outline: [2, 3],
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
