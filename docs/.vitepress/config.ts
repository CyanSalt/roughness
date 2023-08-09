import { fileURLToPath, URL } from 'node:url'
import reactivityTransform from '@vue-macros/reactivity-transform/vite'
import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

export default defineConfig({
  title: 'Roughness',
  description: pkg.description,
  head: [
    ['link', { rel: 'icon', href: '/r.svg' }],
    ['link', { rel: 'icon', href: '/r-dark.svg', media: '(prefers-color-scheme: dark)' }],
  ],
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
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
          { text: 'Specs', link: '/guide/specs' },
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
              { text: 'Divider', link: '/components/divider' },
              { text: 'Graphics', link: '/components/graphics' },
              { text: 'Grid Guide', link: '/components/grid-guide' },
              { text: 'Icon', link: '/components/icon' },
              { text: 'Link', link: '/components/link' },
              { text: 'Space', link: '/components/space' },
              { text: 'Text', link: '/components/text' },
            ],
          },
          {
            text: 'Form',
            items: [
              { text: 'Checkbox', link: '/components/checkbox' },
              { text: 'Color Picker', link: '/components/color-picker' },
              { text: 'Form', link: '/components/form' },
              { text: 'Input', link: '/components/input' },
              { text: 'Rate', link: '/components/rate' },
              { text: 'Select', link: '/components/select' },
              { text: 'Slider', link: '/components/slider' },
              { text: 'Switch', link: '/components/switch' },
              { text: 'Upload', link: '/components/upload' },
            ],
          },
          {
            text: 'Data',
            items: [
              { text: 'Card', link: '/components/card' },
              { text: 'List', link: '/components/list' },
              { text: 'Table', link: '/components/table' },
            ],
          },
          {
            text: 'Navigation',
            items: [
              { text: 'Tabs', link: '/components/tabs' },
            ],
          },
          {
            text: 'Feedback',
            items: [
              { text: 'Alert', link: '/components/alert' },
              { text: 'Badge', link: '/components/badge' },
              { text: 'Confirm', link: '/components/confirm' },
              { text: 'Dialog', link: '/components/dialog' },
              { text: 'Drawer', link: '/components/drawer' },
              { text: 'Loading', link: '/components/loading' },
              { text: 'Popover', link: '/components/popover' },
              { text: 'Progress', link: '/components/progress' },
              { text: 'Toast', link: '/components/toast' },
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
