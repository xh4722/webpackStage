/**
* Express mock配置中间件
* 根据配置信息 mock 数据
**/
const path = require('path');
const fs = require('fs');
const debug = require('debug')('dev:server:mock');

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
        debug('reload config file');

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

module.exports = function(params) {
    return function(req, res, next) {
        let baseUrl = req.url.split('?')[0];

        /* 数据 mock 配置 */
        let rootConfig = params.config;
        // 获取 mock 配置文件
        let mockConfig = {
            active: false,
            list: {}
        };

        let { configFile } = rootConfig;
        if(configFile) {
            // 读取文件内容
            let mockConfigContent = fs.readFileSync(configFile, {
                encoding: 'utf8'
            });
            // 去除文件注释
            mockConfigContent = mockConfigContent.replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g, (word) => {
                return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? '' : word;
            });
            // 解析 JSON
            mockConfig = JSON.parse(mockConfigContent);
        }

        /* Middleware 可触发 */
        if(params.active && mockConfig.active !== false) {
            // 配置了数据 mock
            if(rootConfig && rootConfig.active !== false) {
                // 是否命中标志
                let hit = false;
                for(let key in mockConfig.list) {
                    let data = mockConfig.list[key];
                    // api 是否激活？
                    if(data.active === false) {
                        continue;
                    }

                    if(baseUrl == key) {
                        let mockRes = readJSFile(path.join(rootConfig.root, data.filename));
                        let mockResData = mockRes;
                        if(data.key !== undefined) {
                            mockResData = mockRes[data.key];
                        }
                        if(mockResData.active === false) {
                            break;
                        }

                        // 设置为已命中
                        hit = true;

                        debug(`mock ${baseUrl} width delay ${data.delay || 0}`);
                        setTimeout(() => {
                            res.send(mockResData.data);
                        }, data.delay || 0);
                    }
                }

                // 如果未命中，则转到下一个中间件处理
                if(!hit) {
                    next();
                }
            }// 未配置数据 mock
            else {
                next();
            }
        }/* Middleware 不可触发 */
        else {
            next();
        }
    };
};
