import { arrayMethods } from "./array";
import Dep from "./dep";

export function observe(data) {
  if (typeof data !== 'object' || data === null) return;
  if (data.__ob__ instanceof Observer) return;
  return new Observer(data)
}

export class Observer {
  constructor(value) {
    this.dep = new Dep()
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,
      configurable: false
    })
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
  observeArray(data) {
    data.forEach(item => {
      observe(item)
    })
  }
}

export function defineReactive(obj, key, val) {
  let childDep = observe(val)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend()
        if (childDep) {
          childDep.dep.depend()
        }
      }
      return val
    },
    set(newValue) {
      if (newValue === val) return
      observe(newValue)
      val = newValue
      dep.notify()
    }
  })
}