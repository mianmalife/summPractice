/**
 * ES5实现继承
 */

function Parent(name, age) {
  this.name = name
  this.age = age
}

Parent.prototype.print = function () {
  console.log('name: ' + this.name)
  console.log('age: ' + this.age)
}

function Child(name, age, play) {
  Parent.call(this, name, age)
  this.play = play
}

let _prototype = Object.create(Parent.prototype)
_prototype.constructor = Child
Child.prototype = _prototype
Child.prototype.onPlay = function () {
  console.log('playing: ' + this.play)
}

const child = new Child('little', 12, 'jump')
console.log(child.onPlay(), child.print(), child.name, child.age)
// for (key in child) {
//   console.log(key)
// }

// let fool
// while (fool = true) {
//   console.log('_________')
//   break
// }

/**
 * 数组去重
 */
let array1 = [1, '1a', undefined, 1, null, null, 12, 'aa', 'a', 'aa', 'bb', 'bb']

function noRepeat(arr) {
  return [...new Set(arr)]
}
function noRe(arr) {
  let obj = {}
  let newarr = []
  for (let value of arr) {
    if (!(value in obj)) {
      newarr.push(value)
      obj[value] = true
    }
  }
  return newarr
}
console.log(noRe(array1))

function Test() {
  console.log(this, 'this')
}
const t = new Test()
// Map方式