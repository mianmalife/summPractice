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

task.run()