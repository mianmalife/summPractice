/**
 * @description: 组合式继承 
 */

function SuperType(name) {
  this.name = name
  this.colors = ['blue', 'orange']
}

SuperType.prototype.sayName = function() {
  return this.name
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function() {
  return this.age
}

const subtype = new SubType('obito', 32)
subtype.colors.push('pink')
const subtype1 = new SubType('kakashi', 33)
console.log(subtype.sayName(),subtype.sayAge(), subtype.colors, subtype1.colors)

/**
 * @description 寄生组合式继承 最佳 
 */
function SuperType1(name) {
  this.name = name
  this.colors = ['red', 'green']
}

SuperType1.prototype.sayName = function() {
  return this.name
}

function SubType1(name, age) {
  SuperType1.call(this, name)
  this.age = age
}

const _prototype = Object.create(SuperType1.prototype)
_prototype.constructor = SubType1
SubType1.prototype = _prototype

SubType1.prototype.sayAge = function() {
  return this.age
}
const subtype2 = new SubType1('xixi', 20)
subtype2.colors.push('pink')
const subtype3 = new SubType1('haha', 15)
console.log(subtype2.sayName(),subtype2.sayAge(), subtype2.colors, subtype3.colors)



function Spu(name) {
  this.name = name
}
Spu.prototype.age = 23
const spu = new Spu('KK')
console.log('name' in spu, spu.hasOwnProperty('age'), Object.keys(spu), Object.getOwnPropertyNames(Spu.prototype), hasPrototypeProperty(spu, 'age'))
for(item in Spu.prototype) {
  console.log(item)
}

/**
 * 
 * @param {*} object 
 * @param {*} name 
 * @returns Boolean 属性name是否存在object的原型上
 */
function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && name in object
}