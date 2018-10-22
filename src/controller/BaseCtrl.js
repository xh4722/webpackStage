import store from 'store'

/**
 * model 代理器
 * @method connect
 * @param {object} model
 */
function connect(model) {
  return function(target) {
    Object.keys(model).forEach(key => {
      Object.defineProperty(target, key, {
        get: () => {
          return model[key]
        },
      })
    })
  }
}

/**
 * 控制器基类
 * @class BaseCtrl
 * @description 控制器基类实现的功能：
 * 1. 绑定指定的 model；
 */
class BaseCtrl {
  constructor(props) {
    this._originState = props
    // 绑定 dispatch
    this.dispatch = store.dispatch
    // 绑定 model
    connect(props)(this)
  }
}

export default BaseCtrl
