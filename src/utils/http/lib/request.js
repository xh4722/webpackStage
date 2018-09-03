/**
 * 请求封装对象
 * @class Request
 **/
class Request {
  constructor({ type, url, params, abort }) {
    this.key = `${new Date().getTime()}${Math.floor(Math.random() * 1000)}`
    this.type = type
    this.url = url
    this.params = params
    this.abort = abort

    this.created = new Date().getTime()
  }
}

export default Request
