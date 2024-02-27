import { compileToFunctions } from "./compiler/index"
import { callHook, mountComponent } from "./lifecycle"
import { initState } from "./state"
import { mergeOptions } from "./utils"

export function initMxinin(Vue){
  // 初始化
  Vue.prototype._init = function(options){
    const vm = this
    // 我们定义的全局指令和过滤器.... 都会挂载到实力上
    vm.$options = mergeOptions(this.constructor.options,options); // 将用户的选项挂载到实例上
    callHook(vm,"beforCreated")
    // 初始化状态
    initState(vm)
    callHook(vm,"created")
    if(options.el){
      vm.$mount(options.el) //实现数据的挂载
    }
  }
  Vue.prototype.$mount = function(el){
    const vm = this
    el = document.querySelector(el)
    let opt = vm.$options
    if(!opt.render){
      let template
      if(!opt.template){
        template = el.outerHTML
      }else{
        template = opt.template
      }
      if(template){
        // 对template进行编译成render函数
        const render = compileToFunctions(template)
        opt.render = render
      }
    }
    // 组件挂载
    mountComponent(vm,el)
  }
}


