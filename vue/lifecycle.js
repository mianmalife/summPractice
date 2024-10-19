import { callHook } from "./util"
import { patch } from "./vdom/patch"

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    patch(vm.$el, vnode)
  }
}

export function mountComponent(vm, el) {
  callHook(vm, 'beforeMount')
  vm._update(vm._render())
  callHook(vm, 'mounted')
}