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