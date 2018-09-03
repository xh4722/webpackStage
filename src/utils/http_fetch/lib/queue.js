/**
 * 队列管理对象（用于管理请求队列）
 * @class Queue
 **/
class Queue {
  constructor() {
    this.list = []
  }

  /**
   * 添加队列元素
   * @method add
   * @param {Object} request
   **/
  add(request) {
    this.list.push(request)

    return request
  }

  /**
   * url 相关请求中断函数
   * @method abortUrl
   * @param {String} url
   **/
  abortUrl(url) {
    /* 中断所有相关 url 的请求 */
    this.list.forEach(req => {
      if (req.url == url) {
        req.abort && req.abort()
      }
    })
  }

  /**
   * 查找 url 队列
   * @method getUrlList
   * @param {String} url
   * @return {Array}
   **/
  getUrlList(url) {
    // 获取请求列表
    let list = this.list.filter(req => {
      return req.url == url
    })

    return list
  }

  /**
   * 根据 requestKey 查找队列中的请求
   * @method find
   * @param {Object} key
   **/
  find(key) {
    let req = this.list.find(req => {
      return req.key == key
    })

    return req
  }

  /**
   * 删除队列元素（该操作仅仅是删除队列中的请求，并不会中断请求）
   * @method delete
   * @param {String} key
   **/
  delete(key) {
    this.list = this.list.filter(req => {
      return req.key != key
    })
  }
}

export default Queue
