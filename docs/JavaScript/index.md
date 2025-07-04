# 基础

## 数据类型

8种数据类型 , 7种基本数据类型

- String
- Number
- Boolean
- Symbol      -- es6引入 实例唯一且不可被改变
- BigInt
- Null
- undefined

- Object

## var和let的区别
- var声明的变量会挂载在全局window上, let不会, 也就是说var声明的变量会存在全局污染的问题, 而let不会。都可以跨script标签访问。
- let声明的是块级作业域
- let声明存在TDZ(暂时性死区)，也就是说变量在声明初始化之前不能访问。
- 重复声明的问题, var可以, let不可以。


## 函数中this的指向

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
