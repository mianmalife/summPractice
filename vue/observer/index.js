export function observe(data) {
  if (typeof data !== 'object' || data === null) return
  return new Observer(data)
}

export class Observer {
  constructor(data) {
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = data[key]
      defineReactive(data, key, value)
    }
  }
}

export function defineReactive(obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('获取值', obj, key, val)
    },
    set(newValue) {
      if (newValue === val) return
      val = newValue
      observe(newValue)
      console.log('设置值', obj, key, val)
    }
  })
}