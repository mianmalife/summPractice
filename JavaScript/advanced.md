## ES5实现继承

```js{12,16,17,18}
  function Parent(name, age) {
    this.name = name
    this.age = age
  }

  Parent.prototype.print = function() {
    console.log('name: '+this.name)
    console.log('age: '+this.age)
  }

  function Child(name, age, play) {
    Parent.call(this, name, age)
    this.play = play
  }

  let _prototype = Object.create(Parent.prototype)
  _prototype.constructor = Child
  Child.prototype = _prototype
  Child.prototype.onPlay = function() {
    console.log('playing: '+this.play)
  }

  const child = new Child('little', 12, 'jump')
  console.log(child.onPlay(), child.print(), child.name, child.age)
```

## 实现call方法

```js
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx)
  const fn = this // 函数testMethod
  const key = Symbol()
  Object.defineProperty(ctx, key, {
    value: fn,
    enumerable: false,
  })
  ctx[key](...args)
  delete ctx[key]
}
function testMethod (a, b, c) {
  console.log(a, b, c)
  console.log(this)
}

testMethod.myCall(12, 1, 2, 3)
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