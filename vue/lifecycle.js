import Watcher from "./observer/watcher"
import { callHook } from "./util"
import { patch } from "./vdom/patch"

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    vm.$el = patch(vm.$el, vnode)
  }
}

export function mountComponent(vm, el) {
  callHook(vm, 'beforeMount')
  const updateComponent = () => {
    vm._update(vm._render())
  }
  new Watcher(vm, updateComponent, () => {
    callHook(vm, 'beforeUpdate')
  }, true)
  callHook(vm, 'mounted')
}