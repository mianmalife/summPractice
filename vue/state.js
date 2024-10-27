import { observe } from "./observer"
import { nextTick } from "./util";

export function initState(vm) {
  const opts = vm.$options
  if (opts.props) {
    initProps()
  }
  if (opts.methods) {
    initMethods()
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed()
  }
  if (opts.watch) {
    initWatch()
  }
}

function proxy(vm, data, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key]
    },
    set(newValue) {
      vm[data][key] = newValue
    }
  })
}

function initProps() { }
function initMethods() { }
function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  Object.keys(data).forEach(key => {
    proxy(vm, '_data', key)
  })
  observe(data)
}
function initComputed() { }
function initWatch() { }

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function(cb) {
    nextTick(cb)
  }
}