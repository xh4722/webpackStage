import queryString from 'query-string';

import { extendObject } from 'utils/library';

/**
* 可中断 Promise
* @method abortablePromise
**/
let abortablePromise = (fetch_promise) => {
    let abort = null;

    let abort_promise = new Promise((resolve, reject) => {
        abort = (error) => {
            return reject(error || {
                status: -1,
                message: '请求中断',
                error: '请求中断'
            });
        }
    });

    /* 使用 Promise.race 模拟中断 */
    let abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    abortable_promise.abort = abort;

    return abortable_promise;
};

/**
* Http 构建对象
**/
class Http {
    constructor(config) {
        this.config = extendObject(true, {
            params: {},
            headers: {},
            timeout: 15000
        }, config);
    }

    /**
    * 设置配置信息
    * @method setConfig
    * @param {Object} config
    **/
    setConfig(config) {
        this.config = extendObject(true, {}, this.config, config);
    }

    /**
    * HttpPromise 生成函数
    * @method createHttpPromise
    **/
    createHttpPromise(url, headers) {
        let timeoutTimer = null;

        let promise = new Promise((resolve, reject) => {
            /* 发起 fetch 请求 */
            fetch(url, headers).then((res) => {
                /* 取消超时定时器 */
                clearTimeout(timeoutTimer);

                // 请求出错
                if(!res.ok) {
                    return reject({
                        status: -1,
                        message: res.statusText,
                        error: res.error || '',
                        result: res.result
                    });
                }

                // 请求解析为 json
                return res.json();
            }).then((res) => {
                // 请求成功
                if(res.result == 100) {
                    return resolve(res);
                }// 会话失效
                else if(res.result == 600) {
                    return reject({
                        status: -1,
                        message: res.message,
                        error: res.error || '',
                        result: res.result
                    });
                }// 其他异常
                else {
                    return reject({
                        status: -1,
                        message: res.message,
                        error: res.error || '',
                        result: res.result
                    });
                }
            }).catch(() => {
                /* 取消超时定时器 */
                clearTimeout(timeoutTimer);

                return reject({
                    status: -1,
                    message: '网络异常，请检查网络后重试',
                    error: '网络异常，请检查网络后重试'
                });
            });
        });

        /* promise 封装 */
        promise = abortablePromise(promise);

        /* 启动超时定时器 */
        let timeout = this.config.timeout || 0;
        if(headers && headers.timeout) {
            timeout = headers.timeout;
        }
        timeoutTimer = setTimeout(() => {
            promise.abort({
                status: 408,
                message: '请求超时',
                error: '请求超时'
            });
        }, timeout);

        return promise;
    }

    /**
    * GET 请求接口
    * @method get
    **/
    get(url, params, headers) {
        params = extendObject(true, {},
            this.config.params, params || {});
        headers = extendObject(true, {},
            this.config.headers, headers || {});

        /* GET url 参数拼接 */
        if(params) {
            let urlParams = '';
            // 原网址无参数
            if(url.search(/\?/) === -1) {
                urlParams = queryString.stringify(params);
            }// 原网址有参数
            else {
                urlParams = queryString.stringify(extendObject(true, {},
                    params, queryString.parse(url.split('?')[1])));
            }

            url = url.split('?')[0];
            url = `${url}?${urlParams}`;
        }

        return this.createHttpPromise(url, {
            method: 'GET',
            mode: 'cors',
            compress: true,
            headers: headers,
            credentials: 'include'
        });
    }

    /**
    * POST 请求接口
    * @method post
    **/
    post(url, params, headers) {
        params = extendObject(true, {},
            this.config.params, params || {});
        headers = extendObject(true, {},
            this.config.headers, headers || {});

        return this.createHttpPromise(url, {
            method: 'POST',
            mode: 'cors',
            compress: true,
            headers: headers,
            credentials: 'include',
            body: params ? queryString.stringify(params) : ''
        });
    }
}

export default Http;
