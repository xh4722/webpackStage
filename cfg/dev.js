const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./base')
const defaultSettings = require('./default')

/* happypack 多进程编译 */
const HappyPack = require('happypack')
// 启动线程池
const HappyThreadPool = HappyPack.ThreadPool({
  size: require('os').cpus().length,
})

/* 开发环境 babel 配置 */
let babelConfig = defaultSettings.babelConfig

let config = Object.assign({}, baseConfig, {
  entry: [
    'babel-polyfill',
    `webpack-hot-middleware/client?path=http://localhost:${
      defaultSettings.port
    }/__webpack_hmr`,
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index'),
  ],
  devtool: 'eval-source-map',
  module: defaultSettings.getDefaultModules(),
  plugins: [
    ...defaultSettings.getDefaultPlugins(),
    // 定义开发环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),

    /* HMR 热替换配置 */
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new HappyPack({
      id: 'jsx',
      threadPool: HappyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          query: babelConfig,
        },
      ],
    }),
  ],
})

module.exports = config
