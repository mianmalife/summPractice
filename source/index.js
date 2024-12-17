class TaskUtal {
  taskList = []
  use(fn) {
    this.taskList.push(fn)
  }
  run() {
    const t = this.taskList.shift()
    return t(() => {
      if (this.taskList.length === 0) return
      return this.run()
    })
  }
}

const task = new TaskUtal()
task.use(async (next) => {
  console.log(1)
  await next()
  console.log(4)
})
task.use(async (next) => {
  console.log(2)
  await next()
  console.log(5)
})
task.use(async (next) => {
  console.log(3)
  await next()
  console.log(6)
})

// task.run()


function pushNumber() {
  var list = []
  for(var i = 0; i < 10;i++) {
    list[i] = (function(num) {
      return function() {
        return num
      }
    })(i)
  }
  console.log(list[1]())
  return list
}
pushNumber()

var name = 'outname'
var myobject = {
  name: 'innername',
  getName: function() {
    var that = this
    return function() {
      return that.name
    }
  }
}

console.log((myobject.getName())(), myobject.getName())

!(function () {
  const now = new Date()
  if (now.getMonth() == 0 && now.getDate() == 1) {
    console.log("Happy New Year!");
  }
})()


var globalData = function() {
  var result = []
  var getReverse = function() {
    return result.reverse()
  }
  return {
    getData: function() {
      return result
    },
    setData: function(newData) {
      result.push(newData)
    },
    revers: function() {
      return getReverse()
    }
  }
}()
globalData.setData({name: 'deadman'})
globalData.setData({name: 'goodman'})
console.log(globalData.getData(), globalData.result, globalData.revers())

// 1 1 2 3 5 8 13 21 34 55 89...
function fibona(n) {
  if (n < 1) {
    return 0
  }
  if (n === 1 || n === 2) {
    return 1
  }
  return arguments.callee(n - 1) + arguments.callee(n - 2)
}
// console.log(fibona(15)) f3+f2 f2+f1+f1 1+1+1

function fibona2(n) {
  if (n < 1) {
    return 0
  }
  if (n === 1 || n === 2) {
    return 1
  }

  let f1 = 1
  let f2 = 1
  for(let i = 3; i <= n ; i++) {
    let temp = f1 + f2
    f1 = f2
    f2 = temp
  }
  return f2
}
console.time('timestamp')
console.log(fibona2(50))
console.timeEnd('timestamp')
let count = 5
console.log('倒计时'+count+'s')
;(function loop(){
  setTimeout(() => {
    count--
    if (count == 0) {
      console.log('倒计时结束')
    } else {
      console.log('倒计时'+count+'s')
      loop()
    }
  }, 1000)
})()
