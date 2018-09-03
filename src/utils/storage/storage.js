let debug = require('debug')('app:localStorage')

/**
 * 数据类型判断函数
 * @method checkType
 * @param {*} variable
 * @return {String}
 */
export const checkType = variable => {
  return Object.prototype.toString
    .call(variable)
    .slice(8, -1)
    .toLowerCase()
}

/**
 * localStorage 封装对象
 * @class Storage
 **/
class Storage {
  /**
   * 存储数据
   * @method set
   * @param {String} key
   * @param {*} data
   **/
  set(key, data) {
    if (!key || !data) {
      debug('set 参数格式不正确')
      return
    }

    if (checkType(data) == 'object') {
      data = JSON.stringify(data)
    }

    window.localStorage.setItem(key, data)
    debug(`${key}-数据存储成功`)
  }

  /**
   * 获取数据（JSON解析出错会返回原字符串）
   * @method get
   * @param {String} key
   * @return {*}
   **/
  get(key) {
    if (!key) {
      debug('get 参数格式不正确')
      return
    }

    let data = window.localStorage.getItem(key)
    if (checkType(data) == 'undefined') {
      debug(`${key}-数据不存在`)
      return
    }

    if (checkType(data) == 'string') {
      try {
        let parseData = JSON.parse(data)
        // 仅解析数组、对象JSON
        if (
          checkType(parseData) == 'object' ||
          checkType(parseData) == 'array'
        ) {
          data = parseData
        }
      } catch (err) {
        // JSON 格式异常，则返回字符串数据
      }
    }

    debug(`${key}-数据读取成功`)

    return data
  }

  /**
   * 获取对象形式的数据（JSON解析出错会返回空对象而不会返回字符串）
   * @method getObject
   * @param {String} key
   **/
  getObject(key) {
    if (!key) {
      debug('get 参数格式不正确')
      return
    }

    let data = window.localStorage.getItem(key)
    if (checkType(data) == 'undefined') {
      debug(`${key}-数据不存在`)
      return
    }

    if (checkType(data) == 'string') {
      try {
        let parseData = JSON.parse(data)
        // 仅解析数组、对象JSON
        if (
          checkType(parseData) == 'object' ||
          checkType(parseData) == 'array'
        ) {
          data = parseData
        }

        debug(`${key}-数据读取成功`)
      } catch (err) {
        // JSON 格式异常，则返回null
        data = null

        debug(`${key}-数据读取失败`)
      }
    } else {
      debug(`${key}-数据读取成功`)
    }

    return data
  }

  /**
   * 删除键值
   * @method delete
   * @param {String} key
   **/
  delete(key) {
    localStorage.removeItem(key)

    debug(`${key}-数据删除成功`)
  }
}

export default Storage
