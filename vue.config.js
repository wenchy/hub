module.exports = {
    pluginOptions: {
        electronBuilder: {
            // refer； https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#preload-files
            preload: 'src/preload.js',
            // Or, for multiple preload files:
            // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
        }
    }
}