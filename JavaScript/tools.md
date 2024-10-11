# 工具函数

```js
// 判断属性是否在对象的原型上
// 如果属性在对象和对象的原型链上 则返回true

function hasPrototypeProperty(object, prop) {
  return !object.hasOwnProperty(prop) && prop in object
} 

```