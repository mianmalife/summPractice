const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsList = [
  'push',
  'pop',
  'shift', // 删除数据第一个元素
  'unshift', // 数组开头添加元素
  'splice',
  'reverse',
  'sort'
]

methodsList.forEach(method => {
  Object.defineProperty(arrayMethods, method, {
    value: function (...args) {
      const originMethod = arrayProto[method]
      let inserted;
      const result = originMethod.apply(this, args)
      const ob = this.__ob__
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break;
        case 'splice':
          inserted = args.slice(2)
          break;
      }
      if (inserted) ob.observeArray(inserted)
      return result
    },
    enumerable: true,
    writable: true,
    configurable: true
  })
})