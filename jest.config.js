module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // Agrega transformación personalizada
  transformIgnorePatterns: ['/node_modules/(?!axios)'],
}
