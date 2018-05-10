'use strict';

// ROADMAP: Major refactoring April 2017
// It would be easier to follow if we extract to simpler functions, and used
// a standard, step-wise set of filters with clearer edges and borders.  It
// would be more useful if authors could use Promises for all over-rideable
// steps.

// complete: Break workflow into composable steps without changing them much
// complete: extract workflow methods from main file
// complete: cleanup options interface
// complete: change hook names to be different than the workflow steps.
// *: cleanup host is processed twice
// *: cleanup workflow methods so they all present as over-rideable thennables
// *: Update/add tests to unit test workflow steps independently
// complete: update docs and release

var fs = require('fs');
var ScopeContainer = require('./lib/scopeContainer');

var buildProxyReq                = require('./app/steps/buildProxyReq');
var copyProxyResHeadersToUserRes = require('./app/steps/copyProxyResHeadersToUserRes');
var decorateProxyReqBody         = require('./app/steps/decorateProxyReqBody');
var decorateProxyReqOpts         = require('./app/steps/decorateProxyReqOpts');
var decorateUserRes              = require('./app/steps/decorateUserRes');
var decorateUserResHeaders       = require('./app/steps/decorateUserResHeaders');
var maybeSkipToNextHandler       = require('./app/steps/maybeSkipToNextHandler');
var prepareProxyReq              = require('./app/steps/prepareProxyReq');
var resolveProxyHost             = require('./app/steps/resolveProxyHost');
var resolveProxyReqPath          = require('./app/steps/resolveProxyReqPath');
var sendProxyRequest             = require('./app/steps/sendProxyRequest');
var sendUserRes                  = require('./app/steps/sendUserRes');

/**
* js 文件动态读取函数
* @method readJSFile
* @param {String} filename
**/
function readJSFile(filename) {
    let cache = readJSFile.cache;
    let oldCache = cache[filename] || {
        data: '',
        mtime: ''
    };

    /* 检测文件是否有修改 */
    let mtime = fs.statSync(filename).mtime + '';
    if(oldCache.mtime != mtime) {
        cache[filename] = {
            mtime,
            data: eval(fs.readFileSync(filename, {
                encoding: 'utf8'
            }))
        };
    }

    return cache[filename].data;
}
readJSFile.cache = {};

module.exports = function proxy(host, userOptions) {
    return function handleProxy(req, res, next) {
        let matchedProxy = null;

        /* 是否配置了代理配置文件？ */
        if(userOptions && userOptions._dynamicConfigPath) {
            let baseUrl = req.baseUrl;
            let proxyConfig = readJSFile(userOptions._dynamicConfigPath);
            let rootProxy = proxyConfig['/'] || {};

            for(let key in proxyConfig) {
                if(key == baseUrl) {
                    matchedProxy = proxyConfig[key];
                }
            }

            if(!matchedProxy) {
                matchedProxy = rootProxy;
            }

            host = matchedProxy.target || rootProxy.target || '';
        }

        var container = new ScopeContainer(req, res, next, host, userOptions);

        if (!container.options.filter(req, res)) { return next(); }

        /**
        * 结果获取函数
        * @method getRes
        **/
        let getRes = () => {
            buildProxyReq(container)
                .then(resolveProxyHost)
                .then(decorateProxyReqOpts)
                .then(resolveProxyReqPath)
                .then(decorateProxyReqBody)
                .then(prepareProxyReq)
                .then(sendProxyRequest)
                .then(maybeSkipToNextHandler)
                .then(copyProxyResHeadersToUserRes)
                .then(decorateUserResHeaders)
                .then(decorateUserRes)
                .then(sendUserRes)
                .catch(next);
        };

        /* 请求延迟配置 */
        let delay = 0;
        if(matchedProxy && matchedProxy.delay) {
            delay = matchedProxy.delay;
        }
        setTimeout(getRes, delay);
    };
};
