/**
 *
 * 通用函数库
 *
 */

/**
 * 类型判断函数
 * @method type
 * @param variable
 **/
function type(variable) {
  return Object.prototype.toString
    .call(variable)
    .slice(8, -1)
    .toLowerCase()
}
export const checkType = type

/**
 * 纯粹对象判断函数
 * @method isPlainObject
 * @param {Object} obj
 **/
export function isPlainObject(obj) {
  var proto, Ctor

  // 非对象参数
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false
  }

  proto = Object.getPrototypeOf(obj)

  // 没有 prototype 的对象是纯粹的
  if (!proto) {
    return true
  }

  // 与 Object 的 prototype 相同的对象是纯粹的
  Ctor = {}.hasOwnProperty.call(proto, 'constructor') && proto.constructor

  return (
    typeof Ctor === 'function' &&
    {}.hasOwnProperty.toString.call(Ctor) ===
      {}.hasOwnProperty.toString.call(Object)
  )
}

/**
 * 对象扩展
 * @method extendObject
 * @param {Boolean} isDeep
 * @param {Object} target
 * @param {Object} data
 * @return {Object}
 **/
export function extendObject() {
  var options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false

  /* 深拷贝标志 */
  if (typeof target === 'boolean') {
    deep = target

    // 跳过第一个参数
    target = arguments[i] || {}
    i++
  }

  /* 源参数不是对象 */
  if (typeof target !== 'object' && type(target) !== 'function') {
    target = {}
  }

  /* 根据传入的参数依次扩展源参数 */
  for (; i < length; i++) {
    // 只处理非 null 和 undefined 的参数
    if ((options = arguments[i]) != null) {
      // 扩展基本对象
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止死循环
        if (target === copy) {
          continue
        }

        /* 递归更新纯粹的对象或数组 */
        if (
          deep &&
          copy &&
          (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
        ) {
          // 数组
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }

          // 克隆对象属性
          target[name] = extendObject(deep, clone, copy)
        }
        // 不允许 undefined 属性
        else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  // 返回更新好的对象
  return target
}

/**
 * 对象更新（不允许扩展新属性）
 * @method updateObject
 * @param {Boolean} isDeep
 * @param {Object} target
 * @param {Object} data
 * @return {Object}
 **/
export function updateObject() {
  var options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false

  /* 深拷贝标志 */
  if (typeof target === 'boolean') {
    deep = target

    // 跳过第一个参数
    target = arguments[i] || {}
    i++
  }

  /* 源参数不是对象 */
  if (typeof target !== 'object' && type(target) !== 'function') {
    target = {}
  }

  /* 根据传入的参数依次扩展源参数 */
  for (; i < length; i++) {
    // 只处理非 null 和 undefined 的参数
    if ((options = arguments[i]) != null) {
      // 扩展基本对象
      for (name in options) {
        /* 如果属性在源对象中不存在，则跳过 */
        if (!target.hasOwnProperty(name)) {
          continue
        }

        src = target[name]
        copy = options[name]

        // 防止死循环
        if (target === copy) {
          continue
        }

        /* 递归更新纯粹的对象或数组 */
        if (
          deep &&
          copy &&
          (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
        ) {
          // 数组
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }

          // 克隆对象属性
          target[name] = extendObject(deep, clone, copy)
        }
        // 不允许 undefined 属性
        else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  // 返回更新好的对象
  return target
}

/**
 * 对象克隆
 * @method cloneObject
 * @param {Object} target
 * @return {Object}
 **/
export function cloneObject(target) {
  return extendObject(true, {}, target)
}

/**
 * 函数节流
 * @method throttle
 * @param {Function} func
 * @param {Integer} wait
 * @param {Boolean} immediate
 **/
export function throttle(func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function() {
    // 据上一次触发时间间隔
    var last = new Date() - timestamp
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    //console.log('later:', last, wait)
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          context = args = null
        }
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = new Date()
    var callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 防抖动函数
 * @method debounce
 * @param {Function} func
 * @param {Integer} wait
 * @param {Boolean} immediate
 **/
export function debounce(func, wait, immediate) {
  // immediate默认为false
  var timeout, args, context, timestamp, result

  var later = function() {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    var last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          context = args = null
        }
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = Date.now()
    // 第一次调用该方法时，且immediate为true，则调用func函数
    var callNow = immediate && !timeout
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
