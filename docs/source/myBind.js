Function.prototype.myBind = function(ctx, ...args) {
  const fn = this
  return function(...params) {
    if (new.target) {
      return new fn(...args, ...params)
    }
    return fn.apply(ctx, [...args, ...params])
  }
}

function testFn(a1, b1, c1, d1, e1) {
  console.log(this)
  console.log(a1, b1, c1, d1, e1)
  return 2
}
const obj = { a: 1, b: 2 }
const rFn = testFn.myBind(obj, 3, 4, 5)
console.log(rFn(6, 7))