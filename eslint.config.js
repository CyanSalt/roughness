import config from '@cyansalt/eslint-config'

export default config({
  configs: [
    {
      languageOptions: {
        parserOptions: {
          project: './tsconfig.tools.json',
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
  ],
})
