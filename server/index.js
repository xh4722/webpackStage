const path = require('path');
const webpack = require('webpack');
const express = require('express');

/* 开启 debug */
require('debug').enable('dev:server:*');
const debug = require('debug')('dev:server:start');

/* 代理插件语法糖（支持动态配置代理，无需重启服务器） */
const proxy = require('./middlewares/express-http-proxy-sugar/index');

const rootPath = path.resolve(__dirname, '../');

/* 获取 webpack 配置文件 */
const webpackConfigs = require(path.resolve(rootPath, './webpack.config'));

/* 获取服务配置文件 */
const serverConfig = require(path.resolve(__dirname, './config.js'));

webpackConfigs.forEach((config) => {
    const app = express();
    const defaultPort = config.devServer.port;

    /****************************************** 配置 express 中间件 ******************************************/
    /* webpack 开发插件 */
    const compiler = webpack(config);
    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        stats: {
            chunks: false,
            colors: true
        },
        debug: true,
        hot: true,
        lazy: false,
        historyApiFallback: true,
        poll: true
    });
    webpackDevMiddleware.waitUntilValid(() => {
        /* webpack 编译完成，打开主显 */
        if(serverConfig.openPage) {
            // windows
            if(process.platform == 'win32') {
                require('child_process').exec(`start ${serverConfig.openPage}`);
            }// mac
            else if(process.platform == 'darwin') {
                require('child_process').exec(`open ${serverConfig.openPage}`);
            }
        }
    });
    app.use(webpackDevMiddleware);
    /* webpack 热更新插件 */
    app.use(require('webpack-hot-middleware')(compiler));

    /* mock 数据插件 */
    app.use(require('./middlewares/mock-filter-middleware')({
        active: true,
        config: serverConfig.mock
    }));

    /****************************************** 资源路径配置 ******************************************/
    /* 根路径默认 html */
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(config.devServer.contentBase, './index.html'));
    });

    /* 静态资源配置（需要用到 DLLPlugin 打包出来的 dll.js） */
    app.use('/cfg', express.static(path.resolve(rootPath, './cfg/')));

    /****************************************** 代理配置 ******************************************/
    /* 根据配置文件配置 http 请求代理 */
    app.use('/*', proxy('/', {
        // 自定义属性（代理配置文件）
        _dynamicConfigPath: serverConfig.proxyConfigPath,
        proxyReqPathResolver: function(req) {
            return req.originalUrl;
        }
    }));

    /****************************************** 启动服务 ******************************************/
    /* 配置服务监听端口 */
    app.listen(defaultPort, (err) => {
        if (err) {
            debug(err);
            return;
        }

        debug(`Listening at http://localhost:${defaultPort}`);
    });
});
