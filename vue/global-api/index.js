import { mergeOptions } from "../util"

export function initGlobalApi(Vue) {
  Vue.options = {}
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin)
    console.log(this.options, '9999')
  }
}