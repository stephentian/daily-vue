module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    "transform-vue-jsx",
    ["import", {
      "libraryName": "vant",
      "style": true
    }]
  ]
}