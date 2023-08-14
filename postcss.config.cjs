module.exports = {
  plugins: {
    [require.resolve('./scripts/css-layer.cjs')]: {
      name: 'roughness',
    },
  },
}
