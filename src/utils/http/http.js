/**
 * http 请求处理模块
 * @module HTTP
 * @author hbp
 * @date 2018/05/18
 */

import axios from 'axios';
import queryString from 'query-string';
import { extendObject } from 'utils/library';

/**
 * http 请求处理对象
 * @class HTTP
 */
class HTTP {
    constructor(config) {
        this.config = extendObject(true, {
            params: {},
            headers: {},
            options: {
                withCredentials: true,
                timeout: 15000
            }
        }, config);
    }

    /**
     * 设置配置信息
     * @method setConfig
     * @param {Object} config
     */
    setConfig(config) {
        this.config = extendObject(true, {}, this.config, config);
    }

    /**
     * HttpPromise 生成函数
     * @method createHttpPromise
     */
    createHttpPromise(url, options) {
        options = {
            ...this.config.options,
            ...options
        };

        // 请求中断函数
        let abort = () => {};
        // 请求 promise
        let promise = new Promise((resolve, reject) => {
            /* 发起 fetch 请求 */
            axios({
                url,
                ...options,
                cancelToken: new axios.CancelToken((c) => {
                    abort = c;
                })
            }).then((res) => {
                return res.data;
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
            }).catch((err) => {
                if(axios.isCancel(err)) {
                    return reject({
                        status: -1,
                        message: '请求中断',
                        error: '请求中断'
                    });
                } else {
                    return reject({
                        status: -1,
                        message: '网络异常，请检查网络后重试',
                        error: '网络异常，请检查网络后重试'
                    });
                }
            });
        });
        // 添加请求中断函数
        promise.abort = abort;

        // /* 启动超时定时器 */
        // let timeout = this.config.timeout || 0;
        // if(headers && headers.timeout) {
        //     timeout = headers.timeout;
        // }
        // timeoutTimer = setTimeout(() => {
        //     promise.abort({
        //         status: 408,
        //         message: '请求超时',
        //         error: '请求超时'
        //     });
        // }, timeout);

        return promise;
    }

    /**
     * GET 请求接口
     * @method get
     */
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
            headers
        });
    }

    /**
     * POST 请求接口
     * @method post
     */
    post(url, params, headers) {
        params = extendObject(true, {},
            this.config.params, params || {});
        headers = extendObject(true, {},
            this.config.headers, headers || {});

        return this.createHttpPromise(url, {
            method: 'POST',
            headers,
            data: params ? queryString.stringify(params) : ''
        });
    }
}

export default HTTP;
