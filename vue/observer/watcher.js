import { popTarget, pushTarget } from "./dep"
import { nextTick } from "../util";

let id = 0
class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    this.options = options
    this.user = options.user
    this.id = id++
    this.deps = []
    this.depsId = new Set()
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    } else {
      this.getter = function () {
        const exp = exprOrFn.split('.')
        let obj = vm
        for (let i = 0; i < exp.length; i++) {
          obj = obj[exp[i]]
        }
        return obj
      }
    }
    this.value = this.get()
  }
  get() {
    pushTarget(this)
    let result = this.getter()
    popTarget()
    return result
  }
  update() {
    queueWatcher(this)
  }
  run () {
    let newValue = this.get()
    let oldValue = this.value
    this.value = newValue
    if (this.user) {
      this.cb.call(this.vm, newValue, oldValue)
    }
  }
  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
}

let queue = [];
let has = {};
let pending = false;

function flushSchedulerQueue() {
  queue.forEach(watcher => {
    watcher.run();
    if (!watcher.user) {
      watcher.cb()
    }
  })
  queue = []
  has = {}
  pending = false
}
function queueWatcher(watcher) {
  const id = watcher.id
  if (!has[id]) {
    queue.push(watcher)
    has[id] = true
    if (!pending) {
      nextTick(flushSchedulerQueue)
      pending = true
    }
  }
}

export default Watcher