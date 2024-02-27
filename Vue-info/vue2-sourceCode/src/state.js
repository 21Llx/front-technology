import Dep from "./observe/dep";
import { observe } from "./observe/index";
import Watcher, { nextTick } from "./observe/watcher"

export function initState(vm) {
  let opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch){
    initWatch(vm)
  }
}
function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    },
  });
}
function initData(vm) {
  let data = vm.$options.data; //vue2 data可能是函数可能是对象
  // 获取当前data对象数据
  data = typeof data === "function" ? data.call(vm) : data;
  vm._data = data;
  observe(data);
  // 将vm._data 用vm来代理
  for (let key in data) {
    proxy(vm, "_data", key);
  }
}
// 计算属性
function initComputed(vm) {
  let computed = vm.$options.computed;
  // 将计算属性保存到vm上
  const watchers = vm._computedWatchers = {}
  for (let key in computed) {
    let userDef = computed[key];
    let fn = typeof userDef == "function" ? userDef : userDef.get;
    watchers[key] =  new Watcher(vm,fn,{lazy:true})
    defineComputed(vm, key, userDef);
  }
}

function defineComputed(vm, key, userDef) {
  const setter = userDef.set || (() => {});
  Object.defineProperty(vm, key, {
    get: createComputedGetter(key),
    set: setter,
  });
}
// 需要检测是否需要执行getter
function createComputedGetter(key){
  return function(){
    const wathcer = this._computedWatchers[key]
    if(wathcer.dirty){
      wathcer.evulate()
    }
    if(Dep.target){
      wathcer.depend()  // 
    }
    return wathcer.value
  }
}


// watch
function initWatch(vm){
  let watch = vm.$options.watch
  for(let key in watch){
    const handler = watch[key]  //watch的创建可以是字符串，数组，函数
    if(Array.isArray(handler)){
      for(let i=0;i<handler.length;i++){
        createWatcher(vm,key,handler[i])
      }
    }else{
      createWatcher(vm,key,handler)
    }
  }
}

function createWatcher(vm,key,handler){
  return vm.$watch(key,handler)
}

export function initStateMixin(Vue){
  Vue.prototype.$nextTick = nextTick
  Vue.prototype.$watch = function(exprOrFn,cb,options = {}){
    // exprOrFn可能字符串或函数  =》 firstStr  ()=>vm.firstStr
  
    new Watcher(this,exprOrFn,{user:true},cb)
  }
}