import { compileToFunctions } from "./compiler"
import { mountComponent } from "./lifecycle"
import { initState } from "./state"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(vm)

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