import { mergeOptions } from "../util"

export function initExtend(Vue) {
  let cid = 0
  Vue.extend = function (extendOptions) {
    const Super = this
    const Sub = function VueComponent(options) {
      this._init(options)
    }
    Sub.cid = cid++
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.options = mergeOptions(Super.options, extendOptions)
    Sub.components = Super.components
    return Sub
  }
}