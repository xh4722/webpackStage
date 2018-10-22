/**
 * 单例包装器
 * @method singleInstanceWrapper
 * @param {Object} Creator
 */
export default Creator => ({
  instance: null,
  /**
   * 创建新对象
   * @method create
   * @param {object} state
   * @param {Function} dispatch
   * @return {Object}
   */
  create(state, dispatch) {
    if (!this.instance || this.instance._originState !== state) {
      this.instance = new Creator(state, dispatch)

      const parent = Creator.prototype
      console.log(Object.getOwnPropertyDescriptor(parent, 'getMember'))
      for (let key in parent) {
        console.log(key)
        if (parent.hasOwnProperty(key) && typeof parent[key] === 'function') {
          console.log(key)
          parent[key] = parent[key].bind(this.instance)
        }
      }
    }

    return this.instance
  },
})
