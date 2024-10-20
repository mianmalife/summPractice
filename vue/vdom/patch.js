export function patch(oldVnode, vnode) {
  let el = createElm(vnode)
  let parentElm = oldVnode.parentNode
  parentElm.insertBefore(el, oldVnode.nextSibling)
  parentElm.removeChild(oldVnode)
  return el
}

function createElm(vnode) {
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

function updateProperties(vnode) {
  let el = vnode.el
  let propteries = vnode.data || {}
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