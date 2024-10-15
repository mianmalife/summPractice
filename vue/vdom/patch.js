export function patch(oldVnode, vnode) {
  console.log(oldVnode, vnode)
  let el = createElm(vnode)
  console.log(el)
  let parentElm = oldVnode.parentNode
  parentElm.insertBefore(el, oldVnode.nextSibling)
  parentElm.removeChild(oldVnode)
}

function createElm(vnode) {
  const { tag, data, key, children, text } = vnode
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}