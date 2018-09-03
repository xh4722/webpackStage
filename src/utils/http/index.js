import Http from './http'
import Request from './lib/request'
import Queue from './lib/queue'
import EventEmitter from './lib/eventEmitter'

/**
 * http 管理对象
 * @class HttpManager
 */
class HttpManager extends EventEmitter {
  constructor(config) {
    super()

    /* Http 对象 */
    this.Http = new Http(config)

    /* 请求队列 */
    this.Queue = new Queue()
  }

  /**
   * promise 绑定 request
   * @method bindRequest
   * @param {Object} promise
   * @param {Object} requestConfig
   **/
  bindRequest(promise, requestConfig) {
    /* 生成请求对象 */
    let request = new Request(requestConfig)
    // 将请求对象保存到队列中
    this.Queue.add(request)

    // 绑定 request 的 key
    promise.requestKey = request.key

    /* 请求结束以后自动删除队列中的请求 */
    promise.finally(() => {
      // 触发请求完成事件
      this.emit('complete', requestConfig)
      // 删除请求
      this.Queue.delete(request.key)
    })
  }

  /**
   * 配置信息设置函数
   * @method setConfig
   * @param {Object} config
   **/
  setConfig(config) {
    this.Http.setConfig(config)
  }

  /**
   * GET 请求接口
   * @method get
   **/
  get(api, params, headers) {
    /* api 参数解析 */
    let url = api.url

    /* 发起 get 请求，并记录该请求 */
    let promise = this.Http.get(url, params, headers)

    // 绑定 Request 对象到 promise 上
    this.bindRequest(promise, {
      type: 'GET',
      url,
      params: JSON.stringify(params),
    })

    return promise
  }

  /**
   * POST 请求接口
   * @method post
   **/
  post(api, params, headers) {
    /* api 参数解析 */
    let url = api.url

    /* 发起 post 请求，并记录该请求 */
    let promise = this.Http.post(url, params, headers)

    // 绑定 Request 对象到 promise 上
    this.bindRequest(promise, {
      type: 'POST',
      url,
      params: JSON.stringify(params),
    })

    return promise
  }

  /**
   * url 中断 url 请求
   * @method abortUrl
   **/
  abortUrl(api) {
    this.Queue.abortUrl(api.url)
  }

  /**
   * 查找 url 队列
   * @method getUrlList
   * @param {Object} api
   * @return {Array}
   **/
  getUrlList(api) {
    return this.Queue.getUrlList(api.url)
  }

  /**
   * 中断指定请求
   * @method abort
   * @param {String} key
   **/
  abort(key) {
    let req = this.Queue.find(key)
    req && req.abort()
  }
}

export default new HttpManager({
  headers: {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  options: {
    baseUrl: 'http://syclient-test.kuaimai.com',
  },
})
