import { initGlobalApi } from "./global-api"
import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vdom"

function Vue(options) {
  this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

initGlobalApi(Vue)

export default Vue