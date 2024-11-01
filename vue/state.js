import { observe } from "./observer"
import { nextTick } from "./util";
import Watcher from "./observer/watcher";
import Dep from "./observer/dep";

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
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
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
function initComputed(vm) {
  let computed = vm.$options.computed
  const watchers = vm._computedWatchers = {}
  for(let key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    watchers[key]  = new Watcher(vm, getter, () => {}, { lazy: true })
    defineComputed(vm, key, userDef)
  }
}
function defineComputed(target, key, userDef) {
  const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => {},
    set: () => {},
  }
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key)
  } else {
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = userDef.set
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
function createComputedGetter(key) {
  return function () {
    const watcher = this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
function initWatch(vm) {
  let watch = vm.$options.watch
  for(let key in watch) {
    let handler = watch[key]
    if (Array.isArray(handler)) {
      handler.forEach(handle => {
          createWatcher(vm, key, handle)
      })
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm, exprOrFn, handler, options) {
  if (typeof handler === 'object') {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(exprOrFn, handler, options)
}

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function(cb) {
    nextTick(cb)
  }
  Vue.prototype.$watch = function(exprOrFn, handler, options) {
    new Watcher(this, exprOrFn, handler, {...options, user: true })
  }
}