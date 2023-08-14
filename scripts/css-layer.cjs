/**
 * @typedef Options
 * @property {string} name
 */

/**
 * @param {Options} options
 * @returns {import('postcss').Plugin}
 */
const plugin = options => {
  return {
    postcssPlugin: 'css-layer',
    Once: (root, { AtRule }) => {
      const layer = new AtRule({
        name: 'layer',
        params: options.name,
        nodes: root.nodes,
      })
      root.removeAll().append(layer)
    },
  }
}
plugin.postcss = true

module.exports = plugin
