import config from '@cyansalt/eslint-config'

export default config({
  configs: [
    {
      languageOptions: {
        parserOptions: {
          project: [
            './docs/tsconfig.json',
            './tsconfig.app.json',
            './tsconfig.node.json',
          ],
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
