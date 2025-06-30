import path from 'node:path'
import config from '@cyansalt/eslint-config'

export default config({
  configs: [
    {
      languageOptions: {
        parserOptions: {
          project: [
            './docs/tsconfig.json',
            './docs/tsconfig.test.json',
            './tsconfig.app.json',
            './tsconfig.node.json',
          ].map(file => path.resolve(import.meta.dirname, file)),
          extraFileExtensions: ['.vue'],
        },
        globals: {
          ToggleEvent: 'readonly',
        },
      },
    },
    {
      files: ['src/**/*'],
      rules: {
        'galaxy/valid-vue-reactivity-transform-props': 'off',
        'vue/no-undef-components': 'error',
        'vue/no-undef-properties': 'error',
        'vue/match-component-file-name': 'off',
        'vue-scoped-css/enforce-style-type': ['error', { allows: ['plain'] }],
      },
    },
    {
      files: [
        // Unit test
        'docs/**/cache/*.vue',
      ],
      rules: {
        'vue/max-len': 'off',
        'vue/no-static-inline-styles': 'off',
      },
    },
  ],
})
