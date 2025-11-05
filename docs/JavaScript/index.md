# 基础
## 函数优先
- 函数可以当成值和变量使用
## 高阶函数
- 返回一个函数的函数
## 基于原型编程
- 不定义类的情况下创建一个对象
## 动态类型语言
- 解释器在运行时根据变量当时的值分配类型
## 单线程, 支持面向对象, 命令式, 声明式风格
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript
## 变量
- var
- let
- const
  - 阻止重新赋值, 但不阻止修改。 比如：对象, 数组可以被修改
  ### var和let的区别
  - var声明的变量会挂载在全局window上, let不会, 也就是说var声明的变量会存在全局污染的问题, 而let不会。都可以跨script标签访问。
  - let声明的是块级作业域
  - let声明存在TDZ(暂时性死区)，也就是说变量在声明初始化之前不能访问。
  - 重复声明的问题, var可以, let不可以。
## 单行注释/多行注释
## 函数作用域/块级作用域/全局作用域/模块作用域
## 8种数据类型
- 7种基本数据类型
  - Boolean
  - Number
  - String
  - BigInt
  - Symbol
  - undefined
  - null
- Object
## 数据类型转换
- +运算符
  ```
  +'1.2'+ +'1.3' === 2.5
  '3' + '2' === '32'
  ```
- parseInt 最佳实践是带上进制
- parseFloat
## 字面量
- 数组字面量
- 字符串字面量
- RegExp字面量
- 数字字面量
- 对象字面量
- 布尔字面量
## 块语句/条件语句/异常执行语句
```js
{
  let x = 10
}
{
  if (true) {
    console.log(true)
  } else {
    conosle.log(false)
  }
  switch(1) {
    case 1:
      console.log(1)
      break
    case 2:
      console.log(2)
      break
    default:
      console.log('default')
  }
}
{
  try {
    throw new Error('failure')
  } catch(e) {
    console.log(e)
  } finally {
    console.log('finally')
  }
}
```
## 循环语句
- for
- while
- do while
- for in
- for of
- label
- break
- continue
## 函数
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions
### 参数按值传递
### 函数表达式
### 函数中this的指向

| 调用方式          | 示例               | this的指向     |
| ----------------- | ------------------ | -------------- |
| 直接调用          | funcName()         | 全局对象       |
| 对象调用          | obj.funcName()     | 前面的对象     |
| call, apply, bind | funcName.call(ctx) | 第一个参数对象 |
| 通过new调用       | new funcName()     | 新对象         |

```js
function Test(){
  console.log(this) // Test {}
}
new Test()
```
### 函数提升
- 仅适用于函数声明 函数表达式不支持
  ```js
  sum(2, 3)
  function sum(a, b) {
    return a + b
  }
  ```
  ```js
  // Uncaught ReferenceError: sum is not define
  sum(2, 3)
  const sum = function(a, b) {
    return a + b
  }
  ```
  ### 函数作用域
  ### 作用域和栈
  - 递归
  - 作用域链
- ### 闭包
- ### arguments
- ### 默认参数/剩余参数
  - 默认参数
  ```js
  function sum(a = 1, b = 2) {
    console.log(a, b) // 1 2
  }
  sum()
  ```
  - 剩余参数
  ```js
  function sum(a, ...args) {
    console.log(typeof arges)
    return a + args.reduce((p, c) => p + c)
  }
  sum(1, 2, 3)
  ```
  ### 箭头函数
  - 没有`this, arguments, super, new.target`
  - 是匿名函数
  ### 预定义函数（内置函数）
  - eval
  - parseInt
  - parseFloat
  - isNaN
  - isFinite
  - decodeURI
  - encodeURI
  - decodeURIComponent
  - encodeURIComponent
## 表达式与运算符
### 赋值运算符
### 比较运算符
### 算数运算符
### 位运算符
### 逻辑运算符
### 字符串运算符
### 条件运算符(三元运算符)
### 逗号运算符
- ```js
  const arr = [0, 1, 2, 3, 4, 5];
  const a1 = [arr, arr, arr, arr, arr, arr]
  for(let i=0,j=5; i<=j; i++,j--){
    console.log(a1[i][j])
  }
  ```
### 一元操作符
- ```js
  const arr = [1, 2, 3]
  delete arr[1]
  console.log(arr) // [1, empty, 3]
  arr[1] === undefined // true
  1 in arr // false
  arr[1] = undefined
  1 in arr // true
  ```
- typeof
- void
### 关系运算符
- in
- instanceof
### 基本表达式
### 左值表达式
- new
- super
## 数字和字符串
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Numbers_and_strings
### 数字
- -2^53 - 1到2^53 - 1可以准确表示
```js
    // 正无穷 负无穷 非数字
    +Infinity; -Infinity; NaN;
```
- 二进制
`0b0101`
`0B0101`
- 十进制
`123456`
- 八进制
`0123`
- 十六进制
`0xA`
`0x1`
- 指数形式
`10e1`
`10e-1`
### 数字对象
- Number
### 数学对象
- Math
### 日期对象
- Date
## 正则表达式
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions
```js
const mp = /ab+c/
const regMp = new RegExp('ab+c')
```
## 带键的集合
### Map
  ```js
  const Map1 = new Map()
  Map1.set(1, 1)
  Map1.set({a: 1}, 2)
  Map1.set(()=> {}, 3)
  Map1.set(Symbol('4'), 4)
  for(let [key, value] of Map1) {
      console.log(key, value)
  }
  ```
### WeakMap
  ```js
  // 键只能是对象和Symbol() 不可枚举
  const WeakMap1 = new WeakMap()
  WeakMap1.set(()=> {}, 1)
  WeakMap1.set(Symbol(2), 2)
  WeakMap1.set({a:3}, 3)
  // TypeError: WeakMap1 is not iterable
  for(let v of WeakMap1) {
      console.log(v)
  }
  ```
### Set
  ```js
  const Set1 = new Set([{a:1}, {a: 2}, {a:1}, 1, 2, 1])
  Set1.add(2)
  Set1.add(4)
  console.log(Set1) // Set(5) { { a: 1 }, { a: 2 }, { a: 1 }, 1, 2, 4 }
  for(let s of Set1) {
      console.log(s)
  }
  const array = [1, 2, 3, 1, 2, 3]
  const Set2 = new Set(array)
  console.log(Set2) // Set(3) { 1, 2, 3 }
  const array2 = Array.from(Set2)
  console.log(array2) // [ 1, 2, 3 ]
  const array3 = [...Set2]
  console.log(array3) // [ 1, 2, 3 ]
  ```
### WeakSet
  ```js
  // 值只能是对象或者Symbol()
  const WeakSet1 = new WeakSet([{a:1}, Symbol(1)])
  // 不可枚举 TypeError: WeakSet1 is not iterable
  for(let w of WeakSet1) {
      console.log(w)
  }
  ```
## 使用对象
### 枚举属性
  - for in
  - Object.keys(o)
  - Object.getOwnPropertyNames(o)
### 创建对象
  - {}
  - new Func()
  - Object.create(o)
### 继承
  至少继承一个对象 -> 原型
### 对象属性索引
  - obj.prop
  - obj['prop']
  - obj[1]
### 定义方法
  一个方法：关联到某个对象的函数
### 通过this引用对象
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_objects#%E9%80%9A%E8%BF%87_this_%E5%BC%95%E7%94%A8%E5%AF%B9%E8%B1%A1
  - 函数调用者
  - form对象
### getter, setter
  ```js
  let obj1 = {
    a: 1,
    get b() {
      return this.a + 1
    },
    set c(x) {
      this.a = this.a + x
    }
  }
  console.log(obj1.b) // 2
  obj1.c = 100
  console.log(obj1.a) // 101

  let obj2 = {
    a: 1,
  }

  Object.defineProperties(obj2, {
    b: {
      get: function () {
        console.log('getter b')
        return this.b
      },
      set: function(x) {
        console.log("setter b")
        this.a = this.a + x
      }
    },
    c: {
      set: function (x) {
        console.log('setter c')
        this.a = this.a + x
      }
    }
  })
  obj2.b = 1
  console.log(obj2.a) // 2
  obj2.c = 100
  console.log(obj2.a) // 102

  let obj3 = { a: 1 }
  Object.defineProperty(obj3, 'b', {
    get: function() {
      return this.a + 1
    },
    set: function(x) {
      this.a = x
    }
  })
  obj3.b = 100
  console.log(obj3.b) // 101
  ```
### 删除属性
      删除一个不是继承来的属性
### 比较对象
      两个独立声明的对象永远不相等
      同一引用比较时相等
  ```js
  let k1 = {a:1}
  let k2 = k1
  console.log(k1 === k2, k1 == k2) // true true
  ```
## 类
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_classes#%E7%B1%BB%E7%9A%84%E6%A6%82%E8%BF%B0
### 声明类
- 类声明不会提升
- 类表达式
  ```js
  const ThisBook = class Book {}
  ```
### 构造函数
### 实例方法
### 私有字段
### 访问器字段
### 公共字段
### 静态属性
### 扩展与继承
## 使用Promise
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises
## js类型化数组
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays
## 迭代器和生成器
### 迭代器
### 生成器函数
### 可迭代对象
## 模块
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules
