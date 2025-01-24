import Watcher from "./observer/watcher"
import { callHook } from "./util"
import { patch } from "./vdom/patch"

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    const prevVNode = vm._vnode
    vm._vnode = vnode
    if (!prevVNode) {
      vm.$el = patch(vm.$el, vnode)
    } else {
      vm.$el = patch(prevVNode, vnode)
    }
  }
}

export function mountComponent(vm, el) {
  callHook(vm, 'beforeMount')
  const updateComponent = () => {
    vm._update(vm._render())
  }
  new Watcher(vm, updateComponent, () => {
    callHook(vm, 'updated')
  }, true)
  callHook(vm, 'mounted')
}