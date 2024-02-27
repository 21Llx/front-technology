import { compileToFunctions } from "./compiler/index.js";
import { globalApi } from "./globalApi";
import { initMxinin } from "./init";
import { initLifeCycle } from "./lifecycle";
import { initStateMixin } from "./state";
import { createElm, patch } from "./vdom/patch";

function Vue(options) {
  this._init(options);
}

initMxinin(Vue); //扩展init方法
initLifeCycle(Vue); //vm._update  vm._redner
initStateMixin(Vue); //实现 nextTick $watch

globalApi(Vue); //全局Api

export default Vue;
