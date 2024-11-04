const tasks = Array.from({ length: 300000 }, (_, i) => () => {
  const div = document.createElement('div')
  div.textContent = i + 1
  document.body.appendChild(div)
  return div
})

const btn = document.querySelector('.btn')
btn.onclick = function () {
  // const scheduler = (chunkTask) => {
  //   setTimeout(() => {
  //     const now = performance.now()
  //     chunkTask(() => performance.now() - now < 1)
  //   }, 1000)
  // }
  // performTasks(tasks, scheduler)
  IdlePerformTasks(tasks)
  // performTasksFn(tasks)
}

function performTasksFn(tasks) {
  if (tasks.length === 0) {
    return
  }
  let i = 0
  function _run() {
    requestIdleCallback(idle => {
      while (i < tasks.length && idle.timeRemaining() > 0) {
        tasks[i++]()
      }
      _run()
    })
  }
  _run()
}

function IdlePerformTasks(tasks) {
  const scheduler = (chunkTask) => {
    requestIdleCallback(idle => {
      chunkTask(() => idle.timeRemaining() > 0)
    })
  }
  performTasks(tasks, scheduler)
}

function performTasks(tasks, scheduler) {
  if (tasks.length === 0) {
    return
  }
  let i = 0
  function _run() {
    scheduler(goOn => {
      while (i < tasks.length && goOn()) {
        tasks[i++]()
      }
      if (i < tasks.length) {
        _run()
      }
    })
  }
  _run()
}
