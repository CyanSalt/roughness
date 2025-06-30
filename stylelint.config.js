import config from '@cyansalt/stylelint-config'

export default {
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
