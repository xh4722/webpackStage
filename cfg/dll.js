const webpack = require('webpack');
const path = require('path');

const UglifyJsParallelPlugin = require('webpack-uglify-parallel');

// 资源依赖包，提前编译
const vendors = [
    'moment',
    'reselect',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-dom',
    'react-router-redux',
    'redux',
    'redux-actions',
    'redux-saga'
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].dll.js',
        library: '[name]_[hash]'
    },
    plugins: [
        new UglifyJsParallelPlugin({
            workers: require('os').cpus().length,
            mangle: true,
            exclude: /\.min\.js$/,
            output: { comments: false },
            compressor: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'build', '[name]-manifest.json'),
            name: '[name]_[hash]',
            context: __dirname
        }),
        /* moment包精简（只使用中文语言包） */
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /zh-cn/)
    ]
};
