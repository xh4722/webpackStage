const path = require('path');

const baseConfig = require('./base');
const defaultSettings = require('./default');

let config = Object.assign({}, baseConfig, {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, '../src/index')
        ],
        devtool: defaultSettings.productionSourceMap ? 'hidden-source-map' : false,
    },
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].bundle.js',
        publicPath: defaultSettings.publicPath
    },
    plugins: [
        ...defaultSettings.getDefaultPlugins(),
        ...defaultSettings.getProductionPlugins()
    ],
    module: defaultSettings.getDefaultModules()
});

module.exports = config;
