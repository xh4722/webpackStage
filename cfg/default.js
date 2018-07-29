const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');

const srcPath = path.resolve(__dirname, '../src/');
const staticPath = path.resolve(__dirname, '../static/');
const defaultPort = 9999;
const publicPath = '/dist/';

const babelConfig = require('../babel.config');

/* 开关：生产环境是否需要生成 sourceMap */
const productionSourceMap = false;

/* 进度跟踪插件 */
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
/* html 额外资源引入插件 */
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
/* js 多进程压缩插件 */
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
/* html 生成插件 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* CSS 抽离插件（由于会影响热替换，仅在发布环境使用） */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
    filename: 'style/cssStyle.[contenthash].css',
    allChunks: true
});
const extractSCSS = new ExtractTextPlugin({
    filename: 'style/scssStyle.[contenthash].css',
    allChunks: true
});
const extractLESS = new ExtractTextPlugin({
    filename: 'style/lessStyle.[contenthash].css',
    allChunks: true
});

/* 离线应用插件 */
const OfflinePlugin = require('offline-plugin');

/**
* 获取默认插件
* @method getDefaultPlugins
**/
function getDefaultPlugins() {
    return [
        new ProgressBarPlugin({
            format: `${chalk.cyan.bold('build')} ${chalk.green.bold(':percent')} ${chalk.yellow.bold('(:elapsed seconds)')} ${chalk.magenta.bold(':msg')}`,
            clear: false
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/vendor-manifest.json')
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ];
}

/**
* 获取生产、灰度环境所需插件
* @method getProductionPlugins
**/
function getProductionPlugins() {
    return [
        extractCSS,
        extractLESS,
        extractSCSS,
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('./build/vendor.dll.js'),
            hash: true,
            publicPath
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        }),
        new UglifyJsParallelPlugin({
            workers: require('os').cpus().length,
            mangle: true,
            exclude: /\.min\.js$/,
            output: { comments: false },
            sourceMap: productionSourceMap,
            minimize: true,
            compressor: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            title: 'webpackStage',
            template: './src/index_tpl.html',
            chunks: ['manifest', 'vendor.dll', 'app'],
            chunksSortMode: 'dependency'
        }),
        new OfflinePlugin()
    ];
}

/**
* 获取默认模块加载配置
* @method getDefaultModules
**/
function getDefaultModules() {
    /* 模块解析规则集 */
    let rules = [
        // eslint 检测js语法
        {
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: srcPath,
            loader: 'eslint-loader'
        },
        // 图片文件解析
        {
            test: /\.(png|jpg|gif|ico)$/,
            include: staticPath,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 51200
                    }
                }
            ]
        },
        // 字体文件解析
        {
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.otf($|\?)/,
            include: staticPath,
            use: [
                { loader: 'file-loader' }
            ]
        },
        // 音频文件解析
        {
            test: /\.(mp4|ogg|wav)$/,
            include: staticPath,
            use: [
                { loader: 'file-loader' }
            ]
        },
        // svg 文件解析
        {
            test: /\.(svg)$/,
            include: staticPath,
            use: [
                { loader: 'svg-url-loader' }
            ]
        },
        // html/tpl 文件解析
        {
            test: /\.(html|tpl)$/,
            include: srcPath,
            use: [
                { loader: 'html-loader' }
            ]
        }
    ];

    /* css 文件加载规则 */
    let cssRule = {
        test: /\.css$/,
        include: srcPath,
        use: [
            { loader: 'style-loader' },
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    module: true,
                    localIdentName: '[local]_[hash:base64:5]'
                }
            }
        ]
    };

    /* less 文件加载规则 */
    let lessRule = {
        test: /\.less$/,
        include: srcPath,
        use: [
            { loader: 'style-loader' },
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    module: true,
                    localIdentName: '[local]_[hash:base64:5]'
                }
            },
            { loader: 'less-loader' }
        ]
    };

    /* scss 文件加载规则 */
    let scssRule = {
        test: /\.(scss|sass)$/,
        include: srcPath,
        use: [
            { loader: 'style-loader' },
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    module: true,
                    localIdentName: '[local]_[hash:base64:5]'
                }
            },
            { loader: 'sass-loader' }
        ]
    };

    /* js 加载规则配置 */
    let jsRule = {
        test: /\.(js|jsx)$/,
        include: srcPath,
        exclude: function(path) {
            // 路径中含有 node_modules 的就不去解析。
            var isNpmModule = !!path.match(/node_modules/);
            return isNpmModule;
        },
        use: [
            {
                loader: 'babel-loader',
                options: babelConfig
            }
        ]
    };

    /* 开发环境 */
    if(process.env.REACT_WEBPACK_ENV == 'development') {
        // js 加载采用 happaypack loader
        //jsRule.use = 'happypack/loader?id=jsx';
    }/* 生产环境 */
    else if(process.env.REACT_WEBPACK_ENV == 'production') {
        // css、less、scss 加载采用 ExtractTextPlugin
        cssRule.use = extractCSS.extract({
            fallback: 'style-loader',
            use: cssRule.use
        });
        scssRule.use = extractSCSS.extract({
            fallback: 'style-loader',
            use: scssRule.use
        });
        lessRule.use = extractLESS.extract({
            fallback: 'style-loader',
            use: lessRule.use
        });
    }

    /* 加入配置项 */
    rules.push(jsRule);
    rules.push(cssRule);
    rules.push(scssRule);
    rules.push(lessRule);

    return {
        rules
    };
}

module.exports = {
    srcPath,
    staticPath,
    publicPath,
    port: defaultPort,
    getDefaultModules,
    getDefaultPlugins,
    getProductionPlugins,

    productionSourceMap,
    babelConfig
};
