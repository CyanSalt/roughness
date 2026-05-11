import config from '@cyansalt/stylelint-config'

export default {
  rules: {},
  overrides: config({
    configs: [
      {
        files: ['**/*'],
        rules: {
          'value-keyword-case': null,
        },
      },
    ],
  }),
}
