## 属性是否在对象的原型上

```js
// 判断属性是否在对象的原型上
// 如果属性在对象和对象的原型链上 则返回true

function hasPrototypeProperty(object, prop) {
  return !object.hasOwnProperty(prop) && prop in object
} 

```

## 实现节流函数

```js
const throttle = (fn, wait) => {
  let lastTime = null
  return function(...args) {
    const now = Date.now()
    if (lastTime === null || now - lastTime > wait) {
      lastTime = now
      return fn.apply(this, args)
    }
  }
}
```

## 实现防抖函数

```js
const debounce = (fn, wait=0) => {
  let timer
  return function(...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=> {
      fn.apply(this, args)
    }, wait)
  }
}
```