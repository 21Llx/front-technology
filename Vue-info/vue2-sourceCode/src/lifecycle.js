import Watcher from "./observe/watcher.js"
import { createElement, createTextVNode } from "./vdom/index.js"
import { patch } from "./vdom/patch.js"

// _c('div',{id:"app"},_v("       "),_c('h1',null,_v(_s(name))),_v("       "),_c('p',null,_v(_s(year))),_v("       "),_c('p',null,_v("hello world")),_v("     "))
export function initLifeCycle(Vue){
  Vue.prototype._update = function(vnode){
    const vm = this
    const el = vm.$el
    const preVnode = vm._vnode
    vm._vnode= vnode //把上一次产生的虚拟节点保存
    if(preVnode){
      vm.$el = patch(preVnode,vnode)
    }else{
      vm.$el = patch(el,vnode)
    }
  }
  
  Vue.prototype._c = function(){
    return createElement(this,...arguments)
  }
  // 处理文本
  Vue.prototype._v = function(){
    return createTextVNode(this,...arguments)
  }
  // 处理{{data}} 变量
  Vue.prototype._s = function(value){
    if(typeof value !="object") return value
    return JSON.stringify(value)

  }
  //生成虚拟dom
  Vue.prototype._render = function(){
    const vm = this
    return vm.$options.render.call(vm)
  }
}

export function mountComponent(vm,el){
  vm.$el = el
  // 1.调用render产生虚拟dom
  const updateComponent = ()=>{
    console.log("render")
    vm._update(vm._render())
  }
  new Watcher(vm,updateComponent,true)
  
  // 2.根据虚拟dom生成真实dom

  // 3.插入el元素
}

export function callHook(vm,hook){
  const handlers = vm.$options[hook]
  if(handlers){
    handlers.forEach(handler=>handler.call(vm))
  }
}