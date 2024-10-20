import { compileToFunctions } from "./compiler"
import { mountComponent } from "./lifecycle"
import { initState } from "./state"
import { callHook, mergeOptions } from "./util"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    vm.$options = mergeOptions(vm.constructor.options, options)
    callHook(vm, 'beforeCreate')
    initState(vm)
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this
    const opts = vm.$options
    el = document.querySelector(el)
    vm.$el = el
    let template = opts.template
    if (!template && el) {
      template = el.outerHTML
    }
    const render = compileToFunctions(template)
    opts.render = render

    mountComponent(vm, el)
  }
}