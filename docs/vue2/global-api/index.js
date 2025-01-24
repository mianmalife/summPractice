import { mergeOptions } from "../util"
import { initExtend } from "./extend"

export function initGlobalApi(Vue) {
  Vue.options = {}
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin)
  }

  Vue.options._base = Vue
  Vue.options.components = {}

  initExtend(Vue)

  Vue.component = function (id, difinition) {
    difinition.name = difinition.name || id
    difinition = this.options._base.extend(difinition) // Vue.extend
    Vue.options.components[id] = difinition
  }
}