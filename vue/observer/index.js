import { arrayMethods } from "./array";

export function observe(data) {
  if (typeof data !== 'object' || data === null) return data;
  if (data.__ob__ instanceof Observer) return data;
  return new Observer(data)
}

export class Observer {
  constructor(value) {
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
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      // console.log('获取值')
      return val
    },
    set(newValue) {
      if (newValue === val) return
      observe(newValue)
      val = newValue
      console.log('设置值')
    }
  })
}