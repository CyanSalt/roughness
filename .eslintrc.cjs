module.exports = {
  root: true,
  extends: [
    '@cyansalt/preset',
  ],
  parserOptions: {
    project: './tsconfig.tools.json',
  },
  globals: {
    ToggleEvent: 'readonly',
  },
  rules: {
    'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
    'vue/no-undef-components': 'error',
    'vue/no-undef-properties': 'error',
    'vue/match-component-file-name': 'off',
    // 'vue-scoped-css/enforce-style-type': ['error', { allows: ['plain'] }],
  },
}
