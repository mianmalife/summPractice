export function mergeOptions(parent, child) {
  const options = {}
  const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
  ]

  const strats = {}
  strats.components = function (parentVal, childVal) {
    const res = Object.create(parentVal)
    if (childVal) {
      for (let key in childVal) {
        res[key] = childVal[key]
      }
    }
    return res
  }

  LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
  })

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal)
      } else {
        return [childVal]
      }
    } else {
      return parentVal
    }
  }
  for (let key in parent) {
    mergeField(key)
  }

  for (let key in child) {
    if (!parent.hasOwnProperty(key)) {
      mergeField(key)
    }
  }

  function mergeField(key) {
    if (strats[key]) {
      options[key] = strats[key](parent[key], child[key])
    } else {
      if (child[key]) {
        options[key] = child[key]
      } else {
        options[key] = parent[key]
      }
    }
  }
  return options
}

export function callHook(vm, hook) {
  let handler = vm.$options[hook]
  if (handler) {
    for (let i = 0; i < handler.length; i++) {
      handler[i].call(vm)
    }
  }
}

const callbacks = []
let pending = false
function flushCallbacks() {
  while (callbacks.length) {
    const cb = callbacks.shift()
    cb()
  }
  pending = false
}

let timerFunc
if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks)
  }
} else if (MutationObserver) {
  let observer = new MutationObserver(flushCallbacks)
  let textNode = document.createTextNode(1)
  observer.observe(textNode, { characterData: true })
  timerFunc = () => {
    textNode.textContent = 2
  }
} else if (setImmediate) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks)
  }
}
export function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) {
    timerFunc()
    pending = true
  }
}

function makeMap(str) {
  const mapping = {}
  const arr = str.split(',')
  arr.forEach(item => {
    mapping[item] = true
  })
  return key => mapping[key]
}
export const isReservedTag = makeMap(
  'div,p,span,button,img,a,ul,li,ol,input,textarea,pre,i,h1,h2,h3,h4,h5,h6'
)