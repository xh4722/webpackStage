const path = require('path');

const allowedEnvs = ['development', 'production', 'gray', 'dll'];

/* 打包参数解析 */
let args = process.argv.slice(2);
args = (() => {
    let res = {};
    args.forEach((arg) => {
        let arr = arg.split('=');
        res[arr[0]] = arr[1];
    });

    return res;
})();

let env = args['--env'] || 'development';

// 警告信息消除
process.noDeprecation = true;
// 配置全局变量（打包环境）
process.env.REACT_WEBPACK_ENV = env;

function buildConfig(wantedEnv) {
    let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
    let validEnv = isValid ? wantedEnv : 'development';

    /* 加载主显配置文件 */
    let configMap = {
        'development' : 'dev',
        'production'  : 'product',
        'gray'        : 'gray',
        'dll'         : 'dll',
        'test'        : 'test'
    };
    let config = require(path.join(__dirname, 'cfg/' + configMap[validEnv]));

    return [config];
}

module.exports = buildConfig(env);
