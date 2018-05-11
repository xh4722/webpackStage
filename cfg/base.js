const path = require('path');
const defaultSettings = require('./default');

/* 获取默认端口号、发布路径 */
let { port, publicPath } = defaultSettings;

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'app.js',
        publicPath
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../src/'),
        historyApiFallback: true,
        hot: true,
        port,
        publicPath,
        noInfo: false
    },
    resolve: {
        symlinks: false,
        extensions: ['.js', '.jsx'],
        alias: {
            pages: `${defaultSettings.srcPath}/pages/`,
            actions: `${defaultSettings.srcPath}/actions/`,
            utils: `${defaultSettings.srcPath}/utils/`
        }
    }
}
