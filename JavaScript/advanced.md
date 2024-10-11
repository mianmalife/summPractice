# ES5实现继承

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