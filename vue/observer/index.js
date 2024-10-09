export function observe(data) {
  if (typeof data !== 'object' || data === null) return;
  return new Observer(data)
}

export class Observer {
  constructor(value) {
    this.walk(value)
  }
  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
}

export function defineReactive(obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('获取值')
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