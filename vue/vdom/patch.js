export function patch(oldVnode, vnode) {
  if (oldVnode.nodeType === 1) {
    let el = createElm(vnode)
    let parentElm = oldVnode.parentNode
    parentElm.insertBefore(el, oldVnode.nextSibling)
    parentElm.removeChild(oldVnode)
    return el
  } else {
    if (oldVnode.tag !== vnode.tag) {
      return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
    }
    // 都是文本节点 tag undefined
    if (!oldVnode.tag) {
      if (oldVnode.text !== vnode.text) {
        return oldVnode.el.textContent = vnode.text
      }
    }
    let el= vnode.el = oldVnode.el
    updateProperties(vnode, oldVnode.data)
    let oldChildren = oldVnode.children || []
    let newChildren = vnode.children || []
    if (oldChildren.length > 0 && newChildren.length > 0) {
      updateChildren(oldChildren, newChildren, el)
    } else if (oldChildren.length > 0) {
      el.innerHTML = ''
    } else if(newChildren.length > 0) {
      newChildren.forEach(vnode => {
        el.appendChild(createElm(vnode))
      })
    }
    return el
  }
}

function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
}

function updateChildren(oldChildren, newChildren, parent) {
  let oldStartIndex = 0
  let oldStartVnode = oldChildren[0]
  let oldEndIndex = oldChildren.length - 1
  let oldEndVnode = oldChildren[oldEndIndex]

  let newStartIndex = 0
  let newStartVnode = newChildren[0]
  let newEndIndex = newChildren.length - 1
  let newEndVnode = newChildren[newEndIndex]

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if(isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if(isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if(isSameVnode(oldStartVnode, newEndVnode)) {
      patch(oldStartVnode, newEndVnode)
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if(isSameVnode(oldEndVnode, newStartVnode)){
      patch(oldEndVnode,newStartVnode)
      parent.insertBefore(oldEndVnode.el, oldStartVnode.el)
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    }
  }
  if (newStartIndex <= newEndIndex) {
    for(let i = newStartIndex; i <= newEndIndex; i++) {
      let el = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex+1].el
      parent.insertBefore(createElm(newChildren[i]), el)
    }
  }

}

export function createElm(vnode) {
  const { tag, data, key, children, text } = vnode
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function updateProperties(vnode, oldProps = {}) {
  let propteries = vnode.data || {}
  let el = vnode.el

  for(let key in oldProps) {
    if (!propteries[key]) {
      el.removeAttribute(key)
    }
  }

  let newStyle = propteries.style || {}
  let oldStyle = oldProps.style || {}
  for(let key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = ''
    }
  }

  for (let key in propteries) {
    if (key === 'style') {
      for (let styleName in propteries.style) {
        let stylname = styleName.replace(/\s/g, '')
        el.style[stylname] = propteries.style[styleName]
      }
    } else if (key === 'class') {
      el.className = propteries[key]
    } else {
      el.setAttribute(key, propteries[key])
    }
  }
}