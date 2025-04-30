import path from 'node:path'
import config from '@cyansalt/eslint-config'

export default config({
  configs: [
    {
      languageOptions: {
        parserOptions: {
          project: path.resolve(import.meta.dirname, './tsconfig.tools.json'),
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
