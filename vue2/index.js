import { initGlobalApi } from "./global-api"
import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vdom"
import { stateMixin } from "./state";
import { compileToFunctions } from "./compiler";
import { createElm, patch } from "./vdom/patch";

function Vue(options) {
  this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
stateMixin(Vue)

initGlobalApi(Vue)

// let vm1 = new Vue({data() { return {name: 'zhangsan'} }})
// let render1 = compileToFunctions(`<div id="app" class="a" style="color:red;font-weight:bold">
// <ul>
// <li style="color:red">1</li>
// <li style="color:orange">2</li>
// <li style="color:yellow">3</li>
// <li style="color:green">{{name}}</li>
// </ul>
// </div>`)
// let oldVNode = render1.call(vm1)
// let el = createElm(oldVNode)
// document.body.appendChild(el)
//
// let vm2 = new Vue({data() { return {name: 'lisi'} }})
// let render2 = compileToFunctions(`<div id="app" class="a" style="color:green;">
// <ul>
// <li style="color:green">{{name}}</li>
// <li style="color:red">1</li>
// <li style="color:yellow">3</li>
// <li style="color:orange">2</li>
// </ul>
// </div>`)
// let newVNode = render2.call(vm2)
//
// setTimeout(() => {
//   patch(oldVNode, newVNode)
// }, 1000)

export default Vue